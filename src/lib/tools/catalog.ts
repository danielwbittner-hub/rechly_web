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
    {
        id: "steuerkalender-2026",
        slug: "steuerkalender-2026",
        path: "/tools/steuerkalender-2026",
        title: "Steuerkalender 2026: Alle Steuertermine & Fristen für Selbstständige mit .ics Export",
        shortTitle: "Steuerkalender 2026",
        eyebrow: "STEUERFRISTEN & TERMINPLANUNG",
        category: "Finanzen & Steuern",
        description:
            "Alle gesetzlichen Fristen 2026 für USt-VA, ESt, GewSt, KSt und Lohnsteuer. Inklusive 3-Tage-Schonfrist nach § 240 AO, Feiertagsverschiebung nach § 108 AO und 1-Klick Kalender-Download (.ics).",
        metaTitle: "Steuerkalender 2026 für Selbstständige – Alle Fristen & Termine (.ics) | Rechly",
        metaDescription:
            "Steuerkalender 2026: Alle Abgabefristen für USt-Voranmeldung, Einkommensteuer und Gewerbesteuer Vorauszahlung. Mit automatischer Schonfrist-Berechnung und .ics Kalender-Download.",
        keywords: [
            "Steuerkalender 2026",
            "Steuerfristen Selbstständige 2026",
            "USt-VA Termine 2026",
            "Einkommensteuer Vorauszahlung Termine",
            "Schonfrist Finanzamt § 240 AO",
            "Dauerfristverlängerung UStDV",
        ],
        badge: "Neu 2026",
        icon: "CalendarOutlined",
        guideSections: [
            {
                title: "Die wichtigsten Steuertermine für Selbstständige in 2026",
                content: [
                    "Als Selbstständiger oder Unternehmer in Deutschland unterliegen Sie strengen Fälligkeitsterminen für Steuervorauszahlungen und Anmeldungssteuern.",
                    "Verpassen Sie eine Frist, setzt das Finanzamt automatisch Säumniszuschläge (§ 240 AO) von 1 % pro angefangenem Monat auf den rückständigen Betrag fest sowie Verspätungszuschläge (§ 152 AO).",
                ],
                bullets: [
                    "Einkommensteuer & Körperschaftsteuer Vorauszahlung: 10. März, 10. Juni, 10. September, 10. Dezember (§ 37 Abs. 1 EStG).",
                    "Gewerbesteuer Vorauszahlung: 15. Februar, 15. Mai, 15. August, 15. November (§ 19 GewStG).",
                    "Umsatzsteuer-Voranmeldung (USt-VA): Zum 10. des Folgemonats (monatlich) bzw. 10. April, Juli, Oktober, Januar (vierteljährlich).",
                    "Dauerfristverlängerung (§ 46 UStDV): Verschiebt jede USt-Voranmeldung um genau einen Monat.",
                ],
            },
            {
                title: "Fristverschiebung und 3-tägige Schonfrist",
                content: [
                    "Gemäß § 108 Abs. 3 Abgabenordnung (AO) verschiebt sich eine Frist automatisch auf den nächsten Werktag, falls der Fälligkeitstag auf einen Samstag, Sonntag oder gesetzlichen Feiertag fällt.",
                    "Bei Zahlung per Banküberweisung gewährt das Finanzamt eine gesetzliche Schonfrist von drei Tagen (§ 240 Abs. 3 AO). Geht der Betrag innerhalb von 3 Tagen nach Fälligkeit ein, entfällt der Säumniszuschlag.",
                ],
            },
        ],
        faqs: [
            {
                question: "Gilt die 3-tägige Schonfrist auch für Barzahlung oder Scheck?",
                answer: "Nein, die 3-Tage-Schonfrist nach § 240 Abs. 3 AO gilt ausschließlich bei unbarer Zahlung (Banküberweisung). Bei Lastschrifteinzug durch das Finanzamt bucht die Behörde ohnehin fristgerecht ab.",
            },
            {
                question: "Wie importiere ich die Termine in Google Kalender oder Outlook?",
                answer: "Klicken Sie einfach auf 'Kalenderdatei herunterladen (.ics)'. Öffnen Sie die heruntergeladene Datei oder importieren Sie sie direkt in Ihren Apple-, Google- oder Outlook-Kalender mit integrierten 3-Tage-Voralarmen.",
            },
        ],
        relatedToolIds: ["euer-rechner", "gewerbesteuer-rechner", "kleinunternehmer-rechner"],
    },
    {
        id: "mahnung-generator",
        slug: "mahnung-generator",
        path: "/tools/mahnung-generator",
        title: "Mahnung & Zahlungserinnerung Generator: Rechtssichere Mahnschreiben nach § 286 BGB",
        shortTitle: "Mahnung Generator",
        eyebrow: "FORDERUNGSMANAGEMENT & VERZUG",
        category: "Recht & Vorlagen",
        description:
            "Erstellen Sie rechtssichere Zahlungserinnerungen, 1. Mahnungen und letzte Mahnungen vor Inkasso nach DIN 5008. Mit automatischer Verzugszins- und 40 € Pauschalen-Berechnung (§ 288 BGB).",
        metaTitle: "Mahnung & Zahlungserinnerung Vorlage kostenlos erstellen | Rechly",
        metaDescription:
            "Rechtssichere Mahnung und Zahlungserinnerung nach § 286 BGB online erstellen: Automatische Verzugszinsen, 40 € B2B-Verzugspauschale, Zahlungsfrist und DIN 5008 Vorlage als PDF.",
        keywords: [
            "Mahnung schreiben Vorlage",
            "Zahlungserinnerung Vorlage kostenlos",
            "1. Mahnung Muster",
            "Letzte Mahnung vor Inkasso",
            "Mahngebühren gesetzlich BGB",
            "Verzugsschaden geltend machen",
        ],
        badge: "BGB-konform",
        icon: "ExclamationCircleOutlined",
        guideSections: [
            {
                title: "Das dreistufige deutsche Mahnwesen nach BGB",
                content: [
                    "Zahlt ein Kunde nicht fristgerecht, regelt § 286 Bürgerliches Gesetzbuch (BGB) den Eintritt des Verzugs.",
                    "In der Geschäftspraxis hat sich ein dreistufiger Mahnprozess etabliert, der die Kundenbeziehung schont, aber rechtlich alle Weichen für Inkasso und gerichtliche Schritte stellt.",
                ],
                bullets: [
                    "Stufe 1 (Zahlungserinnerung): Freundlicher Hinweis ohne Verzugskosten. Typische Zahlungsfrist: 7 bis 10 Tage.",
                    "Stufe 2 (1. Mahnung): Bestimmte Aufforderung mit Geltendmachung von Verzugszinsen und Mahnspesen. Frist: 7 Tage.",
                    "Stufe 3 (Letzte Mahnung): Letzte Fristsetzung (3 bis 5 Tage) mit unmissverständlicher Androhung des gerichtlichen Mahnbescheids oder Inkassoübergabe.",
                ],
            },
            {
                title: "Die 40 € Verzugspauschale im B2B-Geschäft (§ 288 Abs. 5 BGB)",
                content: [
                    "Gegenüber anderen Unternehmern (B2B) haben Gläubiger bei Zahlungsverzug einen gesetzlichen Anspruch auf eine Pauschale von mindestens 40 Euro. Dies gilt ohne Nachweis eines konkreten Schadens.",
                    "Gegenüber Verbrauchern (B2C) dürfen dagegen nur tatsächliche, angemessene Mahnkosten (in der Praxis 2,50 € bis 5,00 € für Porto und Papier) geltend gemacht werden.",
                ],
            },
        ],
        faqs: [
            {
                question: "Ist eine Mahnung vor einem gerichtlichen Mahnbescheid zwingend erforderlich?",
                answer: "Ist auf der Originalrechnung ein kalendermäßig bestimmtes Zahlungsziel vereinbart (z. B. 'Zahlbar bis zum 15.03.2026') oder greift die 30-Tage-Klausel nach § 286 Abs. 3 BGB, tritt Verzug auch ohne Mahnung ein. Eine schriftliche Mahnung ist jedoch aus Beweisgründen und zur Vermeidung von Prozesskosten zwingend ratsam.",
            },
            {
                question: "Wie hoch sind die gesetzlichen Verzugszinsen?",
                answer: "Im B2B-Bereich betragen die Verzugszinsen 9 Prozentpunkte über dem Bundesbank-Basiszinssatz. Gegenüber Privatkunden (B2C) sind es 5 Prozentpunkte über Basiszinssatz.",
            },
        ],
        relatedToolIds: ["verzugszinsen-rechner", "girocode-generator", "e-rechnung-viewer"],
    },
    {
        id: "euer-rechner",
        slug: "euer-rechner",
        path: "/tools/euer-rechner",
        title: "EÜR & USt-VA Rechner: Einnahmen-Überschuss-Rechnung nach § 4 Abs. 3 EStG",
        shortTitle: "EÜR & USt-VA Rechner",
        eyebrow: "GEWINNERMITTLUNG & ELSTER",
        category: "Finanzen & Steuern",
        description:
            "Ermitteln Sie Ihren steuerlichen Gewinn nach § 4 Abs. 3 EStG und berechnen Sie sofort alle offiziellen ELSTER USt-VA Kennziffern (Kz 81, Kz 86, Kz 66 und Kz 83 Zahllast). Kostenlos & ohne Login.",
        metaTitle: "EÜR Rechner 2026 kostenlos – Einnahmen-Überschuss-Rechnung & USt-VA | Rechly",
        metaDescription:
            "Kostenloser EÜR Rechner für Freiberufler & Kleinunternehmer: Gewinn nach § 4 Abs. 3 EStG ermitteln, Vorsteuer abziehen und ELSTER-Kennziffern (Kz 81, 86, 66, 83) direkt berechnen.",
        keywords: [
            "EÜR Rechner kostenlos",
            "Einnahmen Überschuss Rechnung Vorlage",
            "ELSTER Kennziffern USt-VA",
            "Gewinnermittlung Freiberufler",
            "USt Zahllast berechnen Kz 83",
            "Betriebsausgaben EÜR",
        ],
        badge: "ELSTER-kompatibel",
        icon: "AccountBookOutlined",
        guideSections: [
            {
                title: "Funktionsweise der Einnahmen-Überschuss-Rechnung (EÜR)",
                content: [
                    "Die Einnahmen-Überschuss-Rechnung nach § 4 Abs. 3 Einkommensteuergesetz (EStG) ist die vereinfachte Methode der Gewinnermittlung für Freiberufler, Kleingewerbetreibende und nicht im Handelsregister eingetragene Unternehmer.",
                    "Sie basiert auf dem Zufluss- und Abflussprinzip (§ 11 EStG): Betriebseinnahmen werden in dem Zeitpunkt erfasst, in dem sie auf Ihrem Konto eingehen; Ausgaben in dem Moment, in dem sie bezahlt werden.",
                ],
            },
            {
                title: "Die ELSTER-Kennziffern für die Umsatzsteuer-Voranmeldung",
                content: [
                    "In der USt-VA tragen Sie nicht nur den Gesamtbetrag ein, sondern getrennt nach amtlichen Kennziffern (Kz):",
                ],
                bullets: [
                    "Kz 81: Umsätze zu 19 % (Bemessungsgrundlage netto)",
                    "Kz 86: Umsätze zu 7 % (Bemessungsgrundlage netto)",
                    "Kz 66: Abziehbare Vorsteuerbeträge aus Rechnungen anderer Unternehmen",
                    "Kz 83: Verbleibende Zahllast (bzw. Erstattungsanspruch bei negativem Saldo)",
                ],
            },
        ],
        faqs: [
            {
                question: "Wer darf seinen Gewinn mit einer EÜR ermitteln?",
                answer: "Alle Freiberufler (unabhängig vom Umsatz) sowie Gewerbetreibende, die nicht kaufmännisch buchführungspflichtig sind (Schwellenwerte nach § 141 AO: max. 800.000 € Umsatz und 80.000 € Gewinn pro Jahr).",
            },
        ],
        relatedToolIds: ["kleinunternehmer-rechner", "gewerbesteuer-rechner", "afa-rechner"],
    },
    {
        id: "reverse-charge-rechner",
        slug: "reverse-charge-rechner",
        path: "/tools/reverse-charge-rechner",
        title: "Reverse-Charge & Drittland Rechner: B2B Umsatzsteuer im Ausland (§ 13b & § 3a UStG)",
        shortTitle: "Reverse-Charge Rechner",
        eyebrow: "INTERNATIONALES STEUERRECHT",
        category: "Finanzen & Steuern",
        description:
            "Ermitteln Sie mit wenigen Klicks die korrekte steuerliche Behandlung für grenzüberschreitende Rechnungen in die EU (Reverse Charge) und Drittländer (USA, UK, Schweiz) inklusive amtlicher Pflichttexte.",
        metaTitle: "Reverse-Charge Rechner & EU / Drittland B2B Rechnungsprüfer | Rechly",
        metaDescription:
            "Reverse-Charge Rechner für Dienstleistungen ins EU-Ausland & Drittland: Prüfen Sie Steuerbarkeit (§ 3a & § 13b UStG), Pflichttexte für Rechnungen und Kennziffern für USt-VA & ZM.",
        keywords: [
            "Reverse Charge Rechner",
            "§ 13b UStG Steuerschuldnerschaft",
            "Rechnung EU B2B Pflichtangaben",
            "Rechnung USA Schweiz Umsatzsteuer",
            "Zusammenfassende Meldung ZM Pflicht",
            "Reverse Charge Rechnung Vorlage",
        ],
        badge: "EU & Drittland",
        icon: "GlobalOutlined",
        guideSections: [
            {
                title: "Das Reverse-Charge-Verfahren im europäischen B2B-Verkehr",
                content: [
                    "Erbringen Sie als deutsches Unternehmen Dienstleistungen (z. B. IT-Beratung, Design, Software) an ein anderes Unternehmen in einem EU-Mitgliedstaat, greift das sogenannte Reverse-Charge-Verfahren (Umkehr der Steuerschuldnerschaft).",
                    "Gemäß § 3a Abs. 2 UStG i.V.m. Art. 196 der EU-Mehrwertsteuersystemrichtlinie 2006/112/EG schuldet der ausländische Leistungsempfänger die Umsatzsteuer in seinem Heimatland. Sie stellen eine Netto-Rechnung ohne deutsche Mehrwertsteuer aus.",
                ],
                bullets: [
                    "Pflicht: Sie müssen die gültige USt-IdNr. des Kunden vor Rechnungsstellung qualifiziert prüfen.",
                    "Pflicht: Auf der Rechnung muss der gesetzliche Hinweis 'Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge)' stehen.",
                    "Pflicht: Der Nettoumsatz muss in Zeile 41 (Kz 21) der USt-VA und in der monatlichen/quartalsweisen Zusammenfassenden Meldung (ZM) beim BZSt gemeldet werden.",
                ],
            },
            {
                title: "Rechnungen an Kunden im Drittland (USA, UK, Schweiz)",
                content: [
                    "Bei B2B-Kunden außerhalb der EU (Drittland) liegt der Leistungsort für sonstige Leistungen am Sitz des Leistungsempfängers (§ 3a Abs. 2 UStG). Die Leistung ist in Deutschland nicht steuerbar.",
                    "Sie weisen keine deutsche Umsatzsteuer aus, müssen jedoch auf der Rechnung angeben, dass es sich um eine im Inland nicht steuerbare Leistung handelt. Eine Meldung in der ZM entfällt.",
                ],
            },
        ],
        faqs: [
            {
                question: "Was passiert, wenn der EU-Kunde keine gültige USt-IdNr. hat?",
                answer: "Ohne Nachweis einer gültigen ausländischen USt-IdNr. gilt der Kunde umsatzsteuerlich als Privatperson (B2C). In diesem Fall müssen Sie deutsche Umsatzsteuer (19 %) ausweisen und abführen bzw. die OSS-Regelung beachten.",
            },
        ],
        relatedToolIds: ["ust-idnr-pruefen", "e-rechnung-viewer", "kleinunternehmer-rechner"],
    },
    {
        id: "afa-rechner",
        slug: "afa-rechner",
        path: "/tools/afa-rechner",
        title: "AfA- & GWG-Rechner 2026: Lineare Abschreibung & BMF Nutzungsdauer berechnen",
        shortTitle: "AfA- & GWG-Rechner",
        eyebrow: "ABSCHREIBUNG & ANLAGEVERMÖGEN",
        category: "Finanzen & Steuern",
        description:
            "Berechnen Sie die lineare Abschreibung nach amtlicher BMF AfA-Tabelle, prüfen Sie GWG-Sofortabschreibung (bis 800 € netto nach § 6 Abs. 2 EStG) und erstellen Sie den vollständigen Abschreibungsplan.",
        metaTitle: "AfA Rechner 2026 – Lineare Abschreibung & GWG Grenze berechnen | Rechly",
        metaDescription:
            "AfA Rechner für Selbstständige: Lineare Abschreibung nach amtlicher BMF-Tabelle, GWG-Sofortabschreibung bis 800 € und Sammelposten berechnen. Mit Jahresplan & Steuerersparnis.",
        keywords: [
            "AfA Rechner 2026",
            "GWG Grenze 2026 800 Euro",
            "Lineare Abschreibung berechnen",
            "Laptop AfA 1 Jahr BMF",
            "Abschreibungsplan Excel",
            "Sammelposten § 6 Abs. 2a EStG",
        ],
        badge: "BMF 2026",
        icon: "CalculatorOutlined",
        guideSections: [
            {
                title: "Abschreibung von Wirtschaftsgütern nach deutschem Steuerrecht",
                content: [
                    "Kaufen Sie betriebliche Arbeitsmittel (z. B. Computer, Büromöbel, Fahrzeug), dürfen die Kosten ab einer gewissen Höhe nicht sofort im Kaufmonat voll als Betriebsausgabe abgezogen werden, sondern müssen über die Nutzungsdauer verteilt abgeschrieben werden (AfA = Absetzung für Abnutzung, § 7 EStG).",
                ],
                bullets: [
                    "Bis 800 € netto (GWG nach § 6 Abs. 2 EStG): 100 % Sofortabschreibung im Anschaffungsjahr möglich.",
                    "250,01 € bis 1.000 € netto (Sammelposten nach § 6 Abs. 2a EStG): Wahlrecht für 5-jährige Poolabschreibung mit pauschal 20 % pro Jahr.",
                    "Über 800 € / 1.000 € netto: Reguläre lineare Abschreibung nach amtlicher BMF-Tabelle.",
                    "Sonderregelung Computer/Software: Durch BMF-Schreiben vom 22.02.2022 gilt für Computerhardware und Software eine fiktive Nutzungsdauer von 1 Jahr (faktische Sofortabschreibung).",
                ],
            },
            {
                title: "Monatsgenaue Abschreibung im ersten Jahr (Pro-rata temporis)",
                content: [
                    "Erfolgt die Anschaffung unterjährig, wird die AfA im Anschaffungsjahr monatsgenau ab dem Kaufmonat berechnet (§ 7 Abs. 1 Satz 4 EStG). Ein im Juli gekauftes Wirtschaftsgut wird im ersten Jahr mit 6/12 der Jahres-AfA abgeschrieben.",
                ],
            },
        ],
        faqs: [
            {
                question: "Gilt für die 800 € GWG-Grenze der Netto- oder Bruttobetrag?",
                answer: "Für vorsteuerabzugsberechtigte Unternehmer gilt stets der Nettobetrag ohne Umsatzsteuer (800,00 €). Kleinunternehmer nach § 19 UStG ohne Vorsteuerabzug müssen den Bruttobetrag heranziehen (800,00 € brutto).",
            },
        ],
        relatedToolIds: ["euer-rechner", "gewerbesteuer-rechner", "stundensatz-rechner"],
    },
    {
        id: "sepa-xml-generator",
        slug: "sepa-xml-generator",
        path: "/tools/sepa-xml-generator",
        title: "SEPA XML Generator: pain.001 Überweisung & pain.008 Lastschrift erstellen",
        shortTitle: "SEPA XML Generator",
        eyebrow: "OPEN BANKING & SEPA ISO 20022",
        category: "Tagesgeschäft & E-Rechnung",
        description:
            "Erstellen Sie standardkonforme ISO 20022 XML-Dateien für Sammelüberweisungen (pain.001.001.03) und SEPA-Lastschriften (pain.008.001.02) für alle deutschen Banken (Sparkasse, Deutsche Bank, etc.).",
        metaTitle: "SEPA XML Generator kostenlos – pain.001 & pain.008 online erstellen | Rechly",
        metaDescription:
            "Kostenloser SEPA XML Generator: pain.001 Sammelüberweisungen und pain.008 Lastschriften im ISO 20022 Format im Browser generieren und sofort im Online-Banking hochladen. Ohne Registrierung.",
        keywords: [
            "SEPA XML Generator kostenlos",
            "pain.001 erstellen online",
            "pain.008 Lastschrift XML",
            "Sammelüberweisung XML Datei erstellen",
            "ISO 20022 SEPA Generator",
            "DTAUS Nachfolger XML",
        ],
        badge: "ISO 20022",
        icon: "BankOutlined",
        guideSections: [
            {
                title: "SEPA-Sammelaufträge nach dem Standard ISO 20022",
                content: [
                    "Das SEPA-XML-Format (pain = Payment Initiation) ist der verbindliche europäische Bankenstandard für Sammelüberweisungen und Lastschriften.",
                    "Anstatt Rechnungen oder Honorare einzeln per Hand im Online-Banking einzutippen, bündeln Sie beliebig viele Zahlungsempfänger in einer einzigen XML-Datei und führen alle Transaktionen mit einer einzigen Freigabe (z. B. pushTAN) aus.",
                ],
                bullets: [
                    "pain.001.001.03: SEPA-Sammelüberweisung (Credit Transfer) – Zur Bezahlung von Lieferanten, Freelancern oder Gehältern.",
                    "pain.008.001.02: SEPA-Basislastschrift CORE (Direct Debit) – Zum Einzug wiederkehrender Mitgliedsbeiträge, Retainer oder Rechnungen mit Lastschriftmandat.",
                ],
            },
            {
                title: "Vorteile der browser-seitigen XML-Generierung",
                content: [
                    "Die Generierung erfolgt zu 100 % lokal in Ihrem Webbrowser. Es werden keinerlei vertrauliche Bankdaten (IBAN, Namen oder Beträge) auf externe Server übertragen. Die Datei ist sofort bereit für das Firmenkundenportal Ihrer Sparkasse, Deutschen Bank, Commerzbank oder Volksbank.",
                ],
            },
        ],
        faqs: [
            {
                question: "Was brauche ich für eine SEPA-Lastschriftdatei (pain.008)?",
                answer: "Sie benötigen eine Gläubiger-Identifikationsnummer (Gläubiger-ID) der Deutschen Bundesbank, eine eindeutige Mandatsreferenz sowie das Datum der Mandatsunterschrift des Kunden.",
            },
            {
                question: "Unterstützen alle deutschen Banken diesen XML-Standard?",
                answer: "Ja, der Standard pain.001.001.03 und pain.008.001.02 ist von der Deutschen Kreditwirtschaft (DK) für alle deutschen Kreditinstitute verbindlich freigegeben.",
            },
        ],
        relatedToolIds: ["girocode-generator", "e-rechnung-viewer", "mahnung-generator"],
    },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
    return TOOLS_CATALOG.find((t) => t.slug === slug || t.id === slug);
}
