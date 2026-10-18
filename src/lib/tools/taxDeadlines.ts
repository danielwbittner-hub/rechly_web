/**
 * Statutory German Tax Deadlines (Steuerkalender 2026 & Fristen)
 * Accounts for weekend / public holiday shifting (§ 108 Abs. 3 AO)
 * and the 3-day statutory bank grace period (Schonfrist § 240 Abs. 3 AO).
 */

export interface TaxDeadline {
    id: string;
    title: string;
    category: "USt" | "ESt" | "GewSt" | "LSt" | "ZM" | "Erklärung";
    dueDate: string; // YYYY-MM-DD (nominal or shifted)
    nominalDate: string; // YYYY-MM-DD (statutory date before shift)
    schonfristDate: string; // YYYY-MM-DD (3-day grace period for bank transfer)
    description: string;
    appliesTo: ("freelancer" | "gmbh" | "kleinunternehmer" | "employer")[];
    legalBasis: string;
}

// Helper to determine if a date is a weekend (Saturday or Sunday)
function isWeekend(d: Date): boolean {
    const day = d.getDay();
    return day === 0 || day === 6;
}

// Simple fixed German nationwide holidays check for shifting
function isNationwideHoliday(d: Date): boolean {
    const m = d.getMonth() + 1; // 1-12
    const day = d.getDate();

    // Fixed nationwide holidays:
    // 01-01 Neujahr, 05-01 Tag der Arbeit, 10-03 Tag der Deutschen Einheit, 12-25 1. Weihnachtstag, 12-26 2. Weihnachtstag
    if (m === 1 && day === 1) return true;
    if (m === 5 && day === 1) return true;
    if (m === 10 && day === 3) return true;
    if (m === 12 && day === 25) return true;
    if (m === 12 && day === 26) return true;

    // 2026 Easter-based nationwide holidays:
    // Ostersonntag 2026: 05.04.2026 -> Karfreitag: 03.04.2026, Ostermontag: 06.04.2026, Christi Himmelfahrt: 14.05.2026, Pfingstmontag: 25.05.2026
    const y = d.getFullYear();
    if (y === 2026) {
        if (m === 4 && (day === 3 || day === 6)) return true;
        if (m === 5 && (day === 14 || day === 25)) return true;
    }

    return false;
}

// § 108 Abs. 3 AO: Fällt das Ende einer Frist auf einen Sonntag, Feiertag oder Sonnabend,
// so endet die Frist mit dem Ablauf des nächstfolgenden Werktags.
export function shiftToNextWorkday(dateStr: string): string {
    const [y, m, d] = dateStr.split("-").map(Number);
    const cur = new Date(y, m - 1, d);

    while (isWeekend(cur) || isNationwideHoliday(cur)) {
        cur.setDate(cur.getDate() + 1);
    }

    const resY = cur.getFullYear();
    const resM = String(cur.getMonth() + 1).padStart(2, "0");
    const resD = String(cur.getDate()).padStart(2, "0");
    return `${resY}-${resM}-${resD}`;
}

// § 240 Abs. 3 AO: Eine Säumniszuschlag wird bei einer Überweisung erst erhoben,
// wenn die Zahlung nicht innerhalb von drei Tagen nach Ablauf des Fälligkeitstags eingeht.
export function calculateSchonfristDate(shiftedDueDateStr: string): string {
    const [y, m, d] = shiftedDueDateStr.split("-").map(Number);
    const cur = new Date(y, m - 1, d);
    cur.setDate(cur.getDate() + 3);

    // If the 3rd day falls on weekend/holiday, bank transfer processing extends to next workday
    while (isWeekend(cur) || isNationwideHoliday(cur)) {
        cur.setDate(cur.getDate() + 1);
    }

    const resY = cur.getFullYear();
    const resM = String(cur.getMonth() + 1).padStart(2, "0");
    const resD = String(cur.getDate()).padStart(2, "0");
    return `${resY}-${resM}-${resD}`;
}

