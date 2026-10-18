/**
 * EÜR (Einnahmen-Überschuss-Rechnung nach § 4 Abs. 3 EStG) & USt-VA Kennziffern Engine
 * Calculates net business profit and official ELSTER Kennziffern (Kz 81, 86, 66, 83).
 */

export interface EuerRevenueCategory {
    id: string;
    label: string;
    netAmount: number;
    vatRate: 19 | 7 | 0;
    elsterKz: string;
}

export interface EuerExpenseCategory {
    id: string;
    label: string;
    netAmount: number;
    vatRate: 19 | 7 | 0;
    categoryGroup: "material" | "service" | "rent" | "afa" | "it" | "travel" | "other";
}

export interface EuerCalculationResult {
    totalRevenueNet: number;
    totalRevenueGross: number;
    vatCollected19: number;
    vatCollected7: number;
    totalVatCollected: number;

    totalExpensesNet: number;
    vorsteuerDeductible: number;
    totalExpensesGross: number;

    netProfit: number; // Gewinn / Verlust nach § 4 Abs. 3 EStG
    profitMarginPercent: number;

    // ELSTER USt-VA Kennziffern
    elster: {
        kz81Base: number; // Steuerpflichtige Umsätze zum Steuersatz von 19 %
        kz81Tax: number;
        kz86Base: number; // Steuerpflichtige Umsätze zum Steuersatz von 7 %
        kz86Tax: number;
        kz41Base: number; // Steuerfreie Umsätze mit Vorsteuerabzug (Innergem. Lieferungen)
        kz21Base: number; // Nicht steuerbare sonstige Leistungen (Reverse Charge)
        kz66Vorsteuer: number; // Vorsteuerbeträge aus Rechnungen von anderen Unternehmern
        kz83Zahllast: number; // Verbleibende Umsatzsteuer-Vorauszahlung / Erstattung
    };
}

export function calculateEuer(
    revenues: EuerRevenueCategory[],
    expenses: EuerExpenseCategory[]
): EuerCalculationResult {
    let totalRevenueNet = 0;
    let vatCollected19 = 0;
    let vatCollected7 = 0;
    let kz81Base = 0;
    let kz86Base = 0;
    let kz41Base = 0;
    let kz21Base = 0;

    for (const rev of revenues) {
        totalRevenueNet += rev.netAmount;
        if (rev.vatRate === 19) {
            kz81Base += rev.netAmount;
            vatCollected19 += rev.netAmount * 0.19;
        } else if (rev.vatRate === 7) {
            kz86Base += rev.netAmount;
            vatCollected7 += rev.netAmount * 0.07;
        } else {
            if (rev.elsterKz === "41") {
                kz41Base += rev.netAmount;
            } else {
                kz21Base += rev.netAmount;
            }
        }
    }

    const totalVatCollected = vatCollected19 + vatCollected7;
    const totalRevenueGross = totalRevenueNet + totalVatCollected;

    let totalExpensesNet = 0;
    let vorsteuerDeductible = 0;

    for (const exp of expenses) {
        totalExpensesNet += exp.netAmount;
        if (exp.vatRate === 19) {
            vorsteuerDeductible += exp.netAmount * 0.19;
        } else if (exp.vatRate === 7) {
            vorsteuerDeductible += exp.netAmount * 0.07;
        }
    }

    const totalExpensesGross = totalExpensesNet + vorsteuerDeductible;

    // Under EÜR cash principle (§ 11 EStG):
    // Einnahmen including collected VAT minus expenses including paid deductible Vorsteuer and VAT remittances.
    // Operating profit = Net revenue - Net expenses (since VAT in/out nets out to the USt Zahllast).
    const netProfit = Number((totalRevenueNet - totalExpensesNet).toFixed(2));
    const profitMarginPercent = totalRevenueNet > 0 ? Number(((netProfit / totalRevenueNet) * 100).toFixed(1)) : 0;

    const kz81Tax = Number(vatCollected19.toFixed(2));
    const kz86Tax = Number(vatCollected7.toFixed(2));
    const kz66 = Number(vorsteuerDeductible.toFixed(2));
    const kz83Zahllast = Number(((kz81Tax + kz86Tax) - kz66).toFixed(2));

    return {
        totalRevenueNet: Number(totalRevenueNet.toFixed(2)),
        totalRevenueGross: Number(totalRevenueGross.toFixed(2)),
        vatCollected19: kz81Tax,
        vatCollected7: kz86Tax,
        totalVatCollected: Number(totalVatCollected.toFixed(2)),

        totalExpensesNet: Number(totalExpensesNet.toFixed(2)),
        vorsteuerDeductible: kz66,
        totalExpensesGross: Number(totalExpensesGross.toFixed(2)),

        netProfit,
        profitMarginPercent,

        elster: {
            kz81Base: Number(kz81Base.toFixed(2)),
            kz81Tax,
            kz86Base: Number(kz86Base.toFixed(2)),
            kz86Tax,
            kz41Base: Number(kz41Base.toFixed(2)),
            kz21Base: Number(kz21Base.toFixed(2)),
            kz66Vorsteuer: kz66,
            kz83Zahllast,
        },
    };
}
