/**
 * Statutory German Dunning & Reminder Engine (Mahnwesen & Verzug nach § 286 BGB)
 * Formats formal business dunning letters (DIN 5008 compliant)
 * with precise calculation of days overdue, interest, and statutory fees.
 */

import { calculateVerzugszinsen, getLatestBaseRate } from "./verzugszinsen";

export type DunningLevel = 1 | 2 | 3;

export interface DunningInput {
    creditorName: string;
    creditorAddress: string;
    creditorIban: string;
    creditorBic?: string;
    creditorBankName?: string;
    debtorName: string;
    debtorAddress: string;
    invoiceNumber: string;
    invoiceDate: string; // YYYY-MM-DD
    dueDate: string; // YYYY-MM-DD
    amount: number;
    dunningLevel: DunningLevel;
    isB2B: boolean;
    customMahngebuehr?: number;
    customGraceDays?: number; // Payment term in days (default 7 or 14)
}

export interface DunningCalculation {
    levelTitle: string;
    daysOverdue: number;
    interestAmount: number;
    interestRatePercent: number;
    baseRatePercent: number;
    mahngebuehr: number;
    statutoryLumpSum: number; // 40 € B2B (§ 288 Abs. 5 BGB)
    totalDue: number;
    newDeadlineDate: string; // YYYY-MM-DD
    letterSubject: string;
    introParagraph: string;
    legalNote: string;
    closingParagraph: string;
}

export function calculateDunning(input: DunningInput): DunningCalculation {
    const today = new Date();
    const [dueY, dueM, dueD] = input.dueDate.split("-").map(Number);
    const dueDateObj = new Date(dueY, dueM - 1, dueD);

    const diffMs = today.getTime() - dueDateObj.getTime();
    const daysOverdue = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    const todayStr = today.toISOString().split("T")[0];

    // Interest calculation
    let interestAmount = 0;
    const latestBaseRate = getLatestBaseRate();
    const interestRatePercent = latestBaseRate.rate + (input.isB2B ? 9.0 : 5.0);

    if (daysOverdue > 0 && input.dunningLevel > 1) {
        const vz = calculateVerzugszinsen(input.amount, input.dueDate, todayStr, input.isB2B);
        interestAmount = vz.interestAmount;
    }

    // Statutory lump sum: 40 € under § 288 Abs. 5 BGB for B2B only in Level 2 or 3
    const statutoryLumpSum = (input.isB2B && input.dunningLevel >= 2) ? 40.0 : 0.0;

    // Custom dunning fee (Mahngebühr)
    let mahngebuehr = 0;
    if (input.dunningLevel === 2) {
        mahngebuehr = input.customMahngebuehr ?? 2.50;
    } else if (input.dunningLevel === 3) {
        mahngebuehr = input.customMahngebuehr ?? 5.00;
    }

    const totalDue = Number((input.amount + interestAmount + statutoryLumpSum + mahngebuehr).toFixed(2));

    // Calculate new deadline date
    const graceDays = input.customGraceDays ?? (input.dunningLevel === 1 ? 10 : input.dunningLevel === 2 ? 7 : 5);
    const deadlineObj = new Date();
    deadlineObj.setDate(deadlineObj.getDate() + graceDays);
    const newDeadlineDate = deadlineObj.toISOString().split("T")[0];

    // Format German date strings
    const fmt = (iso: string) => {
        const [y, m, d] = iso.split("-");
        return `${d}.${m}.${y}`;
    };

    let levelTitle = "";
    let letterSubject = "";
    let introParagraph = "";
    let legalNote = "";
    let closingParagraph = "";

    if (input.dunningLevel === 1) {
        levelTitle = "Freundliche Zahlungserinnerung";
        letterSubject = `Zahlungserinnerung zu Rechnung Nr. ${input.invoiceNumber}`;
        introParagraph = `Sicherlich ist es Ihrer Aufmerksamkeit im Alltagsgeschäft entgangen, dass die nachstehende Rechnung vom ${fmt(input.invoiceDate)} mit Fälligkeit zum ${fmt(input.dueDate)} noch nicht beglichen wurde.`;
        legalNote = `Wir bitten Sie höflich, den offenen Betrag in Höhe von ${input.amount.toFixed(2)} € bis zum ${fmt(newDeadlineDate)} auf das unten angegebene Geschäftskonto zu überweisen. Sollte sich Ihre Zahlung mit diesem Schreiben überschnitten haben, betrachten Sie diese Erinnerung bitte als gegenstandslos.`;
        closingParagraph = "Wir danken Ihnen für Ihr Vertrauen und freuen uns auf die weiterhin gute Zusammenarbeit.";
    } else if (input.dunningLevel === 2) {
        levelTitle = "1. Mahnung (mit Verzugskosten)";
        letterSubject = `1. Mahnung zu Rechnung Nr. ${input.invoiceNumber} – Fälligkeit überschritten`;
        introParagraph = `Trotz unserer Zahlungserinnerung konnten wir bis zum heutigen Tag keinen Zahlungseingang für die Rechnung Nr. ${input.invoiceNumber} vom ${fmt(input.invoiceDate)} (ursprünglich fällig am ${fmt(input.dueDate)}) feststellen. Sie befinden sich gemäß § 286 BGB in Verzug.`;
        legalNote = `Aufgrund des Zahlungsverzugs stellen wir Ihnen die gesetzlichen Verzugszinsen sowie Verzugskosten gemäß § 288 BGB in Rechnung. Bitte überweisen Sie den fälligen Gesamtbetrag in Höhe von ${totalDue.toFixed(2)} € spätestens bis zum ${fmt(newDeadlineDate)}.`;
        closingParagraph = "Bitte beachten Sie, dass bei fruchtlosem Verstreichen dieser Frist weitere rechtliche Schritte und zusätzliche Kosten entstehen.";
    } else {
        levelTitle = "Letzte Mahnung vor Inkasso / Mahnbescheid";
        letterSubject = `LETZTE MAHNUNG / Zahlungsaufforderung vor gerichtlichen Schritten – Rechnung Nr. ${input.invoiceNumber}`;
        introParagraph = `Auf unsere bisherigen Zahlungserinnerungen und Mahnungen haben Sie leider nicht reagiert. Die Forderung aus Rechnung Nr. ${input.invoiceNumber} ist seit dem ${fmt(input.dueDate)} überfällig.`;
        legalNote = `Wir fordern Sie hiermit letztmalig auf, den offenen Gesamtbetrag in Höhe von ${totalDue.toFixed(2)} € bis zum ${fmt(newDeadlineDate)} ohne Abzug auf unser Konto zu überweisen. Nach Ablauf dieser Ausschlussfrist werden wir die Forderung ohne weitere Vorankündigung an ein Inkassounternehmen übergeben bzw. beim zuständigen Amtsgericht einen gerichtlichen Mahnbescheid beantragen. Die hierdurch entstehenden erheblichen Mehrkosten gehen zu Ihren Lasten.`;
        closingParagraph = "Wir hoffen im beiderseitigen Interesse auf eine unverzügliche Erledigung der Angelegenheit.";
    }

    return {
        levelTitle,
        daysOverdue,
        interestAmount,
        interestRatePercent,
        baseRatePercent: latestBaseRate.rate,
        mahngebuehr,
        statutoryLumpSum,
        totalDue,
        newDeadlineDate,
        letterSubject,
        introParagraph,
        legalNote,
        closingParagraph,
    };
}
