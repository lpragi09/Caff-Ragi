import ProductsCarousel from "@/components/ProductsCarousel";
import Reveal from "@/components/Reveal";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "especial-250",
    title: "Caffè Ragi 85 Pontos — 250g",
    points: 85,
    category: "especial",
    weight: "250g",
    intensity: 4,
    acidez: "Equilibrada",
    corpo: "Encorpado",
    description:
      "Chocolate, caramelo e frutas cítricas em um café encorpado e equilibrado.",
    mercado_livre_link: "#",
    active: true,
  },
  {
    id: "especial-500",
    title: "Caffè Ragi 85 Pontos — 500g",
    points: 85,
    category: "especial",
    weight: "500g",
    intensity: 4,
    acidez: "Equilibrada",
    corpo: "Encorpado",
    description:
      "Chocolate, caramelo e frutas cítricas em um café encorpado e equilibrado.",
    mercado_livre_link: "#",
    active: true,
  },
  {
    id: "gourmet-250",
    title: "Caffè Ragi 75 Pontos — 250g",
    points: 75,
    category: "gourmet",
    weight: "250g",
    intensity: 3,
    acidez: "Leve",
    corpo: "Médio",
    description: "Café tradicional, doçura suave e leve amargor para o dia a dia.",
    mercado_livre_link: "#",
    active: true,
  },
  {
    id: "gourmet-500",
    title: "Caffè Ragi 75 Pontos — 500g",
    points: 75,
    category: "gourmet",
    weight: "500g",
    intensity: 3,
    acidez: "Leve",
    corpo: "Médio",
    description: "Café tradicional, doçura suave e leve amargor para o dia a dia.",
    mercado_livre_link: "#",
    active: true,
  },
];

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("points", { ascending: false })
      .order("weight", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_PRODUCTS;
    return data as Product[];
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export default async function Products() {
  const products = await getProducts();

  return (
    <section id="produtos" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Nossos Cafés
          </span>
          <h2 className="mt-5 max-w-lg font-serif text-3xl text-cream sm:text-4xl">
            Catálogo elegante, com perfis que fazem sentido.
          </h2>
          <p className="mt-4 max-w-xl text-cream/65">
            Escolha pela torra e pelo perfil de sabor que combina com você.
            Duas opções, notas bem definidas, sempre com origem rastreável.
          </p>

          <div className="mt-10 flex items-center gap-2 text-sm text-cream/55">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold-light">
              <path
                d="M4 9h16l-1.4 9.2A2 2 0 0 1 16.63 20H7.37a2 2 0 0 1-1.97-1.8L4 9Zm3-4 1-2m4 2 0-2m4 2 1-2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cafés especiais, com origem e perfil sensorial claro.
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ProductsCarousel products={products} />
        </Reveal>
      </div>
    </section>
  );
}
