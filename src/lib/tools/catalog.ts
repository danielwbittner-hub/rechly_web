/**
 * Comprehensive catalog of German Business Superapp micro-tools.
 * Every tool runs client-side without registration, zero ads, zero tracking,
 * and feeds directly into Rechly's deterministic workflow.
 */

export interface ToolDefinition {
    id: string;
    slug: string;
    path: string;
    title: string;
    shortTitle: string;
    eyebrow: string;
    category: "Tagesgeschäft & E-Rechnung" | "Finanzen & Steuern" | "Kalkulation & HR" | "Recht & Vorlagen";
    description: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    badge?: string;
    icon: string;
    guideSections: Array<{
        title: string;
        content: string[];
        bullets?: string[];
    }>;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    relatedToolIds: string[];
}

export const TOOLS_CATALOG: ToolDefinition[] = [
    {
        id: "e-rechnung-viewer",
        slug: "e-rechnung-viewer",
        path: "/tools/e-rechnung-viewer",
        title: "E-Rechnung Viewer: XRechnung & ZUGFeRD kostenlos öffnen und prüfen",
        shortTitle: "E-Rechnung Viewer",
        eyebrow: "E-RECHNUNG & EN 16931",
        category: "Tagesgeschäft & E-Rechnung",
        description:
            "XRechnung (UBL/CII) und ZUGFeRD/Factur-X PDFs direkt im Browser ansehen, Pflichtangaben prüfen, Positionen analysieren, CSV exportieren und GiroCode erzeugen. 100% lokal ohne Upload.",
        metaTitle: "E-Rechnung Viewer kostenlos – XRechnung & ZUGFeRD öffnen | Rechly",
        metaDescription:
            "Kostenloser E-Rechnung Viewer: XRechnung (.xml) und ZUGFeRD (.pdf) direkt im Browser öffnen, Rechnungsdaten prüfen und als CSV exportieren. Ohne Registrierung & DSGVO-sicher.",
        keywords: [
            "E-Rechnung Viewer",
            "XRechnung öffnen",
            "ZUGFeRD Viewer kostenlos",
            "XML Rechnung ansehen",
            "E-Rechnung Pflichtangaben",
            "EN 16931 Validator",
        ],
        badge: "E-Rechnung 2025/2026",
        icon: "FileSearchOutlined",
        guideSections: [
            {
                title: "E-Rechnungspflicht in Deutschland seit 2025",
                content: [
                    "Mit dem Wachstumschancengesetz ist der Empfang von elektronischen Rechnungen nach dem europäischen Standard EN 16931 für alle inländischen B2B-Unternehmen seit dem 1. Januar 2025 verpflichtend.",
                    "Eine reine Bild-PDF per E-Mail gilt im Geschäftsverkehr nicht mehr als rechtskonforme E-Rechnung. Echte E-Rechnungen basieren auf strukturierten XML-Daten – entweder als reine XML (XRechnung) oder als hybride PDF/A-3 mit eingebetteter XML (ZUGFeRD).",
                ],
                bullets: [
                    "Empfangspflicht gilt ausnahmslos für alle Unternehmer (auch Kleinunternehmer)",
                    "XRechnung nutzt UBL (Universal Business Language) oder UN/CEFACT CII",
                    "ZUGFeRD kombiniert druckbare PDF mit maschinenlesbarem XML-Anhang",
                ],
            },
            {
                title: "Warum eine lokale Browser-Prüfung sicherer ist",
                content: [
                    "Rechnungen enthalten hochsensible Betriebsgeheimnisse, Kontoverbindungen, Preise und Kundendaten. Viele Online-Viewer laden Rechnungsdateien auf fremde Cloud-Server hoch.",
                    "Der Rechly E-Rechnung Viewer arbeitet zu 100% lokal im Browser auf deinem Endgerät. Deine XML- oder PDF-Daten werden niemals an Dritte übertragen.",
                ],
            },
        ],
        faqs: [
            {
                question: "Kann ich mit diesem Viewer auch ZUGFeRD PDFs öffnen?",
                answer: "Ja. Der Viewer extrahiert automatisch die im PDF-Container eingebettete CrossIndustryInvoice-XML und stellt Beträge, Steuern und Positionen übersichtlich dar.",
            },
            {
                question: "Ist die Nutzung wirklich ohne Registrierung kostenlos?",
                answer: "Ja, alle Rechly Werkzeuge stehen dauerhaft kostenlos und ohne Benutzerkonto für die Öffentlichkeit bereit.",
            },
        ],
        relatedToolIds: ["girocode-generator", "leitweg-id-pruefen", "skontorechner"],
    },
    {
        id: "girocode-generator",
        slug: "girocode-generator",
        path: "/tools/girocode-generator",
        title: "GiroCode Generator: Kostenloser EPC-QR-Code für Rechnungen & Überweisungen",
        shortTitle: "GiroCode Generator",
        eyebrow: "EPC-QR-CODE & SEPA",
        category: "Tagesgeschäft & E-Rechnung",
        description:
            "Erstelle in Sekunden einen offiziellen SEPA GiroCode (EPC069-12 QR-Code) für deine Rechnungen. Kunden scannen den Code in ihrer Banking-App und überweisen fehlerfrei mit vorausgefüllter IBAN und Betrag.",
        metaTitle: "GiroCode Generator kostenlos – EPC-QR-Code für Rechnungen erstellen",
        metaDescription:
            "Offizieller EPC GiroCode Generator: Erstelle SEPA-QR-Codes für deine Rechnungen. Schneller bezahlt werden, Tippfehler vermeiden. Sofort als PNG herunterladen oder kopieren.",
        keywords: [
            "GiroCode erstellen",
            "EPC QR Code Generator",
            "SEPA QR Code kostenlos",
            "Zahlschein QR Code Rechnung",
            "GiroCode Vorlage",
        ],
        badge: "Beliebt",
        icon: "QrcodeOutlined",
        guideSections: [
            {
                title: "Wie funktioniert der GiroCode (EPC-QR-Code)?",
                content: [
                    "Der GiroCode basiert auf der Norm des European Payments Council (EPC069-12). Er kodiert Empfängername, IBAN, BIC, Zahlungsbetrag und Verwendungszweck in einem standardisierten zweidimensionalen QR-Code.",
                    "Kunden müssen weder IBAN noch lange Rechnungsnummern abtippen: Das Scannen mit einer beliebigen deutschen Banking-App (Sparkasse, Volksbank, Deutsche Bank, ING, DKB, N26 usw.) füllt die Überweisung sekundenschnell und fehlerfrei aus.",
                ],
                bullets: [
                    "Keine Tippfehler bei 22-stelligen IBANs und Rechnungsnummern",
                    "Signifikant schnellere Zahlungseingänge im Schnitt um 3 bis 5 Tage",
                    "Unterstützt von nahezu allen europäischen Banking-Apps",
                ],
            },
        ],
        faqs: [
            {
                question: "Ist der BIC im GiroCode verpflichtend?",
                answer: "Nein, innerhalb des SEPA-Raums (EWR) ist die Angabe des BIC gemäß EPC-Standard Version 002 optional. Die Angabe von Name, IBAN und Betrag genügt.",
            },
            {
                question: "Kann ich den GiroCode direkt auf meine Rechly Rechnungen drucken?",
                answer: "Ja, in Rechly kannst du in den Einstellungen deine IBAN hinterlegen. Auf Wunsch platziert Rechly den fertigen GiroCode automatisch auf jeder PDF-Rechnung.",
            },
        ],
        relatedToolIds: ["e-rechnung-viewer", "skontorechner", "verzugszinsen-rechner"],
    },
    {
        id: "verzugszinsen-rechner",
        slug: "verzugszinsen-rechner",
        path: "/tools/verzugszinsen-rechner",
        title: "Verzugszinsen-Rechner 2026: Gesetzliche Zinsen & 40 € Mahnpauschale berechnen",
        shortTitle: "Verzugszinsen-Rechner",
        eyebrow: "§ 288 BGB & BUNDESBANK",
        category: "Finanzen & Steuern",
        description:
            "Berechne tagesgenaue gesetzliche Verzugszinsen nach §§ 286, 288 BGB mit den aktuellen Basiszinssätzen der Deutschen Bundesbank. Inklusive 40 € Verzugspauschale für B2B und fertigem Mahnschreiben-Generator.",
        metaTitle: "Verzugszinsen Rechner 2026 – BGB Verzugszinsen & 40 € Pauschale berechnen",
        metaDescription:
            "Tagesgenauer Verzugszinsen-Rechner nach § 288 BGB mit aktuellen Bundesbank-Zinssätzen. Berechne Verzugszinsen für B2B (+9%) und B2C (+5%) plus 40 € Mahnpauschale & Mahntext.",
        keywords: [
            "Verzugszinsen berechnen",
            "Verzugszinsen Rechner 2026",
            "Basiszinssatz Bundesbank",
            "40 Euro Verzugspauschale B2B",
            "Mahnung Verzugszinsen Muster",
            "§ 288 BGB Zinsen",
        ],
        badge: "§ 288 BGB",
        icon: "DollarOutlined",
        guideSections: [
            {
                title: "Gesetzliche Grundlagen für Verzugszinsen in Deutschland",
                content: [
                    "Gerät ein Kunde mit der Begleichung einer fälligen Rechnung in Verzug, steht dem Gläubiger kraft Gesetzes ein Zinsanspruch nach § 288 BGB zu. Eine Mahnung ist oft nicht einmal erforderlich, wenn das Zahlungsziel kalendermäßig bestimmt war (§ 286 Abs. 2 Nr. 1 BGB).",
                    "Die Höhe des Verzugszinssatzes richtet sich nach dem halbjährlich von der Deutschen Bundesbank bekannt gegebenen Basiszinssatz nach § 247 BGB:",
                ],
                bullets: [
                    "B2B (Geschäftskunden): Basiszinssatz + 9 Prozentpunkte (§ 288 Abs. 2 BGB)",
                    "B2C (Verbraucher): Basiszinssatz + 5 Prozentpunkte (§ 288 Abs. 1 BGB)",
                    "Gesetzliche Verzugspauschale von 40 € bei Geschäftskunden (§ 288 Abs. 5 BGB) – ohne Schadensnachweis sofort fällig!",
                ],
            },
        ],
        faqs: [
            {
                question: "Wann genau beginnt der Zahlungsverzug?",
                answer: "Der Verzug beginnt am Tag nach dem vertraglich vereinbarten Fälligkeitsdatum. Bei Entgeltforderungen gerät ein Schuldner spätestens 30 Tage nach Zugang der Rechnung in Verzug (§ 286 Abs. 3 BGB).",
            },
            {
                question: "Darf ich die 40 € Verzugspauschale auch bei Verbrauchern verlangen?",
                answer: "Nein, die 40 € Verzugspauschale nach § 288 Abs. 5 BGB gilt ausschließlich für Forderungen gegen andere Unternehmer (B2B). Bei Verbrauchern können nur tatsächliche Mahnkosten (z. B. Porto) geltend gemacht werden.",
            },
        ],
        relatedToolIds: ["skontorechner", "girocode-generator", "e-rechnung-viewer"],
    },
    {
        id: "ust-idnr-pruefen",
        slug: "ust-idnr-pruefen",
        path: "/tools/ust-idnr-pruefen",
        title: "EU USt-IdNr. Live-Prüfer: UID Abfrage & 10-Jahres Audit-Beleg (VIES)",
        shortTitle: "USt-IdNr. Prüfer (VIES)",
        eyebrow: "VIES & § 6a / § 13b UStG",
        category: "Tagesgeschäft & E-Rechnung",
        description:
            "Überprüfe Umsatzsteuer-Identifikationsnummern europäischer Geschäftspartner in Echtzeit über das VIES-System der EU-Kommission. Erhalte einen druckfertigen Prüfnachweis für die 10-jährige Aufbewahrungspflicht beim Finanzamt.",
        metaTitle: "USt-IdNr prüfen kostenlos – VIES UID Abfrage & Prüfbeleg | Rechly",
        metaDescription:
            "USt-IdNr. (UID) live prüfen über die EU VIES Schnittstelle: Gültigkeit, Firmenname und Adresse abfragen. Erstelle den amtlichen Prüfbeleg für steuerfreie EU-Lieferungen nach § 6a UStG.",
        keywords: [
            "USt-IdNr prüfen",
            "UID Abfrage VIES",
            "Umsatzsteuer-Identifikationsnummer prüfen",
            "VIES VAT check",
            "Gelangensbestätigung USt-IdNr",
            "Reverse Charge Prüfung",
        ],
        badge: "Offizielle EU VIES",
        icon: "SafetyCertificateOutlined",
        guideSections: [
            {
                title: "Warum die qualifizierte USt-IdNr.-Prüfung für deutsche Unternehmer Pflicht ist",
                content: [
                    "Lieferst du Waren oder Dienstleistungen steuerfrei an ein Unternehmen im EU-Ausland (innergemeinschaftliche Lieferung nach § 6a UStG oder B2B-Dienstleistung nach § 13b UStG / Reverse Charge), haftest du für die deutsche Umsatzsteuer, falls die USt-IdNr. deines Kunden ungültig ist.",
                    "Die Rechtsprechung der Finanzgerichte und des Bundesfinanzhofs (BFH) verlangt, dass Unternehmer den Nachweis der Gültigkeit zum Zeitpunkt der Leistungserbringung dokumentieren und gem. § 14b UStG 10 Jahre aufbewahren.",
                ],
                bullets: [
                    "Verhindert Steuernachzahlungen von 19% bei Betriebsprüfungen",
                    "Gültigkeit und Adressabgleich im offiziellen EU-VIES-Register",
                    "Druckfertiger Prüfnachweis mit Zeitstempel und Konsultationsnummer",
                ],
            },
        ],
        faqs: [
            {
                question: "Warum wird bei manchen deutschen Nummern kein Name angezeigt?",
                answer: "Deutschland und einige wenige EU-Staaten gestatten aus Datenschutzgründen keine unbeschränkte Namensoffenlegung im automatisierten Abfrageverfahren. Der Status 'GÜLTIG' bestätigt dennoch die amtliche Registrierung.",
            },
        ],
        relatedToolIds: ["leitweg-id-pruefen", "e-rechnung-viewer", "impressum-generator"],
    },
    {
        id: "skontorechner",
        slug: "skontorechner",
        path: "/tools/skontorechner",
        title: "Skontorechner: Skonto, Effektivzins & Vorsteuerkorrektur (§ 17 UStG)",
        shortTitle: "Skontorechner",
        eyebrow: "SKONTO & FINANZIERUNG",
        category: "Finanzen & Steuern",
        description:
            "Berechne Skonto-Ersparnis, Zahlungsbetrag, den enormen effektiven Jahreszins (p. a.) und den Vorsteuerabzug nach § 17 UStG. Finde heraus, ob sich die Nutzung von Kontokorrentkrediten für Skontoabzug lohnt.",
        metaTitle: "Skontorechner – Skonto, Effektivzins & Vorsteuer berechnen | Rechly",
        metaDescription:
            "Kostenloser Skontorechner: Skonto-Ersparnis, Zahlungsbetrag und effektiven Jahreszins p.a. berechnen. Inklusive Vergleich mit Bankkredit und Vorsteuerkorrektur nach § 17 UStG.",
        keywords: [
            "Skontorechner",
            "Skonto berechnen",
            "Effektivzins Skonto",
            "Lieferantenkredit Zinsen",
            "Vorsteuerkorrektur § 17 UStG",
            "Skontoabzug Formel",
        ],
        badge: "Cashflow-Tipp",
        icon: "PercentageOutlined",
        guideSections: [
            {
                title: "Die Macht des Skontos: Warum Lieferantenkredit so teuer ist",
                content: [
                    "Gewährt ein Lieferant z. B. 2 % Skonto bei Zahlung innerhalb von 10 Tagen statt 30 Tagen Zahlungsziel, beträgt die Fristverlängerung lediglich 20 Tage. Rechnet man diesen Satz auf ein ganzes Jahr hoch (360 / 20 = 18-fache Umschlagshäufigkeit), ergibt sich ein astronomischer Effektivzins von ca. 36,7 % p. a.!",
                    "Kaum ein Unternehmer kann am Kapitalmarkt eine garantierte risikolose Rendite von über 30 % erzielen. Selbst wenn das eigene Bankkonto vorübergehend überzogen werden muss (z. B. zu 9 % bis 12 % Kontokorrentzins), bleibt ein erheblicher Gewinnüberschuss.",
                ],
            },
        ],
        faqs: [
            {
                question: "Muss bei Skontoabzug die Umsatzsteuer korrigiert werden?",
                answer: "Ja. Nach § 17 Abs. 1 UStG mindert der Skontoabzug die Bemessungsgrundlage. Der Käufer muss seinen Vorsteuerabzug und der Verkäufer seine abzuführende Umsatzsteuer im entsprechenden Voranmeldungszeitraum korrigieren.",
            },
        ],
        relatedToolIds: ["verzugszinsen-rechner", "girocode-generator", "stundensatz-rechner"],
    },
    {
        id: "stundensatz-rechner",
        slug: "stundensatz-rechner",
        path: "/tools/stundensatz-rechner",
        title: "Stundensatz-Rechner für Freelancer, Selbstständige & Handwerker",
        shortTitle: "Stundensatz-Rechner",
        eyebrow: "KALKULATION & KAPAZITÄT",
        category: "Kalkulation & HR",
        description:
            "Ermittle deinen realistischen Mindest- und Markt-Stundensatz sowie Tagessatz. Berücksichtigt Wunsch-Nettoeinkommen, betriebliche Fixkosten, Vorsorge, Urlaub, Krankheit und die reale fakturierbare Auslastung.",
        metaTitle: "Stundensatz Rechner – Freelancer & Handwerker Stundensatz kalkulieren",
        metaDescription:
            "Berechne deinen optimalen Stundensatz und Tagessatz als Freelancer oder Handwerker. Mit Kapazitätsrechnung, Betriebskosten, Steuern, Urlaub & realistischer Abrechnungsquote.",
        keywords: [
            "Stundensatz berechnen",
            "Stundensatz Rechner Freelancer",
            "Handwerker Stundensatz kalkulieren",
            "Tagessatz Rechner",
            "Mindesthonorar Selbstständige",
            "Kalkulation Stundensatz",
        ],
        badge: "Sehr gefragt",
        icon: "CalculatorOutlined",
        guideSections: [
            {
                title: "Der größte Denkfehler bei der Stundensatzkalkulation",
                content: [
                    "Viele Gründer und Selbstständige teilen ihr Wunsch-Jahreseinkommen fälschlicherweise durch 1.600 bis 1.800 Stunden (Vollzeitangestellte). Doch als Unternehmer ist man nicht zu 100 % fakturierbar.",
                    "Nach Abzug von Feiertagen, Urlaub, Krankheit sowie unbezahlten Stunden für Buchhaltung, Marketing, Akquise und Weiterbildung liegt die reale fakturierbare Quote typischerweise nur bei 60 % bis maximal 70 % der Gesamtarbeitszeit (ca. 900 bis 1.100 abrechenbare Stunden im Jahr).",
                ],
            },
        ],
        faqs: [
            {
                question: "Wie berechnet sich der Tagessatz aus dem Stundensatz?",
                answer: "Der Tagessatz entspricht im deutschen Beratungs- und Agenturmarkt typischerweise dem 8-fachen des Netto-Stundensatzes.",
            },
        ],
        relatedToolIds: ["arbeitstage-rechner", "kleinunternehmer-rechner", "gewerbesteuer-rechner"],
    },
    {
        id: "kleinunternehmer-rechner",
        slug: "kleinunternehmer-rechner",
        path: "/tools/kleinunternehmer-rechner",
        title: "Kleinunternehmer-Rechner 2026: § 19 UStG Grenzwerte (25.000 € / 100.000 €)",
        shortTitle: "Kleinunternehmer-Rechner",
        eyebrow: "§ 19 UStG REFORM",
        category: "Finanzen & Steuern",
        description:
            "Überprüfe deine Berechtigung für die Kleinunternehmerregelung nach den neuen gesetzlichen Grenzwerten (25.000 € Vorjahr / 100.000 € lfd. Jahr). Simuliere Preisvorteil bei Privatkunden vs. Vorsteuerabzug.",
        metaTitle: "Kleinunternehmer Rechner 2026 – Neue 25.000 € Grenze § 19 UStG | Rechly",
        metaDescription:
            "Kleinunternehmer Rechner mit den neuen Grenzen ab 2025/2026: 25.000 € Vorjahr und 100.000 € lfd. Jahr. Vergleich Kleinunternehmer vs. Regelbesteuerung & Rechnungs-Mustertext.",
        keywords: [
            "Kleinunternehmer Rechner",
            "Kleinunternehmer Grenze 2026",
            "25000 Euro Grenze § 19 UStG",
            "Kleinunternehmerregelung Vor- und Nachteile",
            "Kleinunternehmer Rechnung Pflichtangaben",
            "Wachstumschancengesetz Kleinunternehmer",
        ],
        badge: "Gesetzesreform",
        icon: "ShopOutlined",
        guideSections: [
            {
                title: "Die reformierten Grenzwerte nach § 19 UStG",
                content: [
                    "Durch das Wachstumschancengesetz wurden die Schwellenwerte für die Kleinunternehmerregelung zum 1. Januar 2025 deutlich angehoben. Der Vorjahresumsatz darf nun bis zu 25.000 € betragen (früher 22.000 €), der voraussichtliche Umsatz im laufenden Kalenderjahr bis zu 100.000 € (früher 50.000 €).",
                    "Zudem entfällt für viele Kleinunternehmer die Pflicht zur jährlichen Abgabe einer Umsatzsteuererklärung, sofern das Finanzamt nicht ausdrücklich dazu auffordert.",
                ],
            },
        ],
        faqs: [
            {
                question: "Muss ich als Kleinunternehmer dennoch E-Rechnungen empfangen können?",
                answer: "Ja! Die gesetzliche Pflicht zum Empfang von E-Rechnungen nach § 14 UStG gilt seit 01.01.2025 auch für Kleinunternehmer.",
            },
        ],
        relatedToolIds: ["stundensatz-rechner", "gewerbesteuer-rechner", "impressum-generator"],
    },
    {
        id: "impressum-generator",
        slug: "impressum-generator",
        path: "/tools/impressum-generator",
        title: "Impressum Generator (§ 5 DDG): Rechtssicheres Impressum & Pflichtangaben",
        shortTitle: "Impressum Generator (§ 5 DDG)",
        eyebrow: "DIGITALE-DIENSTE-GESETZ",
        category: "Recht & Vorlagen",
        description:
            "Erstelle in 2 Minuten ein abmahnsicheres Impressum nach dem neuen Digitale-Dienste-Gesetz (§ 5 DDG, Nachfolger des TMG). Für Freelancer, Gewerbetreibende, GbR und GmbH. Sofort kopierbar als Text oder HTML.",
        metaTitle: "Impressum Generator kostenlos – § 5 DDG Impressum Vorlage | Rechly",
        metaDescription:
            "Kostenloser Impressum Generator nach aktuellem Recht (§ 5 DDG statt § 5 TMG). Erstelle ein rechtssicheres Impressum für deine Website, Webshop und Social Media. Ohne Anmeldung.",
        keywords: [
            "Impressum Generator",
            "Impressum erstellen kostenlos",
            "Digitale-Dienste-Gesetz § 5 DDG Impressum",
            "Impressum Muster Einzelunternehmen",
            "Impressum Vorlage Website",
            "Impressumspflicht Deutschland",
        ],
        badge: "Rechtsupdate 2025",
        icon: "FileProtectOutlined",
        guideSections: [
            {
                title: "Vom TMG zum DDG: Wichtige Änderungen für Webseiten-Betreiber",
                content: [
                    "Am 14. Mai 2024 ist in Deutschland das Digitale-Dienste-Gesetz (DDG) in Kraft getreten. Es hat das bisherige Telemediengesetz (TMG) abgelöst. Webseitenbetreiber, die in ihrem Impressum noch auf '§ 5 TMG' verweisen, sollten diesen Verweis zügig auf '§ 5 DDG' aktualisieren.",
                    "Ein fehlendes oder unvollständiges Impressum stellt einen abmahnfähigen Wettbewerbsverstoß dar.",
                ],
            },
        ],
        faqs: [
            {
                question: "Braucht jedes Unternehmen ein Impressum?",
                answer: "Ja, jede geschäftsmäßig betriebene Online-Präsenz (Webseite, Online-Shop, Social-Media-Profil wie LinkedIn, Instagram oder YouTube) benötigt ein leicht erreichbares Impressum.",
            },
        ],
        relatedToolIds: ["kleinunternehmer-rechner", "e-rechnung-viewer", "leitweg-id-pruefen"],
    },
    {
        id: "bewirtungsbeleg-rechner",
        slug: "bewirtungsbeleg-rechner",
        path: "/tools/bewirtungsbeleg-rechner",
        title: "Bewirtungsbeleg Rechner: 70/30 Steuer-Split, Trinkgeld & PDF-Vorlage",
        shortTitle: "Bewirtungsbeleg Rechner",
        eyebrow: "§ 4 ABS. 5 NR. 2 ESTG",
        category: "Finanzen & Steuern",
        description:
            "Teile Geschäftsessen vorschriftsmäßig in 70% Betriebsausgabe und 30% Privatanteil nach § 4 EStG auf. Mit 100% Vorsteuerabzug, Trinkgeld-Erfassung und druckfertigem BMF-konformen Eigenbeleg.",
        metaTitle: "Bewirtungsbeleg Rechner – 70/30 Split, Vorsteuer & Vorlage | Rechly",
        metaDescription:
            "Bewirtungskosten nach § 4 Abs. 5 Nr. 2 EStG exakt aufteilen: 70% Betriebsausgabe, 30% Eigenanteil und voller Vorsteuerabzug. Inklusive Trinkgeld & druckfertigem Bewirtungsbeleg.",
        keywords: [
            "Bewirtungsbeleg Rechner",
            "Bewirtungsbeleg 70 30 Split",
            "Bewirtungskosten Trinkgeld buchen",
            "Bewirtungsbeleg Vorlage PDF",
            "Bewirtung Betriebsausgabe Vorsteuer",
        ],
        badge: "GoBD konform",
        icon: "CoffeeOutlined",
        guideSections: [
            {
                title: "Die steuerlichen Spielregeln bei Bewirtungskosten",
                content: [
                    "Bewirtungen von Geschäftspartnern aus geschäftlichem Anlass können zu 70 % als Betriebsausgaben geltend gemacht werden (§ 4 Abs. 5 Nr. 2 EStG). Die restlichen 30 % stellen steuerlich nicht abzugsfähigen privaten Aufwand dar.",
                    "Entscheidender Vorteil: Ist der Unternehmer zum Vorsteuerabzug berechtigt, kann die gesamte auf der Gaststättenrechnung ausgewiesene Vorsteuer zu 100 % geltend gemacht werden!",
                ],
            },
        ],
        faqs: [
            {
                question: "Muss der Gaststättenbeleg maschinell erstellt sein?",
                answer: "Ja, seit der Kassenprüfungsverordnung / GoBD müssen Gaststättenrechnungen maschinell mit TSE-Signatur (Technische Sicherheitseinrichtung) ausgedruckt sein. Handgeschriebene Quittungen erkennt das Finanzamt in der Regel nicht an.",
            },
        ],
        relatedToolIds: ["verpflegungsmehraufwand-rechner", "kassenbuch-vorlage", "skontorechner"],
    },
    {
        id: "arbeitstage-rechner",
        slug: "arbeitstage-rechner",
        path: "/tools/arbeitstage-rechner",
        title: "Arbeitstage-Rechner 2026: Gesetzliche Feiertage & Werktage aller 16 Bundesländer",
        shortTitle: "Arbeitstage-Rechner 2026",
        eyebrow: "WERKTAGE & FEIERTAGSKALENDER",
        category: "Kalkulation & HR",
        description:
            "Ermittle tagesgenau die Arbeitstage und gesetzlichen Feiertage für 2025, 2026 und 2027 in allen 16 Bundesländern. Inklusive monatlicher Aufschlüsselung, CSV-Export und Umsatzpotenzial-Berechnung.",
        metaTitle: "Arbeitstage Rechner 2026 – Arbeitstage & Feiertage nach Bundesland",
        metaDescription:
            "Berechne Arbeitstage und Feiertage 2026 für alle 16 Bundesländer (Bayern, NRW, BW, etc.). Monatliche Übersicht, CSV-Download und Umsatzpotenzial für Freiberufler & Unternehmen.",
        keywords: [
            "Arbeitstage Rechner 2026",
            "Arbeitstage Bayern 2026",
            "Arbeitstage NRW 2026",
            "Feiertage Deutschland 2026",
            "Arbeitstage Baden-Württemberg",
            "Werktage 2026 berechnen",
        ],
        badge: "Aktualisiert 2026",
        icon: "CalendarOutlined",
        guideSections: [
            {
                title: "Regionale Unterschiede bei Feiertagen in Deutschland",
                content: [
                    "In Deutschland gibt es 9 bundeseinheitliche gesetzliche Feiertage. Je nach Bundesland kommen jedoch bis zu 5 weitere landesspezifische Feiertage hinzu (z. B. Heilige Drei Könige, Fronleichnam, Reformationstag, Allerheiligen oder Buß- und Bettag).",
                    "Bayern (insb. Augsburg mit 14 Feiertagen) und Baden-Württemberg haben die meisten Feiertage, während Bundesländer wie Berlin, Hamburg oder Niedersachsen weniger freie Tage aufweisen.",
                ],
            },
        ],
        faqs: [
            {
                question: "Werden Feiertage abgezogen, die auf ein Wochenende fallen?",
                answer: "Nein, unser Rechner zieht nur Feiertage von den Arbeitstagen ab, die tatsächlich auf einen Wochentag von Montag bis Freitag fallen.",
            },
        ],
        relatedToolIds: ["stundensatz-rechner", "bautagebuch-vorlage", "verpflegungsmehraufwand-rechner"],
    },
    {
        id: "leitweg-id-pruefen",
        slug: "leitweg-id-pruefen",
        path: "/tools/leitweg-id-pruefen",
        title: "Leitweg-ID Prüfer & Generator: B2G XRechnung Mod-97 Checksumme validieren",
        shortTitle: "Leitweg-ID Prüfer",
        eyebrow: "B2G XRECHNUNG & KOSIT",
        category: "Tagesgeschäft & E-Rechnung",
        description:
            "Validiere jede B2G Leitweg-ID für öffentliche Auftraggeber in Deutschland. Prüft die Struktur, ermittelt das Bundesland und berechnet die mathematische Prüfziffer nach ISO 7064 Mod 97-10.",
        metaTitle: "Leitweg-ID prüfen – XRechnung Prüfziffer & Validator | Rechly",
        metaDescription:
            "Kostenloser Leitweg-ID Prüfer: Validiere Leitweg-IDs für Behörden-Rechnungen (ZRE / OZG-RE). Prüft Format, Bundesland und ISO 7064 Mod 97-10 Prüfziffer.",
        keywords: [
            "Leitweg-ID prüfen",
            "Leitweg-ID XRechnung",
            "Leitweg-ID Prüfziffer berechnen",
            "KoSIT Leitweg-ID Format",
            "B2G Rechnung Bund Länder",
        ],
        badge: "KoSIT 3.0",
        icon: "AuditOutlined",
        guideSections: [
            {
                title: "Was ist die Leitweg-ID bei elektronischen Behördenrechnungen?",
                content: [
                    "Die Leitweg-ID ist die eindeutige Adressierungsnummer einer öffentlichen Dienststelle in Deutschland. Sie ist in jeder XRechnung an Bundes-, Landes- oder Kommunalbehörden im Feld BuyerReference (BT-10) zwingend erforderlich.",
                    "Eine Leitweg-ID gliedert sich in: Grobadressierung (Bundesland + Kennziffer), Feinadressierung und eine 2-stellige Prüfziffer nach ISO 7064 Mod 97-10.",
                ],
            },
        ],
        faqs: [
            {
                question: "Woher bekomme ich die Leitweg-ID meiner Kundenbehörde?",
                answer: "Die Leitweg-ID wird vom öffentlichen Auftraggeber bei der Auftragserteilung oder in der schriftlichen Bestellung mitgeteilt.",
            },
        ],
        relatedToolIds: ["e-rechnung-viewer", "ust-idnr-pruefen", "girocode-generator"],
    },
    {
        id: "gewerbesteuer-rechner",
        slug: "gewerbesteuer-rechner",
        path: "/tools/gewerbesteuer-rechner",
        title: "Gewerbesteuer-Rechner 2026: Hebesätze, Freibetrag & § 35 EStG Anrechnung",
        shortTitle: "Gewerbesteuer-Rechner",
        eyebrow: "GEWERBESTEUER & HEBESATZ",
        category: "Finanzen & Steuern",
        description:
            "Berechne die Gewerbesteuer für Einzelunternehmen, Personengesellschaften und GmbHs. Mit automatischen Hebesätzen deutscher Großstädte, 24.500 € Freibetrag und § 35 EStG Einkommensteuer-Anrechnung.",
        metaTitle: "Gewerbesteuer Rechner 2026 – Hebesätze & Steueranrechnung | Rechly",
        metaDescription:
            "Gewerbesteuer berechnen mit aktuellen Hebesätzen deutscher Städte. Inklusive Freibetrag von 24.500 €, Steuermessbetrag und Steuerermäßigung nach § 35 EStG.",
        keywords: [
            "Gewerbesteuer Rechner",
            "Gewerbesteuer Hebesatz 2026",
            "Gewerbesteuer Freibetrag 24500",
            "Gewerbesteuer Anrechnung § 35 EStG",
            "Gewerbesteuer GmbH berechnen",
        ],
        badge: "Hebesatz-Finder",
        icon: "BankOutlined",
        guideSections: [
            {
                title: "Wie die Gewerbesteuer in Deutschland berechnet wird",
                content: [
                    "Die Gewerbesteuer ist eine Realsteuer der Gemeinden. Einzelunternehmer und Personengesellschaften (GbR, OHG, KG) erhalten einen gesetzlichen Freibetrag von 24.500 € (§ 11 Abs. 1 GewStG). Kapitalgesellschaften wie die GmbH oder UG haben keinen Freibetrag.",
                    "Auf den übersteigenden Gewerbeertrag wird die bundeseinheitliche Steuermesszahl von 3,5 % angewendet. Dieser Steuermessbetrag wird anschließend mit dem individuellen Hebesatz der jeweiligen Gemeinde multipliziert.",
                ],
            },
        ],
        faqs: [
            {
                question: "Zahlen Freiberufler Gewerbesteuer?",
                answer: "Nein! Freiberufler nach § 18 EStG (z. B. IT-Berater, Journalisten, Designer, Ärzte, Anwälte) unterliegen kraft Gesetzes nicht der Gewerbesteuer.",
            },
        ],
        relatedToolIds: ["kleinunternehmer-rechner", "stundensatz-rechner", "verzugszinsen-rechner"],
    },
    {
        id: "verpflegungsmehraufwand-rechner",
        slug: "verpflegungsmehraufwand-rechner",
        path: "/tools/verpflegungsmehraufwand-rechner",
        title: "Verpflegungsmehraufwand Rechner 2026: Spesenpauschalen & Reisekosten (BMF)",
        shortTitle: "Spesenrechner 2026",
        eyebrow: "SPESEN & DIENSTREISEN",
        category: "Kalkulation & HR",
        description:
            "Berechne den gesetzlichen Verpflegungsmehraufwand für In- und Auslandsdienstreisen nach BMF-Tabelle. Mit 24h-Pauschalen, An-/Abreisetag und Mahlzeitenkürzungen (Frühstück, Mittag, Abendessen).",
        metaTitle: "Verpflegungsmehraufwand 2026 Rechner – Spesen Inland & Ausland BMF",
        metaDescription:
            "Spesen- und Verpflegungsmehraufwand-Rechner nach § 9 Abs. 4a EStG & aktueller BMF-Tabelle. Inland und Auslandspauschalen berechnen inkl. Mahlzeitenabzug & Reisekosten-Druck.",
        keywords: [
            "Verpflegungsmehraufwand 2026",
            "Spesenrechner Inland Ausland",
            "Tagegeld BMF Pauschale",
            "Reisekostenabrechnung Vorlage",
            "Mahlzeitenkürzung Frühstück Spesen",
        ],
        badge: "BMF Tabelle 2026",
        icon: "CompassOutlined",
        guideSections: [
            {
                title: "Gesetzliche Spesenpauschalen für Dienstreisen",
                content: [
                    "Unternehmer und Arbeitnehmer können beruflich veranlasste Mehraufwendungen für Verpflegung steuerfrei bzw. als Betriebsausgabe geltend machen (§ 9 Abs. 4a EStG).",
                    "Wurden Mahlzeiten vom Kunden, Veranstalter oder Hotel gestellt, schreibt das Gesetz feste Kürzungen der 24h-Pauschale vor: 20 % für ein Frühstück und jeweils 40 % für ein Mittag- oder Abendessen.",
                ],
            },
        ],
        faqs: [
            {
                question: "Ab wie vielen Stunden Abwesenheit gibt es Tagegeld?",
                answer: "Eine Pauschale für den An-/Abreisetag oder eine eintägige Dienstreise steht Steuerpflichtigen ab einer Abwesenheitsdauer von mehr als 8 Stunden von der Wohnung und ersten Tätigkeitsstätte zu.",
            },
        ],
        relatedToolIds: ["bewirtungsbeleg-rechner", "arbeitstage-rechner", "bautagebuch-vorlage"],
    },
    {
        id: "kassenbuch-vorlage",
        slug: "kassenbuch-vorlage",
        path: "/tools/kassenbuch-vorlage",
        title: "Kassenbuch & Eigenbeleg Generator (§ 160 AO): GoBD-konform erstellen",
        shortTitle: "Kassenbuch & Eigenbeleg",
        eyebrow: "GOBD & § 160 AO",
        category: "Recht & Vorlagen",
        description:
            "Erstelle sofort einen steuerlich anerkannten Eigenbeleg (Ersatzbeleg nach § 160 AO) für verlorene Kassenbons, Parkgebühren oder Trinkgelder. GoBD-konform drucken oder als PDF archivieren.",
        metaTitle: "Eigenbeleg Vorlage kostenlos – Ersatzbeleg nach § 160 AO erstellen",
        metaDescription:
            "Kostenloser Eigenbeleg-Generator nach § 160 AO: Erstelle gültige Ersatzbelege bei verlorenen Kassenbons oder Automaten ohne Quittung. Druckfertig & GoBD-konform.",
        keywords: [
            "Eigenbeleg Vorlage PDF",
            "Ersatzbeleg erstellen § 160 AO",
            "Kassenbon verloren Eigenbeleg",
            "Kassenbuch Vorlage kostenlos",
            "GoBD Kassenbuch Excel PDF",
        ],
        badge: "Steuer-Notfallhilfe",
        icon: "SolutionOutlined",
        guideSections: [
            {
                title: "Wann das Finanzamt einen Eigenbeleg nach § 160 AO akzeptiert",
                content: [
                    "Geht ein Originalbeleg verloren oder stellt ein Münzautomat keine Quittung aus, greift der Grundsatz 'Keine Buchung ohne Beleg'. In diesem Fall gestattet § 160 der Abgabenordnung (AO) die Ausstellung eines Eigenbelegs.",
                    "Der Eigenbeleg muss Datum, Zahlungsempfänger, Verwendungszweck, gezahlten Betrag, den Grund für das Fehlen des Originalbelegs und die eigenhändige Unterschrift des Steuerpflichtigen enthalten.",
                ],
            },
        ],
        faqs: [
            {
                question: "Darf ich auf einem Eigenbeleg Vorsteuer abziehen?",
                answer: "Nein, ein Vorsteuerabzug nach § 15 UStG erfordert zwingend eine ordnungsgemäße Rechnung mit ausgewiesener Steuer. Der Betrag wird jedoch zu 100% als betrieblicher Aufwand (Betriebsausgabe) anerkannt.",
            },
        ],
        relatedToolIds: ["bewirtungsbeleg-rechner", "bautagebuch-vorlage", "verzugszinsen-rechner"],
    },
    {
        id: "bautagebuch-vorlage",
        slug: "bautagebuch-vorlage",
        path: "/tools/bautagebuch-vorlage",
        title: "Digitales Bautagebuch & Regiebericht (§ 2 / § 6 VOB/B): Handwerker Vorlage",
        shortTitle: "Bautagebuch & Regiebericht",
        eyebrow: "VOB/B & HANDWERK",
        category: "Recht & Vorlagen",
        description:
            "Erstelle lückenlose Bautagesberichte und Regieberichte nach VOB/B. Dokumentiere Witterung, Personal, Baufortschritt, Behinderungsanzeigen nach § 6 VOB/B und Materiallieferungen druckfertig.",
        metaTitle: "Bautagebuch Vorlage PDF kostenlos – Bautagesbericht VOB/B | Rechly",
        metaDescription:
            "Kostenlose Bautagebuch & Regiebericht Vorlage nach § 2 & § 6 VOB/B: Witterung, Personal, Bauleistung & Behinderungen lückenlos dokumentieren. Druckfertig & ohne Registrierung.",
        keywords: [
            "Bautagebuch Vorlage PDF",
            "Bautagesbericht VOB Vorlage",
            "Regiebericht Vorlage kostenlos",
            "Behinderungsanzeige § 6 VOB/B",
            "Bautagebuch Handwerker",
        ],
        badge: "Für Handwerker",
        icon: "ToolOutlined",
        guideSections: [
            {
                title: "Die rechtliche Bedeutung des Bautagebuchs nach VOB/B",
                content: [
                    "Auf Baustellen entscheiden eine lückenlose Dokumentation und tägliche Bautagesberichte über die Durchsetzbarkeit von Nachträgen, Mehrkosten und Bauzeitverlängerungen.",
                    "Besonders Behinderungen nach § 6 VOB/B (z. B. fehlende Vorarbeiten, extreme Witterung oder bauseitige Planungsverzögerungen) müssen taggenau festgehalten werden, um Vertragsstrafen abzuwenden.",
                ],
            },
        ],
        faqs: [
            {
                question: "Wer muss das Bautagebuch unterschreiben?",
                answer: "Im Idealfall wird der Bautagesbericht täglich vom Bauleiter des Auftragnehmers unterzeichnet und der Bauleitung des Auftraggebers zur Kenntnisnahme vorgelegt.",
            },
        ],
        relatedToolIds: ["arbeitstage-rechner", "stundensatz-rechner", "kassenbuch-vorlage"],
    },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
    return TOOLS_CATALOG.find((t) => t.slug === slug || t.id === slug);
}
