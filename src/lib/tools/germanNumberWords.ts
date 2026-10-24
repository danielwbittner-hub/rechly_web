/**
 * Converts a numeric Euro amount into German number words for receipts (Quittungen)
 * Example: 248.50 -> "zweihundertachtundvierzig Euro und 50 Cent"
 */

const ONES = [
    "null",
    "ein",
    "zwei",
    "drei",
    "vier",
    "fünf",
    "sechs",
    "sieben",
    "acht",
    "neun",
    "zehn",
    "elf",
    "zwölf",
    "dreizehn",
    "vierzehn",
    "fünfzehn",
    "sechzehn",
    "siebzehn",
    "achtzehn",
    "neunzehn",
];

const TENS = [
    "",
    "zehn",
    "zwanzig",
    "dreißig",
    "vierzig",
    "fünfzig",
    "sechzig",
    "siebzig",
    "achtzig",
    "neunzig",
];

function underHundred(n: number, standaloneOne = false): string {
    if (n === 0) return "";
    if (n === 1) return standaloneOne ? "eins" : "ein";
    if (n < 20) return ONES[n];
    const ten = Math.floor(n / 10);
    const one = n % 10;
    if (one === 0) return TENS[ten];
    return `${ONES[one]}und${TENS[ten]}`;
}

function underThousand(n: number, standaloneOne = false): string {
    if (n === 0) return "";
    if (n < 100) return underHundred(n, standaloneOne);
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return `${ONES[hundred]}hundert${underHundred(rest, standaloneOne)}`;
}

export function integerToGermanWord(num: number): string {
    const n = Math.floor(Math.abs(num));
    if (n === 0) return "null";
    if (n >= 1_000_000) return n.toLocaleString("de-DE");

    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;

    let result = "";
    if (thousands > 0) {
        result += `${underThousand(thousands, false)}tausend`;
    }
    if (remainder > 0) {
        result += underThousand(remainder, true);
    }
    return result;
}

export function amountToGermanReceiptWords(amount: number): string {
    const safe = Number.isFinite(amount) && amount >= 0 ? amount : 0;
    const euros = Math.floor(safe);
    const cents = Math.round((safe - euros) * 100);

    const euroWord = integerToGermanWord(euros);
    const capitalized = euroWord.charAt(0).toUpperCase() + euroWord.slice(1);

    if (cents === 0) {
        return `${capitalized} Euro und 00 Cent`;
    }
    return `${capitalized} Euro und ${String(cents).padStart(2, "0")} Cent`;
}
