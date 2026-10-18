/**
 * Statutory default interest rates (Verzugszinsen) under German law:
 * - § 247 BGB: Basiszinssatz determined semi-annually by Deutsche Bundesbank
 * - § 288 Abs. 1 BGB: B2C (Verbraucher) = Basiszinssatz + 5 percentage points
 * - § 288 Abs. 2 BGB: B2B (Geschäftskunden) = Basiszinssatz + 9 percentage points
 * - § 288 Abs. 5 BGB: Statutory 40 € default compensation fee (Verzugspauschale) for B2B claims!
 */

export interface BasiszinssatzPeriod {
    from: string; // YYYY-MM-DD
    to: string; // YYYY-MM-DD or open
    rate: number; // e.g. 2.27
}

// Historical and current Bundesbank base rates (§ 247 BGB)
export const BUNDESBANK_BASE_RATES: BasiszinssatzPeriod[] = [
    { from: "2026-07-01", to: "2026-12-31", rate: 2.15 },
    { from: "2026-01-01", to: "2026-06-30", rate: 2.37 },
    { from: "2025-07-01", to: "2025-12-31", rate: 2.72 },
    { from: "2025-01-01", to: "2025-06-30", rate: 3.12 },
    { from: "2024-07-01", to: "2024-12-31", rate: 3.37 },
    { from: "2024-01-01", to: "2024-06-30", rate: 3.62 },
    { from: "2023-07-01", to: "2023-12-31", rate: 3.12 },
    { from: "2023-01-01", to: "2023-06-30", rate: 1.62 },
    { from: "2022-07-01", to: "2022-12-31", rate: -0.88 },
];

export interface VerzugszinsResult {
    principalAmount: number;
    startDate: string;
    endDate: string;
    isB2B: boolean;
    totalDays: number;
    interestAmount: number;
    lumpSum40Eur: number;
    totalAmountDue: number;
    periodBreakdown: Array<{
        periodLabel: string;
        baseRate: number;
        applicableRate: number;
        days: number;
        periodInterest: number;
    }>;
}

export function calculateVerzugszinsen(
    principal: number,
    dueDate: string,
    calcDate: string,
    isB2B: boolean
): VerzugszinsResult {
    const start = new Date(dueDate);
    const end = new Date(calcDate);

    // Default starts the day AFTER the due date (§ 187 Abs. 1 BGB)
    const effectiveStart = new Date(start);
    effectiveStart.setDate(effectiveStart.getDate() + 1);

    if (effectiveStart > end || isNaN(start.getTime()) || isNaN(end.getTime()) || principal <= 0) {
        return {
            principalAmount: principal,
            startDate: dueDate,
            endDate: calcDate,
            isB2B,
            totalDays: 0,
            interestAmount: 0,
            lumpSum40Eur: 0,
            totalAmountDue: principal,
            periodBreakdown: [],
        };
    }

    const margin = isB2B ? 9.0 : 5.0;
    const breakdown: VerzugszinsResult["periodBreakdown"] = [];
    let totalInterest = 0;
    let totalDays = 0;

    // Split across Bundesbank base rate half-year intervals
    // German commercial standard: act/360 or act/365 (BGB § 288 uses 365 or exact calendar days)
    for (const period of BUNDESBANK_BASE_RATES) {
        const pStart = new Date(period.from);
        const pEnd = new Date(period.to + "T23:59:59");

        const overlapStart = effectiveStart > pStart ? effectiveStart : pStart;
        const overlapEnd = end < pEnd ? end : pEnd;

        if (overlapStart <= overlapEnd) {
            const diffTime = overlapEnd.getTime() - overlapStart.getTime();
            const days = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

            if (days > 0) {
                const applicableRate = period.rate + margin;
                // German statutory interest formula: Betrag * Zinssatz / 100 * (Tage / 365)
                const interest = (principal * (applicableRate / 100) * days) / 365;

                totalInterest += interest;
                totalDays += days;

                breakdown.push({
                    periodLabel: `${period.from} bis ${period.to}`,
                    baseRate: period.rate,
                    applicableRate: Math.round(applicableRate * 100) / 100,
                    days,
                    periodInterest: Math.round(interest * 100) / 100,
                });
            }
        }
    }

    const lumpSum = isB2B ? 40.0 : 0.0;
    const roundedInterest = Math.round(totalInterest * 100) / 100;
    const totalAmount = Math.round((principal + roundedInterest + lumpSum) * 100) / 100;

    return {
        principalAmount: principal,
        startDate: dueDate,
        endDate: calcDate,
        isB2B,
        totalDays,
        interestAmount: roundedInterest,
        lumpSum40Eur: lumpSum,
        totalAmountDue: totalAmount,
        periodBreakdown: breakdown,
    };
}

export function getLatestBaseRate(): BasiszinssatzPeriod {
    return BUNDESBANK_BASE_RATES[0];
}

