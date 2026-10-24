/**
 * German Depreciation & GWG Engine (AfA & Geringwertige Wirtschaftsgüter)
 * Based on § 7 Abs. 1 EStG (Linear), § 6 Abs. 2 EStG (GWG 800 €),
 * § 6 Abs. 2a EStG (Sammelposten 1.000 €), and official BMF AfA tables.
 */

export interface BmfAssetPreset {
    id: string;
    name: string;
    usefulLifeYears: number;
    category: "it" | "office" | "vehicle" | "equipment";
    note?: string;
}

export const BMF_ASSET_PRESETS: BmfAssetPreset[] = [
    {
        id: "laptop_pc",
        name: "Laptop / Computer / Monitor / Peripherie",
        usefulLifeYears: 1,
        category: "it",
        note: "Gemäß BMF-Schreiben vom 22.02.2022 (Fiktive Nutzungsdauer 1 Jahr / Sofortabschreibung möglich).",
    },
    {
        id: "smartphone",
        name: "Smartphone / Mobiltelefon / Tablet",
        usefulLifeYears: 3,
        category: "it",
        note: "AfA-Tabelle Ziffer 6.14.3.2 (Nutzungsdauer 3 Jahre).",
    },
    {
        id: "office_furniture",
        name: "Büromöbel (Schreibtisch, Bürostuhl, Regal)",
        usefulLifeYears: 13,
        category: "office",
        note: "AfA-Tabelle Ziffer 5.1 (Nutzungsdauer 13 Jahre).",
    },
    {
        id: "car",
        name: "Pkw / Firmenwagen (Neuwagen)",
        usefulLifeYears: 6,
        category: "vehicle",
        note: "AfA-Tabelle Ziffer 4.1.1 (Nutzungsdauer 6 Jahre).",
    },
    {
        id: "ebike",
        name: "Dienstrad / E-Bike / Lastenrad",
        usefulLifeYears: 7,
        category: "vehicle",
        note: "AfA-Tabelle Ziffer 4.2.1 (Nutzungsdauer 7 Jahre).",
    },
    {
        id: "camera",
        name: "Foto- / Video-Equipment & Kamera",
        usefulLifeYears: 7,
        category: "equipment",
        note: "AfA-Tabelle Ziffer 6.13 (Nutzungsdauer 7 Jahre).",
    },
    {
        id: "server",
        name: "Server-Hardware & Netzwerktechnik",
        usefulLifeYears: 1,
        category: "it",
        note: "BMF-Schreiben zur digitalen Infrastruktur (1 Jahr Nutzungsdauer).",
    },
];

export interface AfaScheduleRow {
    year: number;
    openingBookValue: number;
    depreciationAmount: number;
    closingBookValue: number;
    monthsDepreciated: number;
}

export interface AfaCalculationResult {
    netCost: number;
    vatAmount: number;
    grossCost: number;
    isGwg: boolean;
    gwgType: "gwg_immediate" | "sammelposten_eligible" | "standard_linear";
    usefulLifeYears: number;
    annualAfaRatePercent: number;
    annualLinearAfaFullYear: number;
    firstYearAfa: number;
    schedule: AfaScheduleRow[];
    estimatedTaxSavings: number; // based on user tax rate
    recommendation: string;
}

