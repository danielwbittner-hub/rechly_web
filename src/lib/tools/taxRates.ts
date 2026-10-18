/**
 * Statutory German tax rates, Gewerbesteuer Hebesätze, and BMF travel per-diems.
 */

export interface MunicipalityHebesatz {
    city: string;
    hebesatz: number; // percentage, e.g. 490
    state: string;
}

export const TOP_MUNICIPALITIES: MunicipalityHebesatz[] = [
    { city: "München", hebesatz: 490, state: "BY" },
    { city: "Frankfurt am Main", hebesatz: 460, state: "HE" },
    { city: "Berlin", hebesatz: 410, state: "BE" },
    { city: "Hamburg", hebesatz: 470, state: "HH" },
    { city: "Köln", hebesatz: 475, state: "NW" },
    { city: "Düsseldorf", hebesatz: 440, state: "NW" },
    { city: "Stuttgart", hebesatz: 420, state: "BW" },
    { city: "Leipzig", hebesatz: 460, state: "SN" },
    { city: "Dresden", hebesatz: 450, state: "SN" },
    { city: "Nürnberg", hebesatz: 447, state: "BY" },
    { city: "Bremen", hebesatz: 460, state: "HB" },
    { city: "Hannover", hebesatz: 480, state: "NI" },
    { city: "Dortmund", hebesatz: 485, state: "NW" },
    { city: "Essen", hebesatz: 480, state: "NW" },
    { city: "Duisburg", hebesatz: 520, state: "NW" },
    { city: "Bonn", hebesatz: 490, state: "NW" },
    { city: "Wiesbaden", hebesatz: 450, state: "HE" },
    { city: "Mannheim", hebesatz: 430, state: "BW" },
    { city: "Augsburg", hebesatz: 435, state: "BY" },
    { city: "Münster", hebesatz: 460, state: "NW" },
    { city: "Monheim am Rhein (Niedrighebesatz)", hebesatz: 250, state: "NW" },
    { city: "Grünwald (Niedrighebesatz)", hebesatz: 240, state: "BY" },
    { city: "Zossen (Niedrighebesatz)", hebesatz: 270, state: "BB" },
];

export interface GewerbesteuerResult {
    profit: number;
    entityType: "freiberufler" | "einzelunternehmen" | "kapitalgesellschaft";
    hebesatz: number;
    allowance: number; // Freibetrag
    taxableProfit: number;
    steuermessbetrag: number;
    gewerbesteuer: number;
    estAnrechnungMax: number; // § 35 EStG credit (4.0 * Steuermessbetrag)
    effectiveBurden: number;
    notes: string[];
}

export function calculateGewerbesteuer(
    profit: number,
    entityType: "freiberufler" | "einzelunternehmen" | "kapitalgesellschaft",
    hebesatz: number
): GewerbesteuerResult {
    if (entityType === "freiberufler") {
        return {
            profit,
            entityType,
            hebesatz,
            allowance: profit,
            taxableProfit: 0,
            steuermessbetrag: 0,
            gewerbesteuer: 0,
            estAnrechnungMax: 0,
            effectiveBurden: 0,
            notes: [
                "Als Freiberufler nach § 18 EStG (z. B. IT-Berater, Designer, Ärzte, Anwälte, Journalisten) bist du kraft Gesetzes von der Gewerbesteuer befreit.",
                "Es fällt keine Gewerbesteuer an, unabhängig von der Höhe des Gewinns.",
            ],
        };
    }

    const allowance = entityType === "einzelunternehmen" ? 24500 : 0;
    const taxableProfit = Math.max(0, profit - allowance);
    // § 11 Abs. 2 GewStG: Steuermesszahl ist 3,5%
    const steuermessbetrag = Math.round(taxableProfit * 0.035 * 100) / 100;
    const gewerbesteuer = Math.round(steuermessbetrag * (hebesatz / 100) * 100) / 100;

    // § 35 EStG allows individuals/partnerships to offset up to 4.0x the Steuermessbetrag against income tax
    const estAnrechnungMax =
        entityType === "einzelunternehmen"
            ? Math.min(gewerbesteuer, Math.round(steuermessbetrag * 4.0 * 100) / 100)
            : 0;

    const effectiveBurden = Math.max(0, gewerbesteuer - estAnrechnungMax);

    const notes: string[] = [];
    if (entityType === "einzelunternehmen") {
        notes.push("Gesetzlicher Freibetrag von 24.500 € nach § 11 Abs. 1 GewStG angewendet.");
        if (hebesatz <= 400) {
            notes.push(
                `Bei einem Hebesatz von ${hebesatz}% wird die Gewerbesteuer über § 35 EStG nahezu vollständig (Faktor 4,0) auf deine persönliche Einkommensteuer angerechnet!`
            );
        } else {
            notes.push(
                `Da der Hebesatz über 400% liegt, verbleibt eine geringe effektive Mehrbelastung von ca. ${effectiveBurden.toFixed(2)} € nach § 35 EStG Anrechnung.`
            );
        }
    } else {
        notes.push("GmbH / UG unterliegen ab dem ersten Euro Gewinn der Gewerbesteuer (kein Freibetrag).");
        notes.push("Die Gewerbesteuer ist für Kapitalgesellschaften kein Betriebsausgabenabzug mehr (§ 4 Abs. 5b EStG).");
    }

    return {
        profit,
        entityType,
        hebesatz,
        allowance,
        taxableProfit,
        steuermessbetrag,
        gewerbesteuer,
        estAnrechnungMax,
        effectiveBurden,
        notes,
    };
}

// BMF per-diem allowances (§ 9 Abs. 4a EStG)
export interface CountryPerDiem {
    country: string;
    fullDay: number; // 24h
    partialDay: number; // arrival/departure or >8h
}

export const POPULAR_PER_DIEMS: CountryPerDiem[] = [
    { country: "Deutschland", fullDay: 28, partialDay: 14 },
    { country: "Österreich", fullDay: 40, partialDay: 27 },
    { country: "Schweiz (Zürich)", fullDay: 64, partialDay: 43 },
    { country: "Schweiz (Rest)", fullDay: 58, partialDay: 39 },
    { country: "Frankreich (Paris)", fullDay: 58, partialDay: 39 },
    { country: "Frankreich (Rest)", fullDay: 45, partialDay: 30 },
    { country: "Niederlande", fullDay: 52, partialDay: 35 },
    { country: "Italien (Mailand / Rom)", fullDay: 46, partialDay: 31 },
    { country: "Spanien (Madrid / Barcelona)", fullDay: 42, partialDay: 28 },
    { country: "Großbritannien (London)", fullDay: 62, partialDay: 41 },
    { country: "USA (New York)", fullDay: 69, partialDay: 46 },
    { country: "USA (San Francisco)", fullDay: 67, partialDay: 45 },
    { country: "Polen", fullDay: 37, partialDay: 25 },
];
