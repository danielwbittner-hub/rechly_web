import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Kostenlose Business-Tools, Rechner & Generatoren für Unternehmen",
    description:
        "Über 30 kostenlose Business-Tools für Deutschland: Rechnungsgenerator, Angebotsgenerator, E-Rechnung Viewer, GiroCode, MwSt-Rechner, Stundensatz, USt-IdNr.-Prüfer, Mahnung & Steuerkalender – ohne Anmeldung.",
    path: "/tools",
    keywords: [
        "Business Tools kostenlos",
        "Rechnungsgenerator kostenlos",
        "Angebotsgenerator",
        "E-Rechnung Viewer",
        "GiroCode Generator",
        "Mehrwertsteuerrechner",
        "Stundensatz Rechner",
        "Verzugszinsen Rechner",
        "USt-IdNr prüfen",
        "Kleinunternehmer Rechner",
        "Steuerkalender 2026",
    ],
    category: "Business-Superapp & Rechner",
});

export default function ToolsHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