export function calculateAfa(params: {
    netCost: number;
    purchaseMonth: number; // 1-12
    purchaseYear: number;
    usefulLifeYears: number;
    marginalTaxRatePercent?: number; // e.g. 35%
}): AfaCalculationResult {
    const { netCost, purchaseMonth, purchaseYear, usefulLifeYears } = params;
    const taxRate = (params.marginalTaxRatePercent ?? 35) / 100;

    const vatAmount = Number((netCost * 0.19).toFixed(2));
    const grossCost = Number((netCost + vatAmount).toFixed(2));

    // GWG Thresholds (§ 6 Abs. 2 / Abs. 2a EStG)
    let isGwg = false;
    let gwgType: "gwg_immediate" | "sammelposten_eligible" | "standard_linear" = "standard_linear";
    let recommendation = "";

    if (netCost <= 800.0) {
        isGwg = true;
        gwgType = "gwg_immediate";
        recommendation = "GWG-Sofortabschreibung nach § 6 Abs. 2 EStG: Da die Netto-Anschaffungskosten höchstens 800 € betragen, können Sie den Betrag im Anschaffungsjahr zu 100 % als Betriebsausgabe absetzen.";
    } else if (netCost <= 1000.0) {
        gwgType = "sammelposten_eligible";
        recommendation = "Wahlrecht Sammelposten (§ 6 Abs. 2a EStG): Wirtschaftsgüter zwischen 250,01 € und 1.000 € können entweder regulär linear oder in einem 5-jährigen Sammelposten (20 % p.a.) abgeschrieben werden.";
    } else {
        recommendation = `Reguläre lineare AfA nach § 7 Abs. 1 EStG über die betriebsgewöhnliche Nutzungsdauer von ${usefulLifeYears} Jahren.`;
    }

    // Digital goods with 1-year deemed life
    if (usefulLifeYears === 1) {
        recommendation = "Digitale Wirtschaftsgüter (Computer/Software): Gemäß BMF-Schreiben gilt eine einjährige Nutzungsdauer. Sie können die Anschaffung im Jahr des Kaufs vollständig absetzen.";
    }

    const effectiveYears = usefulLifeYears > 0 ? usefulLifeYears : 1;
    const annualAfaRatePercent = Number(((1 / effectiveYears) * 100).toFixed(2));
    const annualLinearAfaFullYear = Number((netCost / effectiveYears).toFixed(2));

    // Pro-rata temporis for first year
    const firstYearMonths = 13 - purchaseMonth; // If bought in Jan (1) -> 12 mos; Dec (12) -> 1 mo
    const monthlyAfa = netCost / (effectiveYears * 12);
    const firstYearAfa = usefulLifeYears === 1
        ? netCost
        : Number((monthlyAfa * firstYearMonths).toFixed(2));

    const schedule: AfaScheduleRow[] = [];
    let currentBookValue = netCost;
    let year = purchaseYear;

    if (usefulLifeYears === 1 || (isGwg && gwgType === "gwg_immediate")) {
        // 100% in first year
        schedule.push({
            year,
            openingBookValue: netCost,
            depreciationAmount: netCost,
            closingBookValue: 0,
            monthsDepreciated: 12,
        });
    } else {
        // Year 1 (Pro-rata temporis)
        const y1Depr = Math.min(firstYearAfa, currentBookValue);
        const y1Closing = Number((currentBookValue - y1Depr).toFixed(2));
        schedule.push({
            year,
            openingBookValue: currentBookValue,
            depreciationAmount: y1Depr,
            closingBookValue: y1Closing,
            monthsDepreciated: firstYearMonths,
        });
        currentBookValue = y1Closing;
        year++;

        // Middle years
        while (currentBookValue > 0.01 && schedule.length < effectiveYears + 2) {
            const depr = Math.min(annualLinearAfaFullYear, currentBookValue);
            // In the final year, preserve 1 € reminder value if asset remains in business or 0
            const closing = Number((currentBookValue - depr).toFixed(2));
            const months = depr < annualLinearAfaFullYear ? 12 - firstYearMonths : 12;

            schedule.push({
                year,
                openingBookValue: currentBookValue,
                depreciationAmount: depr,
                closingBookValue: Math.max(0, closing),
                monthsDepreciated: Math.min(12, months > 0 ? months : 12),
            });

            currentBookValue = Math.max(0, closing);
            year++;
            if (currentBookValue <= 0) break;
        }
    }

    const estimatedTaxSavings = Number((netCost * taxRate).toFixed(2));

    return {
        netCost,
        vatAmount,
        grossCost,
        isGwg,
        gwgType,
        usefulLifeYears: effectiveYears,
        annualAfaRatePercent,
        annualLinearAfaFullYear,
        firstYearAfa,
        schedule,
        estimatedTaxSavings,
        recommendation,
    };
}
