import ProductCard from "@/components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";
import Reveal from "@/components/Reveal";
import { createClient } from "@/lib/supabase/public";
import { LOTE, formatPoints } from "@/lib/lote";
import type { Product } from "@/lib/products";

const DESCRIPTION =
  "Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "especial-500",
    title: "Caffè Ragi Especial — 500g",
    points: LOTE.pontuacao,
    category: "especial",
    weight: "500g",
    intensity: 4,
    acidez: "Cítrica",
    corpo: "Encorpado",
    description: DESCRIPTION,
    mercado_livre_link: "#",
    active: true,
  },
  {
    id: "especial-1kg",
    title: "Caffè Ragi Especial — 1kg",
    points: LOTE.pontuacao,
    category: "especial",
    weight: "1kg",
    intensity: 4,
    acidez: "Cítrica",
    corpo: "Encorpado",
    description: DESCRIPTION,
    mercado_livre_link: "#",
    active: true,
  },
];

const WEIGHT_ORDER: Record<string, number> = { "250g": 0, "500g": 1, "1kg": 2 };

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
        (WEIGHT_ORDER[a.weight] ?? 9) - (WEIGHT_ORDER[b.weight] ?? 9)
    );
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

function FichaDoLote() {
  const dataAnalise = new Date(`${LOTE.dataAnalise}T12:00:00`).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex h-full flex-col rounded-3xl border border-gold/25 bg-gradient-to-b from-espresso to-ink p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
        Ficha do lote
      </p>

      <div className="mt-5 flex items-end gap-3">
        <span className="font-serif text-6xl leading-none text-cream">
          {formatPoints(LOTE.pontuacao)}
        </span>
        <span className="pb-1 text-sm text-cream/60">
          pontos
          <br />
          escala SCA
        </span>
      </div>

      <div className="mt-6">
        <p className="text-[11px] uppercase tracking-wide text-cream/45">Notas sensoriais</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LOTE.notas.map((nota) => (
            <span
              key={nota}
              className="rounded-full bg-gold/15 px-3 py-1 text-sm font-medium text-gold-light"
            >
              {nota}
            </span>
          ))}
        </div>
      </div>

      <dl className="mt-6 flex flex-col gap-2.5">
        {LOTE.atributos.map((attr) => (
          <div key={attr.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
            <dt className="text-xs text-cream/65">{attr.label}</dt>
            <dd className="text-xs font-semibold tabular-nums text-cream">
              {attr.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </dd>
            <div className="col-span-2 h-1 overflow-hidden rounded-full bg-cream/10" aria-hidden>
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${(attr.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-col gap-1 border-t border-cream/10 pt-5 text-xs text-cream/50">
        <span>Lote {LOTE.codigo}</span>
        <span>{LOTE.peneira}</span>
        <span>Análise sensorial de {dataAnalise}</span>
      </div>
    </div>
  );
}

export default async function Products() {
  const products = await getProducts();
  const useCarousel = products.length > 2;

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
            cítricas, doçura e xícara limpa. Escolha o tamanho que combina com a
            sua rotina.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Reveal className="h-full">
            <FichaDoLote />
          </Reveal>

          <Reveal delay={150} className="min-w-0">
            {useCarousel ? (
              <ProductsCarousel products={products} />
            ) : (
              <div className="grid h-full gap-6 sm:grid-cols-2">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
