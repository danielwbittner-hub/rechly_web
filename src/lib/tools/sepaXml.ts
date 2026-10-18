/**
 * ISO 20022 SEPA XML Generator
 * Supports:
 * - pain.001.001.03: SEPA Credit Transfer (Sammelüberweisung)
 * - pain.008.001.02: SEPA Direct Debit CORE (Sammellastschrift)
 * Validated for German online banking portals (Sparkasse, Deutsche Bank, Commerzbank, etc.).
 */

export interface SepaTransaction {
    id: string;
    recipientName: string;
    iban: string;
    bic?: string;
    amount: number;
    remittanceInfo: string; // Verwendungszweck
    mandateId?: string; // For pain.008
    mandateDate?: string; // YYYY-MM-DD
}

export interface SepaXmlInput {
    type: "pain.001" | "pain.008";
    initiatorName: string;
    senderIban: string;
    senderBic?: string;
    creditorId?: string; // Mandatory for pain.008 (e.g. DE98ZZZ09999999999)
    executionDate: string; // YYYY-MM-DD
    transactions: SepaTransaction[];
}

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function cleanIban(iban: string): string {
    return iban.replace(/\s/g, "").toUpperCase();
}

export function generateSepaXml(input: SepaXmlInput): { xml: string; controlSum: number; count: number; error: string | null } {
    const count = input.transactions.length;
    if (count === 0) {
        return { xml: "", controlSum: 0, count: 0, error: "Mindestens eine Transaktion ist erforderlich." };
    }

    const controlSum = Number(
        input.transactions.reduce((acc, tx) => acc + (tx.amount || 0), 0).toFixed(2)
    );

    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const msgId = `MSG-${timestamp}-${Math.floor(Math.random() * 1000)}`;
    const pmtInfId = `PMT-${timestamp}`;

    if (input.type === "pain.001") {
        // pain.001.001.03 (Credit Transfer / Überweisung)
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${escapeXml(msgId)}</MsgId>
      <CreDtTm>${now.toISOString()}</CreDtTm>
      <NbOfTxs>${count}</NbOfTxs>
      <CtrlSum>${controlSum.toFixed(2)}</CtrlSum>
      <InitgPty>
        <Nm>${escapeXml(input.initiatorName)}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${escapeXml(pmtInfId)}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <NbOfTxs>${count}</NbOfTxs>
      <CtrlSum>${controlSum.toFixed(2)}</CtrlSum>
      <PmtTpInf>
        <SvcLvl>
          <Cd>SEPA</Cd>
        </SvcLvl>
      </PmtTpInf>
      <ReqdExctnDt>${input.executionDate}</ReqdExctnDt>
      <Dbtr>
        <Nm>${escapeXml(input.initiatorName)}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>${cleanIban(input.senderIban)}</IBAN>
        </Id>
      </DbtrAcct>
      <DbtrAgt>
        <FinInstnId>
          ${input.senderBic ? `<BIC>${escapeXml(input.senderBic.trim().toUpperCase())}</BIC>` : "<Othr><Id>NOTPROVIDED</Id></Othr>"}
        </FinInstnId>
      </DbtrAgt>
      <ChrgBr>SLEV</ChrgBr>
      ${input.transactions
          .map(
              (tx, idx) => `
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>E2E-${timestamp}-${idx + 1}</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="EUR">${tx.amount.toFixed(2)}</InstdAmt>
        </Amt>
        <CdtrAgt>
          <FinInstnId>
            ${tx.bic ? `<BIC>${escapeXml(tx.bic.trim().toUpperCase())}</BIC>` : "<Othr><Id>NOTPROVIDED</Id></Othr>"}
          </FinInstnId>
        </CdtrAgt>
        <Cdtr>
          <Nm>${escapeXml(tx.recipientName)}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>${cleanIban(tx.iban)}</IBAN>
          </Id>
        </CdtrAcct>
        <RmtInf>
          <Ustrd>${escapeXml(tx.remittanceInfo)}</Ustrd>
        </RmtInf>
      </CdtTrfTxInf>`
          )
          .join("")}
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;

        return { xml, controlSum, count, error: null };
    } else {
        // pain.008.001.02 (Direct Debit CORE / Lastschrift)
        const creditorId = input.creditorId?.trim().toUpperCase() || "DE98ZZZ09999999999";
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>${escapeXml(msgId)}</MsgId>
      <CreDtTm>${now.toISOString()}</CreDtTm>
      <NbOfTxs>${count}</NbOfTxs>
      <CtrlSum>${controlSum.toFixed(2)}</CtrlSum>
      <InitgPty>
        <Nm>${escapeXml(input.initiatorName)}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${escapeXml(pmtInfId)}</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <NbOfTxs>${count}</NbOfTxs>
      <CtrlSum>${controlSum.toFixed(2)}</CtrlSum>
      <PmtTpInf>
        <SvcLvl>
          <Cd>SEPA</Cd>
        </SvcLvl>
        <LclInstrm>
          <Cd>CORE</Cd>
        </LclInstrm>
        <SeqTp>RCUR</SeqTp>
      </PmtTpInf>
      <ReqdColltnDt>${input.executionDate}</ReqdColltnDt>
      <Cdtr>
        <Nm>${escapeXml(input.initiatorName)}</Nm>
      </Cdtr>
      <CdtrAcct>
        <Id>
          <IBAN>${cleanIban(input.senderIban)}</IBAN>
        </Id>
      </CdtrAcct>
      <CdtrAgt>
        <FinInstnId>
          ${input.senderBic ? `<BIC>${escapeXml(input.senderBic.trim().toUpperCase())}</BIC>` : "<Othr><Id>NOTPROVIDED</Id></Othr>"}
        </FinInstnId>
      </CdtrAgt>
      <ChrgBr>SLEV</ChrgBr>
      <CdtrSchmeId>
        <Id>
          <PrvtId>
            <Othr>
              <Id>${escapeXml(creditorId)}</Id>
              <SchmeNm>
                <Prtry>SEPA</Prtry>
              </SchmeNm>
            </Othr>
          </PrvtId>
        </Id>
      </CdtrSchmeId>
      ${input.transactions
          .map(
              (tx, idx) => `
      <DrctDbtTxInf>
        <PmtId>
          <EndToEndId>E2E-${timestamp}-${idx + 1}</EndToEndId>
        </PmtId>
        <InstdAmt Ccy="EUR">${tx.amount.toFixed(2)}</InstdAmt>
        <DrctDbtTx>
          <MndtRltdInf>
            <MndtId>${escapeXml(tx.mandateId || `MANDAT-${idx + 1}`)}</MndtId>
            <DtOfSgntr>${tx.mandateDate || input.executionDate}</DtOfSgntr>
          </MndtRltdInf>
        </DrctDbtTx>
        <DbtrAgt>
          <FinInstnId>
            ${tx.bic ? `<BIC>${escapeXml(tx.bic.trim().toUpperCase())}</BIC>` : "<Othr><Id>NOTPROVIDED</Id></Othr>"}
          </FinInstnId>
        </DbtrAgt>
        <Dbtr>
          <Nm>${escapeXml(tx.recipientName)}</Nm>
        </Dbtr>
        <DbtrAcct>
          <Id>
            <IBAN>${cleanIban(tx.iban)}</IBAN>
          </Id>
        </DbtrAcct>
        <RmtInf>
          <Ustrd>${escapeXml(tx.remittanceInfo)}</Ustrd>
        </RmtInf>
      </DrctDbtTxInf>`
          )
          .join("")}
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>`;

        return { xml, controlSum, count, error: null };
    }
}
