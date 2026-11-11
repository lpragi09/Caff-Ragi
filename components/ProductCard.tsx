import Image from "next/image";
import { CATEGORY_LABEL, MOAGEM_LABEL, getProductImage, type Product } from "@/lib/products";
import { formatPoints } from "@/lib/lote";

export function IntensityStars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Intensidade ${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill={i < value ? "var(--color-gold-light)" : "none"}
          stroke="var(--color-gold-light)"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const hasLink = product.mercado_livre_link && product.mercado_livre_link !== "#";
  const moagem = MOAGEM_LABEL[product.moagem ?? "moido"];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-espresso/60 transition-colors hover:border-gold/30">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso">
        <Image
          src={getProductImage(product.weight)}
          alt={`Pacote ${product.weight} do ${product.title} (${moagem.toLowerCase()})`}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
          quality={90}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold text-gold-light backdrop-blur">
          {formatPoints(product.points)} pts SCA
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-espresso">
          {product.weight}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          {moagem}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-medium uppercase tracking-wide text-cream/45">
          {CATEGORY_LABEL[product.category]} &middot; {moagem}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-cream">{product.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/60">
          {product.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-cream/15 px-3 py-1 text-xs text-cream/65">
            Acidez {product.acidez}
          </span>
          <span className="rounded-full border border-cream/15 px-3 py-1 text-xs text-cream/65">
            Corpo {product.corpo}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-cream/10 pt-6">
          <div>
            <IntensityStars value={product.intensity} />
            <p className="mt-1 text-[11px] uppercase tracking-wide text-cream/40">
              Intensidade
            </p>
          </div>
          <a
            href={hasLink ? product.mercado_livre_link : "#contato"}
            {...(hasLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
