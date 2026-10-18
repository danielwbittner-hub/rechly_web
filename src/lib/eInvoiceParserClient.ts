/* eslint-disable @typescript-eslint/no-explicit-any */
import { XMLParser } from "fast-xml-parser";
import type { ParsedEInvoice } from "@/lib/eInvoiceParser";

export { type ParsedEInvoice } from "@/lib/eInvoiceParser";

const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true,
    parseTagValue: false,
});

const toNumber = (value: unknown): number | undefined => {
    if (value === undefined || value === null) return undefined;
    const num =
        typeof value === "object" && value !== null && "#text" in value
            ? parseFloat(String((value as { "#text": string })["#text"]))
            : parseFloat(String(value));
    return isNaN(num) ? undefined : num;
};

const toText = (value: unknown): string | undefined => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === "object" && "#text" in (value as object)) {
        return String((value as { "#text": string })["#text"]);
    }
    return String(value);
};

const parseCiiDate = (value: unknown): string | undefined => {
    const raw = toText(
        typeof value === "object" && value !== null && "DateTimeString" in value
            ? (value as { DateTimeString: unknown }).DateTimeString
            : value
    );
    if (!raw) return undefined;
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 8) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
    }
    return raw.length === 10 ? raw : undefined;
};

const first = <T>(value: T | T[] | undefined): T | undefined =>
    Array.isArray(value) ? value[0] : value;

const parseUbl = (doc: Record<string, any>): ParsedEInvoice => {
    const invoice = doc.Invoice ?? doc.CreditNote;
    const supplier = invoice?.AccountingSupplierParty?.Party ?? {};
    const vendorName =
        toText(supplier?.PartyLegalEntity?.RegistrationName) ??
        toText(first(supplier?.PartyName)?.Name);

    const monetary = invoice?.LegalMonetaryTotal ?? {};
    const taxTotal = first(invoice?.TaxTotal);
    const subtotal = first(taxTotal?.TaxSubtotal);

    return {
        vendor_name: vendorName,
        date: toText(invoice?.IssueDate),
        invoice_number: toText(invoice?.ID),
        amount_net: toNumber(monetary?.TaxExclusiveAmount),
        vat_amount: toNumber(taxTotal?.TaxAmount),
        amount_gross:
            toNumber(monetary?.TaxInclusiveAmount) ??
            toNumber(monetary?.PayableAmount),
        vat_rate_percent: toNumber(subtotal?.TaxCategory?.Percent),
        description: toText(first(invoice?.Note)),
    };
};

const parseCii = (doc: Record<string, any>): ParsedEInvoice => {
    const root = doc.CrossIndustryInvoice;
    const exchanged = root?.ExchangedDocument;
    const transaction = root?.SupplyChainTradeTransaction;
    const agreement = transaction?.ApplicableHeaderTradeAgreement;
    const settlement = transaction?.ApplicableHeaderTradeSettlement;
    const summation =
        settlement?.SpecifiedTradeSettlementHeaderMonetarySummation;
    const tax = first(settlement?.ApplicableTradeTax);

    return {
        vendor_name: toText(agreement?.SellerTradeParty?.Name),
        date: parseCiiDate(exchanged?.IssueDateTime),
        invoice_number: toText(exchanged?.ID),
        amount_net: toNumber(summation?.TaxBasisTotalAmount),
        vat_amount: toNumber(first(summation?.TaxTotalAmount)),
        amount_gross: toNumber(summation?.GrandTotalAmount),
        vat_rate_percent: toNumber(tax?.RateApplicablePercent),
        description: toText(first(exchanged?.IncludedNote)?.Content),
    };
};

export const parseEInvoiceXml = (xml: string): ParsedEInvoice => {
    const doc = parser.parse(xml);
    if (doc.CrossIndustryInvoice) return parseCii(doc);
    if (doc.Invoice || doc.CreditNote) return parseUbl(doc);
    throw new Error("Nicht unterstütztes E-Rechnungsformat (weder XRechnung UBL noch ZUGFeRD CII).");
};

/**
 * Client-side ZUGFeRD/Factur-X embedded XML extraction from PDF bytes.
 * Scans for uncompressed or raw XML embedded inside the PDF container.
 */
export const extractZugferdXmlFromPdfBytes = (bytes: Uint8Array): string | null => {
    const textDecoder = new TextDecoder("utf-8", { fatal: false });
    const fullText = textDecoder.decode(bytes);

    // Look for embedded XML in string
    if (fullText.includes("CrossIndustryInvoice") || fullText.includes("<Invoice")) {
        const ciiIndex = fullText.indexOf("<CrossIndustryInvoice");
        const ublIndex = fullText.indexOf("<Invoice");
        const startIndex = ciiIndex !== -1 ? ciiIndex : ublIndex;

        if (startIndex !== -1) {
            // Find closing tag
            const endCii = fullText.indexOf("</CrossIndustryInvoice>", startIndex);
            const endUbl = fullText.indexOf("</Invoice>", startIndex);
            const endIndex = endCii !== -1 ? endCii + "</CrossIndustryInvoice>".length : (endUbl !== -1 ? endUbl + "</Invoice>".length : -1);

            if (endIndex !== -1) {
                return fullText.slice(startIndex, endIndex);
            }
        }
    }

    return null;
};