export function getTaxDeadlines2026(params: {
    ustInterval: "month" | "quarter" | "none";
    hasDauerfristverlaengerung: boolean;
    isEmployer: boolean;
    isGmbH: boolean;
}): TaxDeadline[] {
    const list: TaxDeadline[] = [];

    // 1. ESt & KSt Vorauszahlungen (§ 37 Abs. 1 EStG / § 31 KStG)
    // 10. März, 10. Juni, 10. September, 10. Dezember
    const estDates = [
        { nominal: "2026-03-10", label: "ESt / KSt Vorauszahlung Q1" },
        { nominal: "2026-06-10", label: "ESt / KSt Vorauszahlung Q2" },
        { nominal: "2026-09-10", label: "ESt / KSt Vorauszahlung Q3" },
        { nominal: "2026-12-10", label: "ESt / KSt Vorauszahlung Q4" },
    ];

    estDates.forEach((d, idx) => {
        const shifted = shiftToNextWorkday(d.nominal);
        list.push({
            id: `est-q${idx + 1}`,
            title: d.label,
            category: "ESt",
            nominalDate: d.nominal,
            dueDate: shifted,
            schonfristDate: calculateSchonfristDate(shifted),
            description: "Vierteljährliche Vorauszahlung auf die Einkommensteuer bzw. Körperschaftsteuer.",
            appliesTo: ["freelancer", "gmbh"],
            legalBasis: "§ 37 Abs. 1 EStG, § 31 KStG",
        });
    });

    // 2. Gewerbesteuer Vorauszahlungen (§ 19 GewStG)
    // 15. Februar, 15. Mai, 15. August, 15. November
    const gewstDates = [
        { nominal: "2026-02-15", label: "Gewerbesteuer Vorauszahlung Q1" },
        { nominal: "2026-05-15", label: "Gewerbesteuer Vorauszahlung Q2" },
        { nominal: "2026-08-15", label: "Gewerbesteuer Vorauszahlung Q3" },
        { nominal: "2026-11-15", label: "Gewerbesteuer Vorauszahlung Q4" },
    ];

    gewstDates.forEach((d, idx) => {
        const shifted = shiftToNextWorkday(d.nominal);
        list.push({
            id: `gewst-q${idx + 1}`,
            title: d.label,
            category: "GewSt",
            nominalDate: d.nominal,
            dueDate: shifted,
            schonfristDate: calculateSchonfristDate(shifted),
            description: "Gewerbesteuer-Vorauszahlung an die jeweilige Stadt- bzw. Gemeindekasse.",
            appliesTo: ["freelancer", "gmbh"],
            legalBasis: "§ 19 GewStG",
        });
    });

    // 3. Umsatzsteuer-Voranmeldung (USt-VA) (§ 18 Abs. 1 UStG)
    if (params.ustInterval === "quarter") {
        const quarters = [
            { nominal: params.hasDauerfristverlaengerung ? "2026-05-10" : "2026-04-10", label: "USt-VA Q1/2026" },
            { nominal: params.hasDauerfristverlaengerung ? "2026-08-10" : "2026-07-10", label: "USt-VA Q2/2026" },
            { nominal: params.hasDauerfristverlaengerung ? "2026-11-10" : "2026-10-10", label: "USt-VA Q3/2026" },
            { nominal: params.hasDauerfristverlaengerung ? "2027-02-10" : "2027-01-10", label: "USt-VA Q4/2026" },
        ];

        quarters.forEach((q, idx) => {
            const shifted = shiftToNextWorkday(q.nominal);
            list.push({
                id: `ust-q${idx + 1}`,
                title: q.label,
                category: "USt",
                nominalDate: q.nominal,
                dueDate: shifted,
                schonfristDate: calculateSchonfristDate(shifted),
                description: `Voranmeldung und Zahllast für das ${idx + 1}. Quartal 2026 via ELSTER.`,
                appliesTo: ["freelancer", "gmbh"],
                legalBasis: params.hasDauerfristverlaengerung ? "§ 18 Abs. 1 UStG i.V.m. § 46 UStDV" : "§ 18 Abs. 1 UStG",
            });
        });
    } else if (params.ustInterval === "month") {
        for (let m = 1; m <= 12; m++) {
            const monthNames = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
            const targetM = params.hasDauerfristverlaengerung ? m + 2 : m + 1;
            const targetY = targetM > 12 ? 2027 : 2026;
            const normM = targetM > 12 ? targetM - 12 : targetM;
            const nominal = `${targetY}-${String(normM).padStart(2, "0")}-10`;
            const shifted = shiftToNextWorkday(nominal);

            list.push({
                id: `ust-m${m}`,
                title: `USt-VA ${monthNames[m - 1]} 2026`,
                category: "USt",
                nominalDate: nominal,
                dueDate: shifted,
                schonfristDate: calculateSchonfristDate(shifted),
                description: `Monatliche Voranmeldung und Zahllast für ${monthNames[m - 1]} 2026.`,
                appliesTo: ["freelancer", "gmbh"],
                legalBasis: params.hasDauerfristverlaengerung ? "§ 18 Abs. 1 UStG i.V.m. § 46 UStDV" : "§ 18 Abs. 1 UStG",
            });
        }
    }

    // 4. Lohnsteuer-Anmeldung (falls Arbeitgeber) (§ 41a EStG)
    if (params.isEmployer) {
        for (let m = 1; m <= 12; m++) {
            const nominal = m === 12 ? "2027-01-10" : `2026-${String(m + 1).padStart(2, "0")}-10`;
            const shifted = shiftToNextWorkday(nominal);
            list.push({
                id: `lst-m${m}`,
                title: `Lohnsteuer-Anmeldung Monat ${m}`,
                category: "LSt",
                nominalDate: nominal,
                dueDate: shifted,
                schonfristDate: calculateSchonfristDate(shifted),
                description: "Übermittlung der Lohnsteuerbescheinigung und Abführung an das Betriebsstättenfinanzamt.",
                appliesTo: ["employer"],
                legalBasis: "§ 41a EStG",
            });
        }
    }

    // 5. Jahreserklärungen (Umsatzsteuer, EÜR, Körperschaftsteuer) für das Vorjahr
    // Ohne Berater: 31. Juli 2026 (für Veranlagungsjahr 2025)
    // Mit Steuerberater: Ende Februar 2027
    const yearShifted = shiftToNextWorkday("2026-07-31");
    list.push({
        id: "tax-return-self-2025",
        title: "Steuererklärung 2025 (ohne Steuerberater)",
        category: "Erklärung",
        nominalDate: "2026-07-31",
        dueDate: yearShifted,
        schonfristDate: calculateSchonfristDate(yearShifted),
        description: "Abgabefrist für Einkommensteuer-, Gewerbesteuer- und Umsatzsteuererklärung 2025 für Selbstveranlager.",
        appliesTo: ["freelancer", "gmbh", "kleinunternehmer"],
        legalBasis: "§ 149 Abs. 2 AO",
    });

    // Sort by dueDate ascending
    return list.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

// Generate an iCalendar (.ics) format string for the deadlines
export function generateIcsCalendar(deadlines: TaxDeadline[]): string {
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Rechly//Steuerkalender 2026//DE",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:Rechly Steuerkalender 2026",
        "X-WR-TIMEZONE:Europe/Berlin",
    ];

    deadlines.forEach((d) => {
        const cleanDate = d.dueDate.replace(/-/g, "");
        lines.push("BEGIN:VEVENT");
        lines.push(`UID:${d.id}-2026@rechly.de`);
        lines.push(`DTSTAMP:20260101T080000Z`);
        lines.push(`DTSTART;VALUE=DATE:${cleanDate}`);
        lines.push(`DTEND;VALUE=DATE:${cleanDate}`);
        lines.push(`SUMMARY:${d.title}`);
        lines.push(`DESCRIPTION:${d.description}\\nRechtsgrundlage: ${d.legalBasis}\\nSchonfrist bei Überweisung bis: ${d.schonfristDate}`);
        lines.push(`STATUS:CONFIRMED`);
        lines.push("BEGIN:VALARM");
        lines.push("TRIGGER:-P3D");
        lines.push("ACTION:DISPLAY");
        lines.push(`DESCRIPTION:Erinnerung: In 3 Tagen fällig: ${d.title}`);
        lines.push("END:VALARM");
        lines.push("END:VEVENT");
    });

    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
}
