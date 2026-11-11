import ProductCard from "@/components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";
import Reveal from "@/components/Reveal";
import { createClient } from "@/lib/supabase/public";
import { LOTE, formatPoints } from "@/lib/lote";
import type { Product } from "@/lib/products";

const DESCRIPTION =
  "Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.";

const FALLBACK_SIZES: { weight: Product["weight"]; moagem: NonNullable<Product["moagem"]> }[] = [
  { weight: "500g", moagem: "moido" },
  { weight: "500g", moagem: "graos" },
  { weight: "1kg", moagem: "moido" },
  { weight: "1kg", moagem: "graos" },
];

const FALLBACK_PRODUCTS: Product[] = FALLBACK_SIZES.map(({ weight, moagem }) => ({
  id: `especial-${weight}-${moagem}`,
  title: `Caffè Ragi Especial — ${weight} ${moagem === "moido" ? "Moído" : "em Grãos"}`,
  points: LOTE.pontuacao,
  category: "especial",
  weight,
  moagem,
  intensity: 4,
  acidez: "Cítrica",
  corpo: "Encorpado",
  description: DESCRIPTION,
  mercado_livre_link: "#",
  active: true,
}));

const WEIGHT_ORDER: Record<string, number> = { "250g": 0, "500g": 1, "1kg": 2 };
const MOAGEM_ORDER: Record<string, number> = { moido: 0, graos: 1 };

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("points", { ascending: false });

    if (error || !data || data.length === 0) return FALLBACK_PRODUCTS;
    return (data as Product[]).sort(
      (a, b) =>
        Number(b.points) - Number(a.points) ||
        (WEIGHT_ORDER[a.weight] ?? 9) - (WEIGHT_ORDER[b.weight] ?? 9) ||
        (MOAGEM_ORDER[a.moagem ?? "moido"] ?? 9) - (MOAGEM_ORDER[b.moagem ?? "moido"] ?? 9)
    );
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export default async function Products() {
  const products = await getProducts();
  const useCarousel = products.length > 4;

  return (
    <section id="produtos" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Nossos Cafés
          </span>
          <h2 className="mt-5 max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Um café especial de {formatPoints(LOTE.pontuacao)} pontos, do grão à xícara.
          </h2>
          <p className="mt-4 max-w-xl text-cream/65">
            Lote único do sul de Minas, com laudo sensorial: chocolate e frutas
            cítricas, doçura e xícara limpa. Em grãos ou moído, em pacotes de
            500g e 1kg.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          {useCarousel ? (
            <ProductsCarousel products={products} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
