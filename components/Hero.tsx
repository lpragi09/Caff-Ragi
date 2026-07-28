import Image from "next/image";
import { MERCADO_LIVRE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-espresso">
      <Image
        src="/images/bag-85-window-lifestyle.webp"
        alt="Xícara de Caffè Ragi e pacote 85 pontos à luz da janela"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/30 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
          Feito em Três Pontas &ndash; MG
        </p>
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
          Café especial, do grão à xícara.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
          Torra artesanal, notas de sabor selecionadas e a tradição italiana
          no nome. Conheça as duas torras do Caffè Ragi.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#produtos"
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
          >
            Ver os cafés
          </a>
          <a
            href={MERCADO_LIVRE.loja}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            Comprar no Mercado Livre
          </a>
        </div>
      </div>
    </section>
  );
}
