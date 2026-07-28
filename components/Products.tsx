import Image from "next/image";
import { MERCADO_LIVRE } from "@/lib/constants";

const PRODUCTS = [
  {
    id: "85",
    points: "85 Pontos",
    tier: "Café Especial",
    name: "Caffè Ragi 85 Pontos",
    image: "/images/cafe-especial.webp",
    description:
      "Chocolate, caramelo e frutas cítricas em um café encorpado e equilibrado.",
    tags: ["Acidez equilibrada", "Corpo encorpado", "Minas Gerais · 1100m"],
    intensity: 4,
    icon: "flame" as const,
    link: MERCADO_LIVRE.pontos85,
  },
  {
    id: "75",
    points: "75 Pontos",
    tier: "Café Gourmet",
    name: "Caffè Ragi 75 Pontos",
    image: "/images/cafe-gourmet.webp",
    description:
      "Café tradicional, doçura suave e leve amargor para o dia a dia.",
    tags: ["Acidez leve", "Corpo médio", "Sul de Minas Gerais"],
    intensity: 3,
    icon: "leaf" as const,
    link: MERCADO_LIVRE.pontos75,
  },
];

function Icon({ name }: { name: "flame" | "leaf" }) {
  if (name === "flame") {
    return (
      <path
        d="M12 3s4 3.2 4 7.2a4 4 0 1 1-8 0c0-1 .4-1.8 1-2.6.2 1 1 1.6 1.6 1.2C10.8 8 10 6.6 10 5c0 0 1.2-.6 2-2Zm0 18a5.5 5.5 0 0 1-5.5-5.5c0-2 1-3.3 2.2-4.6-.2 1.4.6 2.4 1.6 2.2.6-1.4-.3-2.6-.3-4.1 0 0 3 2 3 4.5.8-.6 1-1.6.8-2.6A5.5 5.5 0 0 1 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    );
  }
  return (
    <path
      d="M5 21c7 0 13-5 13-13V5h-3C8 5 5 11 5 18v3Zm0 0c1-4 3-7 6-9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function IntensityStars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill={i < value ? "var(--color-gold-light)" : "none"}
          stroke="var(--color-gold-light)"
          strokeWidth="1.2"
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Products() {
  return (
    <section id="produtos" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-espresso/60 transition-colors hover:border-gold/30"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  quality={92}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-gold-light backdrop-blur">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <Icon name={product.icon} />
                  </svg>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-medium uppercase tracking-wide text-cream/45">
                  {product.tier} &middot; {product.points}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-cream">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {product.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cream/15 px-3 py-1 text-xs text-cream/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-cream/10 pt-6">
                  <div>
                    <IntensityStars value={product.intensity} />
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-cream/40">
                      Intensidade
                    </p>
                  </div>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
