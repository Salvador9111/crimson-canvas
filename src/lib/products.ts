export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  rating?: number;
  reviews_count?: number;
  badge?: string;
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    slug: "classic-white-oxford",
    name: "Classic White Oxford Shirt",
    description: "A timeless white oxford crafted from premium GOTS-certified organic cotton. Refined collar roll, mother-of-pearl buttons, and tailored ease. Easy to dress up or down.",
    price: 89,
    category: "shirts",
    image_url: "/products/p-shirt-1.jpg",
    stock: 24,
    badge: "BESTSELLER"
  },
  {
    id: "prod-2",
    slug: "striped-linen-shirt",
    name: "Striped French Linen Shirt",
    description: "Lightweight European flax linen shirt with a relaxed silhouette and breezy muted stripes. Breathable and pre-washed for immediate softness on warm days.",
    price: 79,
    category: "shirts",
    image_url: "/products/p-shirt-2.jpg",
    stock: 18,
    badge: "NEW ARRIVAL"
  },
  {
    id: "prod-3",
    slug: "wine-heavyweight-tee",
    name: "Wine Heavyweight Organic Tee",
    description: "Heavyweight 240 GSM organic cotton tee in a rich, quiet wine tone. Substantial drape, reinforced ribbed collar, and built to outlast seasons.",
    price: 45,
    category: "t-shirts",
    image_url: "/products/p-tshirt-1.jpg",
    stock: 60,
    badge: "POPULAR"
  },
  {
    id: "prod-4",
    slug: "essential-cream-tee",
    name: "Essential Cream Organic Tee",
    description: "A perfectly cut everyday t-shirt in warm cream ivory. Mid-weight, smooth-touch combed cotton with zero synthetic blends.",
    price: 38,
    category: "t-shirts",
    image_url: "/products/p-tshirt-2.jpg",
    stock: 75,
    badge: "STAPLE"
  },
  {
    id: "prod-5",
    slug: "tailored-wool-trouser",
    name: "Tailored Wool Tapered Trouser",
    description: "Wide leg Italian wool trouser with a clean drape and comfortable interior lining. Quietly elegant tailoring for versatile everyday wear.",
    price: 145,
    category: "trousers",
    image_url: "/products/p-trouser-1.jpg",
    stock: 12,
    badge: "EDITOR'S PICK"
  },
  {
    id: "prod-6",
    slug: "pleated-camel-trouser",
    name: "Pleated Camel Twill Trouser",
    description: "Pleated trousers in a soft camel stone hue. Relaxed thigh with gentle taper. Refined ease for formal and casual occasions alike.",
    price: 129,
    category: "trousers",
    image_url: "/products/p-trouser-2.jpg",
    stock: 16,
    badge: "LIMITED"
  }
];

export function getInitialProductBySlug(slug: string): ProductItem | undefined {
  return INITIAL_PRODUCTS.find(p => p.slug === slug || p.slug.includes(slug) || slug.includes(p.slug));
}
