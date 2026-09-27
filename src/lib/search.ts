import { ProductItem } from "./products";

/**
 * Normalizes text for apparel search:
 * - lowercases
 * - strips punctuation/hyphens/underscores
 * - trims and collapses whitespace
 */
export function normalizeText(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/[-_.,/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strips all spaces and punctuation for compressed matching:
 * e.g. "t-shirt" -> "tshirt", "t shirt" -> "tshirt"
 */
export function compressText(str: string): string {
  return (str || "").toLowerCase().replace(/[\s\-_.,/]/g, "");
}

/**
 * Calculates Levenshtein distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Synonyms and category mappings
const TSHIRT_TERMS = new Set([
  "tshirt",
  "tshirts",
  "t shirt",
  "t shirts",
  "t-shirt",
  "t-shirts",
  "tee",
  "tees",
  "teeshirt",
  "teeshirts",
  "tee shirt",
  "tee shirts",
]);

const TROUSER_TERMS = new Set([
  "trouser",
  "trousers",
  "pant",
  "pants",
  "slacks",
  "chino",
  "chinos",
]);

const SHIRT_TERMS = new Set([
  "shirt",
  "shirts",
  "oxford",
  "buttondown",
  "button down",
]);

/**
 * Checks if a token is approximately referring to a t-shirt / tee
 */
function isTshirtToken(token: string): boolean {
  if (TSHIRT_TERMS.has(token)) return true;
  // Handle typos like "tshrt", "t-shrt", "t-shir", "tshir"
  if (token.length >= 4 && (
    levenshteinDistance(token, "tshirt") <= 1 ||
    levenshteinDistance(token, "tshirts") <= 1 ||
    levenshteinDistance(token, "teeshirt") <= 2
  )) {
    return true;
  }
  return false;
}

/**
 * Checks if a token is approximately referring to trousers / pants
 */
function isTrouserToken(token: string): boolean {
  if (TROUSER_TERMS.has(token)) return true;
  if (token.length >= 5 && (
    levenshteinDistance(token, "trouser") <= 1 ||
    levenshteinDistance(token, "trousers") <= 1
  )) {
    return true;
  }
  return false;
}

/**
 * Checks if a given product matches a user search query with approximate / fuzzy matching
 */
export function productMatchesQuery(product: Partial<ProductItem>, rawQuery: string): boolean {
  if (!rawQuery || !rawQuery.trim()) return true;

  // Unify t-shirt variants in query: "t-shirt", "t shirt", "tee-shirt" -> "tshirt"
  const preProcessed = rawQuery
    .toLowerCase()
    .replace(/\btee[- ]?shirts?\b/gi, "tshirt")
    .replace(/\bt[- ]shirts?\b/gi, "tshirt");

  const queryNorm = normalizeText(preProcessed);
  const queryComp = compressText(rawQuery);

  // If query is empty after normalization
  if (!queryNorm) return true;

  const category = (product.category || "").toLowerCase();
  const nameNorm = normalizeText(product.name || "");
  const descNorm = normalizeText(product.description || "");
  const slugNorm = normalizeText(product.slug || "");

  const fullText = `${nameNorm} ${category} ${descNorm} ${slugNorm}`;
  const fullComp = compressText(fullText);

  // 1. Direct compressed match (e.g. "tshirt" in "wineheavyweightorganicteetshirts...")
  if (fullComp.includes(queryComp)) {
    return true;
  }

  // 2. Direct normalized substring match
  if (fullText.includes(queryNorm)) {
    return true;
  }

  const isTshirtProduct =
    category === "t-shirts" ||
    nameNorm.includes("tee") ||
    nameNorm.includes("t shirt") ||
    nameNorm.includes("tshirt") ||
    descNorm.includes("t-shirt") ||
    descNorm.includes("tee") ||
    slugNorm.includes("tee");

  const isTrouserProduct =
    category === "trousers" ||
    nameNorm.includes("trouser") ||
    nameNorm.includes("pant") ||
    descNorm.includes("trouser") ||
    descNorm.includes("pant");

  // 3. Overall query check for T-Shirt
  const isPureTshirtQuery =
    TSHIRT_TERMS.has(normalizeText(rawQuery)) ||
    TSHIRT_TERMS.has(queryComp) ||
    isTshirtToken(queryNorm) ||
    isTshirtToken(queryComp);

  if (isPureTshirtQuery && isTshirtProduct) {
    return true;
  }

  // 4. Overall query check for Trouser / Pants
  const isPureTrouserQuery =
    TROUSER_TERMS.has(normalizeText(rawQuery)) ||
    TROUSER_TERMS.has(queryComp) ||
    isTrouserToken(queryNorm) ||
    isTrouserToken(queryComp);

  if (isPureTrouserQuery && isTrouserProduct) {
    return true;
  }

  // 5. Shirt specific matching (excluding t-shirts unless query matched)
  const isShirtQuery =
    !isPureTshirtQuery &&
    (SHIRT_TERMS.has(queryNorm) ||
      queryNorm.split(" ").some(word => SHIRT_TERMS.has(word)));

  const isShirtProduct =
    category === "shirts" && category !== "t-shirts";

  if (isShirtQuery && isShirtProduct) {
    return true;
  }

  // 6. Token-by-token fuzzy / approximate evaluation
  const queryTokens = queryNorm.split(" ").filter(Boolean);
  const productTokens = fullText.split(" ").filter(Boolean);

  const allTokensMatch = queryTokens.every(qToken => {
    // Exact token match or substring in any product token
    if (productTokens.some(pToken => pToken.includes(qToken) || qToken.includes(pToken))) {
      return true;
    }

    // T-shirt synonym / fuzzy check for token
    if (isTshirtToken(qToken) && isTshirtProduct) {
      return true;
    }

    // Trouser synonym / fuzzy check for token
    if (isTrouserToken(qToken) && isTrouserProduct) {
      return true;
    }

    // Levenshtein fuzzy distance tolerance
    const maxDistance = qToken.length <= 4 ? 1 : 2;
    return productTokens.some(pToken => {
      // Don't fuzzy match if lengths are vastly different
      if (Math.abs(pToken.length - qToken.length) > 2) return false;
      return levenshteinDistance(qToken, pToken) <= maxDistance;
    });
  });

  return allTokensMatch;
}

/**
 * Filter & sort products helper
 */
export function filterAndSortProducts<T extends Partial<ProductItem>>(
  products: T[],
  category: string,
  query: string,
  sortOrder: string
): T[] {
  let res = [...products];

  // Category filter
  if (category && category !== "all") {
    res = res.filter(p => (p.category || "").toLowerCase() === category.toLowerCase());
  }

  // Smart Approximate Search
  if (query && query.trim()) {
    res = res.filter(p => productMatchesQuery(p, query));
  }

  // Sort
  if (sortOrder === "price-asc") {
    res.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (sortOrder === "price-desc") {
    res.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (sortOrder === "name") {
    res.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  return res;
}
