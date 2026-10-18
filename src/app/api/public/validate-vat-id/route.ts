import { NextRequest, NextResponse } from "next/server";
import { splitVatId } from "@/lib/validation";

/**
 * Public USt-IdNr. verification via EU Commission VIES REST API.
 * Free, zero-registration, rate-limited by in-memory IP counter.
 * Enables freelancers & SMBs to verify EU VAT IDs and obtain statutory proof
 * for tax-exempt intra-community supplies (§ 6a UStG / § 13b UStG).
 */

// Simple in-memory rate limit: max 30 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    // Periodically prune stale entries
    if (rateLimitMap.size > 5000) {
        for (const [key, val] of rateLimitMap.entries()) {
            if (val.resetAt < now) rateLimitMap.delete(key);
        }
    }

    if (!entry || entry.resetAt < now) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
        return false;
    }

    if (entry.count >= 30) {
        return true;
    }

    entry.count += 1;
    return false;
}

export async function POST(request: NextRequest) {
    try {
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "anonymous";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Zu viele Anfragen. Bitte warte eine Minute." },
                { status: 429 }
            );
        }

        const body = await request.json().catch(() => ({}));
        const rawVatId = String(body.vat_id || "").trim();

        const parts = splitVatId(rawVatId);
        if (!parts) {
            return NextResponse.json(
                {
                    valid: false,
                    error: "invalid_format",
                    message:
                        "Ungültiges Format. Bitte Ländercode und Nummer angeben (z. B. DE123456789 oder ATU12345678).",
                },
                { status: 200 }
            );
        }

        const viesResponse = await fetch(
            "https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    countryCode: parts.countryCode,
                    vatNumber: parts.vatNumber,
                }),
                signal: AbortSignal.timeout(10_000),
            }
        );

        if (!viesResponse.ok) {
            return NextResponse.json(
                {
                    error: "vies_unavailable",
                    message:
                        "Die offizielle EU-VIES-Schnittstelle ist vorübergehend nicht erreichbar. Bitte versuche es in wenigen Minuten erneut.",
                },
                { status: 502 }
            );
        }

        const result = await viesResponse.json();
        const requestDate = result.requestDate || new Date().toISOString();

        return NextResponse.json({
            valid: result.valid === true,
            countryCode: parts.countryCode,
            vatNumber: parts.vatNumber,
            name:
                result.name && result.name !== "---" ? result.name : undefined,
            address:
                result.address && result.address !== "---"
                    ? result.address.trim()
                    : undefined,
            requestDate,
            consultationNumber: result.consultationNumber || undefined,
        });
    } catch (error) {
        console.error("Public VAT ID validation error:", error);
        return NextResponse.json(
            {
                error: "vies_unavailable",
                message:
                    "Verbindungsfehler zur EU-VIES-Datenbank. Bitte versuche es später noch einmal.",
            },
            { status: 502 }
        );
    }
}
