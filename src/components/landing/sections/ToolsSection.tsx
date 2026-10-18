"use client";

import React from "react";
import Link from "next/link";
import { Typography, Card, Tag, Button } from "antd";
import {
    AppstoreOutlined,
    ArrowRightOutlined,
    QrcodeOutlined,
    FileSearchOutlined,
    DollarOutlined,
    PercentageOutlined,
    CalculatorOutlined,
    SafetyCertificateOutlined,
    ShopOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { TOOLS_CATALOG } from "@/lib/tools/catalog";

const { Text } = Typography;

export default function ToolsSection() {
    // Select top 6 high-demand tools for the homepage showcase
    const featuredToolIds = [
        "e-rechnung-viewer",
        "girocode-generator",
        "verzugszinsen-rechner",
        "ust-idnr-pruefen",
        "stundensatz-rechner",
        "kleinunternehmer-rechner",
    ];

    const featuredTools = TOOLS_CATALOG.filter((t) => featuredToolIds.includes(t.id));

    return (
        <section
            style={{
                padding: "80px 24px",
                background: "#f8fafc",
                borderTop: "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0",
            }}
        >
            <div style={{ maxWidth: 1040, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#e0f2fe",
                            color: "#0369a1",
                            padding: "6px 14px",
                            borderRadius: 20,
                            fontWeight: 700,
                            fontSize: 13,
                            marginBottom: 16,
                        }}
                    >
                        <AppstoreOutlined />
                        KOSTENLOSE BUSINESS-SUPERAPP
                    </div>

                    <h2
                        style={{
                            fontSize: "clamp(26px, 4vw, 36px)",
                            fontWeight: 900,
                            color: "#0f172a",
                            margin: "0 0 16px 0",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Praktische Werkzeuge für dein tägliches Geschäft
                    </h2>

                    <p
                        style={{
                            fontSize: "clamp(15px, 2vw, 17px)",
                            color: "#64748b",
                            maxWidth: 680,
                            margin: "0 auto 20px auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Keine Registrierung erforderlich. 100% kostenlos und datensicher im Browser berechnet.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 20,
                            fontSize: 13,
                            color: "#059669",
                            fontWeight: 600,
                            flexWrap: "wrap",
                        }}
                    >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <CheckCircleOutlined /> Sofort startklar
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <CheckCircleOutlined /> Keine Kreditkarte
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <CheckCircleOutlined /> DSGVO-konform
                        </span>
                    </div>
                </div>

                {/* 6 Grid Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 24,
                        marginBottom: 40,
                    }}
                >
                    {featuredTools.map((tool) => (
                        <Link
                            key={tool.id}
                            href={tool.path}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Card
                                hoverable
                                style={{
                                    height: "100%",
                                    borderRadius: 14,
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                                styles={{
                                    body: {
                                        padding: 24,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    },
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 12,
                                        }}
                                    >
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "2px 8px", borderRadius: 8 }}>
                                            {tool.category}
                                        </span>
                                        {tool.badge && (
                                            <Tag color="cyan" style={{ fontWeight: 700, borderRadius: 8, margin: 0 }}>
                                                {tool.badge}
                                            </Tag>
                                        )}
                                    </div>

                                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px 0", color: "#0f172a" }}>
                                        {tool.shortTitle}
                                    </h3>

                                    <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                                        {tool.description}
                                    </p>
                                </div>

                                <div
                                    style={{
                                        marginTop: 18,
                                        paddingTop: 12,
                                        borderTop: "1px solid #f1f5f9",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        color: "#2563eb",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        gap: 4,
                                    }}
                                >
                                    Kostenlos nutzen <ArrowRightOutlined style={{ fontSize: 11 }} />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* View All Tools CTA Button */}
                <div style={{ textAlign: "center" }}>
                    <Link href="/tools">
                        <Button
                            type="primary"
                            size="large"
                            icon={<AppstoreOutlined />}
                            style={{
                                background: "#2563eb",
                                height: 48,
                                padding: "0 28px",
                                fontSize: 15,
                                fontWeight: 700,
                                borderRadius: 8,
                                boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                            }}
                        >
                            Alle 15 kostenlosen Tools & Rechner ansehen
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
