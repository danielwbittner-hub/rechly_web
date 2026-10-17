import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Standalone output for containerized deployments (Heroku, Docker, etc.)
    output: "standalone",

    // Keep pdfkit (ZUGFeRD) out of the bundle: it loads its standard fonts
    // (*.afm) from node_modules/pdfkit/js/data at runtime, which are missing
    // once bundled.
    serverExternalPackages: ["pdfkit"],
    outputFileTracingIncludes: {
        "/api/invoices/[id]/zugferd": ["./node_modules/pdfkit/js/data/**"],
    },

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
};

export default nextConfig;
