import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS_CATALOG, getToolBySlug } from "@/lib/tools/catalog";
import { createPageMetadata } from "@/lib/seo";
import ToolLayout from "@/components/tools/ToolLayout";

// Tool Components
import ERechnungViewer from "@/components/tools/ERechnungViewer";
import GiroCodeGenerator from "@/components/tools/GiroCodeGenerator";
import VerzugszinsenRechner from "@/components/tools/VerzugszinsenRechner";
import VatIdChecker from "@/components/tools/VatIdChecker";
import SkontoRechner from "@/components/tools/SkontoRechner";
import StundensatzRechner from "@/components/tools/StundensatzRechner";
import KleinunternehmerRechner from "@/components/tools/KleinunternehmerRechner";
import ImpressumGenerator from "@/components/tools/ImpressumGenerator";
import BewirtungsbelegRechner from "@/components/tools/BewirtungsbelegRechner";
import ArbeitstageRechner from "@/components/tools/ArbeitstageRechner";
import LeitwegIdValidator from "@/components/tools/LeitwegIdValidator";
import GewerbesteuerRechner from "@/components/tools/GewerbesteuerRechner";
import SpesenRechner from "@/components/tools/SpesenRechner";
import KassenbuchEigenbeleg from "@/components/tools/KassenbuchEigenbeleg";
import BautagebuchBuilder from "@/components/tools/BautagebuchBuilder";

interface ToolPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return TOOLS_CATALOG.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) return {};

    return createPageMetadata({
        title: tool.metaTitle,
        description: tool.metaDescription,
        path: tool.path,
        type: "website",
    });
}

export default async function ToolPage({ params }: ToolPageProps) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) notFound();

    // Resolve related tools
    const relatedTools = tool.relatedToolIds
        .map((id) => getToolBySlug(id))
        .filter((t): t is typeof tool => t !== undefined)
        .map((t) => ({
            title: t.shortTitle,
            description: t.description,
            href: t.path,
            badge: t.badge,
        }));

    return (
        <ToolLayout
            path={tool.path}
            title={tool.title}
            eyebrow={tool.eyebrow}
            description={tool.description}
            category={tool.category}
            keywords={tool.keywords}
            guideSections={tool.guideSections}
            faqs={tool.faqs}
            relatedTools={relatedTools}
        >
            <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>Werkzeug wird geladen...</div>}>
                {renderToolComponent(tool.slug)}
            </Suspense>
        </ToolLayout>
    );
}

function renderToolComponent(slug: string) {
    switch (slug) {
        case "e-rechnung-viewer":
            return <ERechnungViewer />;
        case "girocode-generator":
            return <GiroCodeGenerator />;
        case "verzugszinsen-rechner":
            return <VerzugszinsenRechner />;
        case "ust-idnr-pruefen":
            return <VatIdChecker />;
        case "skontorechner":
            return <SkontoRechner />;
        case "stundensatz-rechner":
            return <StundensatzRechner />;
        case "kleinunternehmer-rechner":
            return <KleinunternehmerRechner />;
        case "impressum-generator":
            return <ImpressumGenerator />;
        case "bewirtungsbeleg-rechner":
            return <BewirtungsbelegRechner />;
        case "arbeitstage-rechner":
            return <ArbeitstageRechner />;
        case "leitweg-id-pruefen":
            return <LeitwegIdValidator />;
        case "gewerbesteuer-rechner":
            return <GewerbesteuerRechner />;
        case "verpflegungsmehraufwand-rechner":
            return <SpesenRechner />;
        case "kassenbuch-vorlage":
            return <KassenbuchEigenbeleg />;
        case "bautagebuch-vorlage":
            return <BautagebuchBuilder />;
        default:
            return <div>Tool nicht gefunden.</div>;
    }
}
