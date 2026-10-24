/**
 * KoSIT Leitweg-ID Validator for German B2G E-Invoices (XRechnung).
 * Implements full format parsing and ISO 7064 Mod 97-10 checksum validation.
 * Specification: KoSIT Leitweg-ID Format v1.0.1 / XRechnung 3.0.
 */

export interface LeitwegIdValidationResult {
    raw: string;
    isValid: boolean;
    errors: string[];
    federalState?: string;
    coarseAddress?: string; // Grobadressierung
    fineAddress?: string; // Feinadressierung
    checksum?: string; // Prüfziffer
    calculatedChecksum?: string;
}

const STATE_CODE_MAP: Record<string, string> = {
    "01": "Schleswig-Holstein",
    "02": "Hamburg",
    "03": "Niedersachsen",
    "04": "Bremen",
    "05": "Nordrhein-Westfalen",
    "06": "Hessen",
    "07": "Rheinland-Pfalz",
    "08": "Baden-Württemberg",
    "09": "Bayern",
    "10": "Saarland",
    "11": "Berlin",
    "12": "Brandenburg",
    "13": "Mecklenburg-Vorpommern",
    "14": "Sachsen",
    "15": "Sachsen-Anhalt",
    "16": "Thüringen",
    "99": "Bund (Bundesbehörde / Bundesverwaltung)",
};

/**
 * ISO 7064 Mod 97-10 calculation:
 * Letters A-Z converted to 10..35.
 * Checksum digits satisfy: BigInt(number) % 97 === 1.
 */
function computeMod97(str: string): number {
    let numericStr = "";
    for (const ch of str.toUpperCase()) {
        const code = ch.charCodeAt(0);
        if (code >= 48 && code <= 57) {
            numericStr += ch;
        } else if (code >= 65 && code <= 90) {
            numericStr += (code - 55).toString();
        }
    }

    // Process in chunks to avoid BigInt overflow or floating point inaccuracies
    let remainder = 0;
    for (let i = 0; i < numericStr.length; i += 7) {
        const chunk = remainder.toString() + numericStr.substring(i, i + 7);
        remainder = parseInt(chunk, 10) % 97;
    }
    return remainder;
}

export function validateLeitwegId(input: string): LeitwegIdValidationResult {
    const trimmed = input.trim();
    const errors: string[] = [];

    if (!trimmed) {
        return { raw: input, isValid: false, errors: ["Bitte eine Leitweg-ID eingeben."] };
    }

    // Typical format: Grobadressierung-Feinadressierung-Prüfziffer
    // e.g. 04011000-12345-67 or 991-12345-67
    const parts = trimmed.split("-");

    if (parts.length < 2 || parts.length > 3) {
        return {
            raw: trimmed,
            isValid: false,
            errors: [
                "Ungültiges Format. Eine Leitweg-ID besteht aus Grobadressierung, Feinadressierung und einer zweistelligen Prüfziffer, getrennt durch Bindestriche (z. B. 04011000-12345-67).",
            ],
        };
    }

    const coarse = parts[0];
    const fine = parts.length === 3 ? parts[1] : "";
    const checksum = parts.length === 3 ? parts[2] : parts[1];

    // 1. Check coarse address (Grobadressierung)
    if (coarse.length < 2 || coarse.length > 12) {
        errors.push("Die Grobadressierung muss zwischen 2 und 12 Zeichen lang sein.");
    }

    const statePrefix = coarse.substring(0, 2);
    const federalState = STATE_CODE_MAP[statePrefix];
    if (!federalState) {
        errors.push(`Unbekannte Bundesland-Kennung "${statePrefix}". Gültig sind 01-16 sowie 99 für Bund.`);
    }

    // 2. Check checksum format
    if (!/^\d{2}$/.test(checksum)) {
        errors.push("Die Prüfziffer am Ende muss genau 2 Ziffern betragen.");
    }

    // 3. Mod 97-10 Checksum verification
    // To verify, concatenate coarse + fine + checksum: (number % 97) should equal 1
    // or calculate expected checksum = 98 - (mod97(coarse + fine + "00") % 97)
    let calculatedChecksum = "";
    if (coarse && checksum.length === 2) {
        const payloadWithoutChecksum = coarse + fine;
        const remainder = computeMod97(payloadWithoutChecksum + "00");
        const expected = (98 - remainder) % 97 || 97;
        calculatedChecksum = expected.toString().padStart(2, "0");

        if (checksum !== calculatedChecksum) {
            errors.push(
                `Prüfziffer ist rechnerisch falsch (angegeben: "${checksum}", berechnet: "${calculatedChecksum}").`
            );
        }
    }

    return {
        raw: trimmed,
        isValid: errors.length === 0,
        errors,
        federalState,
        coarseAddress: coarse,
        fineAddress: fine,
        checksum,
        calculatedChecksum,
    };
}
