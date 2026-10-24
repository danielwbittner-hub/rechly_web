/**
 * German Federal State (Bundesländer) public holiday & workday calculator.
 * Computes Easter using the Meeus/Jones/Butcher algorithm and accounts for
 * all 16 federal state specific legal holidays.
 */

export interface FederalState {
    code: string;
    name: string;
}

export const GERMAN_STATES: FederalState[] = [
    { code: "BW", name: "Baden-Württemberg" },
    { code: "BY", name: "Bayern" },
    { code: "BE", name: "Berlin" },
    { code: "BB", name: "Brandenburg" },
    { code: "HB", name: "Bremen" },
    { code: "HH", name: "Hamburg" },
    { code: "HE", name: "Hessen" },
    { code: "MV", name: "Mecklenburg-Vorpommern" },
    { code: "NI", name: "Niedersachsen" },
    { code: "NW", name: "Nordrhein-Westfalen" },
    { code: "RP", name: "Rheinland-Pfalz" },
    { code: "SL", name: "Saarland" },
    { code: "SN", name: "Sachsen" },
    { code: "ST", name: "Sachsen-Anhalt" },
    { code: "SH", name: "Schleswig-Holstein" },
    { code: "TH", name: "Thüringen" },
];

export interface Holiday {
    name: string;
    date: string; // YYYY-MM-DD
    states: string[]; // Bundesländer codes or ["ALL"]
}

// Calculate Easter Sunday (Ostersonntag) for any Gregorian year
function getEasterSunday(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed (March=2, April=3)
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month, day));
}

function formatDate(d: Date): string {
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function addDays(d: Date, days: number): Date {
    const res = new Date(d.getTime());
    res.setUTCDate(res.getUTCDate() + days);
    return res;
}

export function getGermanHolidays(year: number): Holiday[] {
    const easter = getEasterSunday(year);

    const holidays: Holiday[] = [
        { name: "Neujahr", date: `${year}-01-01`, states: ["ALL"] },
        { name: "Heilige Drei Könige", date: `${year}-01-06`, states: ["BW", "BY", "ST"] },
        { name: "Internationaler Frauentag", date: `${year}-03-08`, states: ["BE", "MV"] },
        { name: "Karfreitag", date: formatDate(addDays(easter, -2)), states: ["ALL"] },
        { name: "Ostersonntag", date: formatDate(easter), states: ["BB"] },
        { name: "Ostermontag", date: formatDate(addDays(easter, 1)), states: ["ALL"] },
        { name: "Tag der Arbeit", date: `${year}-05-01`, states: ["ALL"] },
        { name: "Christi Himmelfahrt", date: formatDate(addDays(easter, 39)), states: ["ALL"] },
        { name: "Pfingstsonntag", date: formatDate(addDays(easter, 49)), states: ["BB"] },
        { name: "Pfingstmontag", date: formatDate(addDays(easter, 50)), states: ["ALL"] },
        { name: "Fronleichnam", date: formatDate(addDays(easter, 60)), states: ["BW", "BY", "HE", "NW", "RP", "SL"] },
        { name: "Mariä Himmelfahrt", date: `${year}-08-15`, states: ["SL", "BY"] },
        { name: "Tag der Deutschen Einheit", date: `${year}-10-03`, states: ["ALL"] },
        { name: "Reformationstag", date: `${year}-10-31`, states: ["BB", "HB", "HH", "MV", "NI", "SN", "ST", "SH", "TH"] },
        { name: "Allerheiligen", date: `${year}-11-01`, states: ["BW", "BY", "NW", "RP", "SL"] },
        { name: "1. Weihnachtstag", date: `${year}-12-25`, states: ["ALL"] },
        { name: "2. Weihnachtstag", date: `${year}-12-26`, states: ["ALL"] },
    ];

    // Buß- und Bettag: Wednesday before Nov 23
    const nov23 = new Date(Date.UTC(year, 10, 23));
    const dayOfWeek = nov23.getUTCDay(); // 0 is Sunday, 3 is Wed
    const daysToSubtract = (dayOfWeek + 4) % 7 || 7;
    const bussUndBettag = new Date(nov23.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);
    holidays.push({
        name: "Buß- und Bettag",
        date: formatDate(bussUndBettag),
        states: ["SN"],
    });

    return holidays;
}

export interface MonthWorkdayStats {
    monthIndex: number; // 0-11
    monthName: string;
    totalDays: number;
    weekendDays: number;
    holidayDays: number;
    workdays: number;
    holidays: string[];
}

export interface YearWorkdayStats {
    year: number;
    stateCode: string;
    stateName: string;
    totalDays: number;
    weekendDays: number;
    holidayDays: number;
    workdays: number;
    months: MonthWorkdayStats[];
}

const MONTH_NAMES = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export function calculateStateWorkdays(year: number, stateCode: string): YearWorkdayStats {
    const allHolidays = getGermanHolidays(year);
    const applicableHolidays = allHolidays.filter(
        (h) => h.states.includes("ALL") || h.states.includes(stateCode)
    );

    const holidayMap = new Map<string, string>();
    for (const h of applicableHolidays) {
        holidayMap.set(h.date, h.name);
    }

    const state = GERMAN_STATES.find((s) => s.code === stateCode) || GERMAN_STATES[0];

    const months: MonthWorkdayStats[] = [];
    let yearTotalDays = 0;
    let yearWeekendDays = 0;
    let yearHolidayDays = 0;
    let yearWorkdays = 0;

    for (let m = 0; m < 12; m++) {
        const daysInMonth = new Date(year, m + 1, 0).getDate();
        let weekends = 0;
        let holidaysCount = 0;
        let workdaysCount = 0;
        const monthHolidays: string[] = [];

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(Date.UTC(year, m, d));
            const dayOfWeek = dateObj.getUTCDay(); // 0 = Sun, 6 = Sat
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const holidayName = holidayMap.get(dateStr);

            if (isWeekend) {
                weekends++;
            } else if (holidayName) {
                holidaysCount++;
                monthHolidays.push(`${holidayName} (${d}. ${MONTH_NAMES[m]})`);
            } else {
                workdaysCount++;
            }
        }

        months.push({
            monthIndex: m,
            monthName: MONTH_NAMES[m],
            totalDays: daysInMonth,
            weekendDays: weekends,
            holidayDays: holidaysCount,
            workdays: workdaysCount,
            holidays: monthHolidays,
        });

        yearTotalDays += daysInMonth;
        yearWeekendDays += weekends;
        yearHolidayDays += holidaysCount;
        yearWorkdays += workdaysCount;
    }

    return {
        year,
        stateCode: state.code,
        stateName: state.name,
        totalDays: yearTotalDays,
        weekendDays: yearWeekendDays,
        holidayDays: yearHolidayDays,
        workdays: yearWorkdays,
        months,
    };
}
