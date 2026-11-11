export type Category = "especial" | "gourmet";
export type Weight = "250g" | "500g" | "1kg";

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

// pesos vendidos hoje (os que aparecem no painel de admin)
export const WEIGHTS_FOR_SALE: Weight[] = ["500g", "1kg"];

// a embalagem é a mesma para o lote todo; muda só o peso
const IMAGE_BY_WEIGHT: Record<Weight, string> = {
  "250g": "/images/cafe-ragi-500g.webp",
  "500g": "/images/cafe-ragi-500g.webp",
  "1kg": "/images/cafe-ragi-1kg.webp",
};

export function getProductImage(weight: Weight) {
  return IMAGE_BY_WEIGHT[weight] ?? IMAGE_BY_WEIGHT["500g"];
}
