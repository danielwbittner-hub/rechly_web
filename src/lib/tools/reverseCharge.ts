/**
 * Reverse Charge & Cross-Border VAT Determination Engine
 * Determines taxability, legal invoice clauses (§ 13b / § 3a UStG),
 * and required reporting (ZM, ELSTER) for B2B/B2C transactions.
 */

export type RecipientLocation = "germany" | "eu" | "third_country";
export type RecipientType = "b2b" | "b2c";
export type ServiceType = "digital_consulting" | "construction" | "goods";

export interface ReverseChargeEvaluation {
    isTaxableInGermany: boolean;
    vatRatePercent: number;
    vatMechanism: "standard" | "reverse_charge_eu" | "reverse_charge_domestic" | "drittland_non_taxable" | "oss";
    mandatoryInvoiceNoteDe: string;
    mandatoryInvoiceNoteEn: string;
    requiredVatIdDebtor: boolean;
    reportingZmRequired: boolean;
    elsterKennziffer: string;
    explanation: string;
}

export function evaluateReverseCharge(params: {
    recipientLocation: RecipientLocation;
    recipientType: RecipientType;
    serviceType: ServiceType;
    countryName?: string;
}): ReverseChargeEvaluation {
    const { recipientLocation, recipientType, serviceType, countryName } = params;

    // Domestic Bauleistungen (§ 13b Abs. 2 Nr. 4 UStG)
    if (recipientLocation === "germany" && recipientType === "b2b" && serviceType === "construction") {
        return {
            isTaxableInGermany: true,
            vatRatePercent: 0,
            vatMechanism: "reverse_charge_domestic",
            mandatoryInvoiceNoteDe: "Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b Abs. 2 Nr. 4 UStG (Bauleistung). Der Leistungsempfänger schuldet die Umsatzsteuer.",
            mandatoryInvoiceNoteEn: "Reverse charge: Recipient of the construction service is liable for VAT pursuant to § 13b Para. 2 No. 4 German VAT Act (UStG).",
            requiredVatIdDebtor: false,
            reportingZmRequired: false,
            elsterKennziffer: "Kz 60",
            explanation: "Erbringen Sie Bauleistungen an ein anderes Bauunternehmen im Inland, geht die Steuerschuldnerschaft nach § 13b UStG auf den Auftraggeber über (Freistellungsbescheinigung nach § 48b EStG prüfen).",
        };
    }

    // Standard Domestic (Germany)
    if (recipientLocation === "germany") {
        return {
            isTaxableInGermany: true,
            vatRatePercent: 19,
            vatMechanism: "standard",
            mandatoryInvoiceNoteDe: "Rechnung enthält die gesetzliche Umsatzsteuer von 19 %.",
            mandatoryInvoiceNoteEn: "Standard German VAT applied (19%).",
            requiredVatIdDebtor: false,
            reportingZmRequired: false,
            elsterKennziffer: "Kz 81",
            explanation: "Reguläre Leistungserbringung im Inland. Es gilt der deutsche Regelsteuersatz von 19 % (bzw. ermäßigt 7 %).",
        };
    }

    // EU Member State
    if (recipientLocation === "eu") {
        if (recipientType === "b2b") {
            return {
                isTaxableInGermany: false,
                vatRatePercent: 0,
                vatMechanism: "reverse_charge_eu",
                mandatoryInvoiceNoteDe: "Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge). Gemäß § 3a Abs. 2 UStG i.V.m. Art. 196 MwSt-Systemrichtlinie 2006/112/EG schuldet der Leistungsempfänger die Umsatzsteuer.",
                mandatoryInvoiceNoteEn: "VAT reverse charged – recipient is liable for VAT according to Article 196 of EU VAT Directive 2006/112/EC.",
                requiredVatIdDebtor: true,
                reportingZmRequired: true,
                elsterKennziffer: "Kz 21 (USt-VA) + ZM",
                explanation: `B2B-Dienstleistung an einen Unternehmer im EU-Ausland (${countryName || "EU"}). Die Leistung ist in Deutschland nicht steuerbar (Ort der Leistung liegt beim Kunden). Sie MÜSSEN die gültige USt-IdNr. des Kunden auf der Rechnung angeben und den Umsatz in der Zusammenfassenden Meldung (ZM) deklarieren.`,
            };
        } else {
            // EU B2C
            return {
                isTaxableInGermany: true,
                vatRatePercent: 19,
                vatMechanism: "oss",
                mandatoryInvoiceNoteDe: "Umsatzsteuerpflichtige Leistung an Endverbraucher im EU-Ausland (Besteuerung im Inland bzw. via One-Stop-Shop / OSS).",
                mandatoryInvoiceNoteEn: "B2C supply within the EU subject to VAT (German VAT or OSS destination principle).",
                requiredVatIdDebtor: false,
                reportingZmRequired: false,
                elsterKennziffer: "Kz 81 bzw. OSS-Portal",
                explanation: "An Endverbraucher in der EU können Sie bis zur EU-weiten Schwelle von 10.000 €/Jahr mit deutscher USt (19 %) abrechnen. Darüber greift das One-Stop-Shop (OSS)-Verfahren mit dem lokalen Steuersatz des Ziellandes.",
            };
        }
    }

    // Third Country (USA, UK, Schweiz, etc.)
    if (recipientType === "b2b") {
        return {
            isTaxableInGermany: false,
            vatRatePercent: 0,
            vatMechanism: "drittland_non_taxable",
            mandatoryInvoiceNoteDe: "Nicht im Inland steuerbare sonstige Leistung (Ort der Leistung im Drittland gemäß § 3a Abs. 2 UStG). Rechnungsstellung erfolgt netto ohne Umsatzsteuer.",
            mandatoryInvoiceNoteEn: "Service not taxable in Germany pursuant to § 3a Para. 2 UStG. Place of supply is outside the European Union. Invoiced net without German VAT.",
            requiredVatIdDebtor: false,
            reportingZmRequired: false,
            elsterKennziffer: "Kz 45",
            explanation: `B2B-Leistung an ein Unternehmen im Drittland (${countryName || "Drittland"}). Der Leistungsort liegt am Unternehmenssitz des Kunden im Drittland. Die Leistung ist in Deutschland nicht steuerbar. Eine Zusammenfassende Meldung (ZM) ist NICHT erforderlich.`,
        };
    } else {
        // Third Country B2C
        return {
            isTaxableInGermany: false,
            vatRatePercent: 0,
            vatMechanism: "drittland_non_taxable",
            mandatoryInvoiceNoteDe: "Nicht im Inland steuerbare Leistung gemäß § 3a Abs. 4 UStG (Drittland-Privatkunde).",
            mandatoryInvoiceNoteEn: "Non-taxable service in Germany (place of performance outside EU).",
            requiredVatIdDebtor: false,
            reportingZmRequired: false,
            elsterKennziffer: "Kz 45",
            explanation: `Bei vielen digitalen Dienstleistungen und Beratungen für Privatkunden im Drittland (${countryName || "Drittland"}) gilt der Leistungsort nach § 3a Abs. 4 UStG als im Wohnsitzstaat gelegen und ist somit in Deutschland nicht steuerbar.`,
        };
    }
}
