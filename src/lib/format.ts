export const formatPrice = (n: number | string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(Number(n));

export const CATEGORIES = [
  { slug: "shirts", label: "Shirts" },
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "trousers", label: "Trousers" },
] as const;
