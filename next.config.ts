import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Standalone output for containerized deployments (Heroku, Docker, etc.)
    output: "standalone",

    // Disable type checking during build (we run it separately)
    typescript: {
        ignoreBuildErrors: false,
    },

    // Use Turbopack (Next.js 16 default)
    turbopack: {
        // Resolve aliases for react-pdf compatibility
        resolveAlias: {
            canvas: { browser: "./empty-module.js" },
        },
    },

    async headers() {
        return [
            {
                source: "/dashboard/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow, noarchive",
                    },
                ],
            },
            {
                source: "/:privateRoute(login|register|onboarding|auth)/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow, noarchive",
                    },
                ],
            },
        ];
    },

    // Optimizations
    experimental: {
        optimizePackageImports: [
            "antd",
            "@ant-design/icons",
            "dayjs",
            "@ant-design/nextjs-registry",
        ],
    },

    async rewrites() {
        return [
            { source: "/werkzeuge", destination: "/tools" },
            { source: "/verzugszinsen-rechner", destination: "/tools/verzugszinsen-rechner" },
            { source: "/girocode-generator", destination: "/tools/girocode-generator" },
            { source: "/e-rechnung-viewer", destination: "/tools/e-rechnung-viewer" },
            { source: "/stundensatz-rechner", destination: "/tools/stundensatz-rechner" },
            { source: "/skontorechner", destination: "/tools/skontorechner" },
            { source: "/arbeitstage-rechner", destination: "/tools/arbeitstage-rechner" },
            { source: "/ust-idnr-pruefen", destination: "/tools/ust-idnr-pruefen" },
            { source: "/kleinunternehmer-rechner", destination: "/tools/kleinunternehmer-rechner" },
            { source: "/leitweg-id-pruefen", destination: "/tools/leitweg-id-pruefen" },
            { source: "/gewerbesteuer-rechner", destination: "/tools/gewerbesteuer-rechner" },
            { source: "/bewirtungsbeleg-rechner", destination: "/tools/bewirtungsbeleg-rechner" },
            { source: "/impressum-generator", destination: "/tools/impressum-generator" },
            { source: "/verpflegungsmehraufwand-rechner", destination: "/tools/verpflegungsmehraufwand-rechner" },
            { source: "/kassenbuch-vorlage", destination: "/tools/kassenbuch-vorlage" },
            { source: "/bautagebuch-vorlage", destination: "/tools/bautagebuch-vorlage" },
            { source: "/steuerkalender-2026", destination: "/tools/steuerkalender-2026" },
            { source: "/mahnung-generator", destination: "/tools/mahnung-generator" },
            { source: "/euer-rechner", destination: "/tools/euer-rechner" },
            { source: "/reverse-charge-rechner", destination: "/tools/reverse-charge-rechner" },
            { source: "/afa-rechner", destination: "/tools/afa-rechner" },
            { source: "/sepa-xml-generator", destination: "/tools/sepa-xml-generator" },
        ];
    },
};

export default nextConfig;
