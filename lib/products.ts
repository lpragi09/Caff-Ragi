export type Category = "especial" | "gourmet";
export type Weight = "250g" | "500g";

export type Product = {
  id: string;
  title: string;
  points: number;
  category: Category;
  weight: Weight;
  intensity: number;
  acidez: string;
  corpo: string;
  description: string;
  mercado_livre_link: string;
  active: boolean;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  especial: "Café Especial",
  gourmet: "Café Gourmet",
};

const IMAGE_MAP: Record<Category, Record<Weight, string>> = {
  especial: {
    "250g": "/images/cafe-especial-250g.webp",
    "500g": "/images/cafe-especial-500g.webp",
  },
  gourmet: {
    "250g": "/images/cafe-gourmet-250g.webp",
    "500g": "/images/cafe-gourmet-500g.webp",
  },
};

export function getProductImage(category: Category, weight: Weight) {
  return IMAGE_MAP[category][weight];
}
