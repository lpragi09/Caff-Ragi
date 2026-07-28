import Image from "next/image";
import { MERCADO_LIVRE } from "@/lib/constants";

export default function CtaBanner() {
  return (
    <section id="contato" className="relative overflow-hidden bg-espresso py-28">
      <Image
        src="/images/beans-dark-bg.webp"
        alt="Grãos de café Caffè Ragi em movimento sobre fundo escuro"
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-espresso/60" />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 className="font-serif text-3xl text-cream sm:text-4xl">
          Experimente o Caffè Ragi
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-cream/75">
          Escolha entre a torra 85 pontos ou a tradicional 75 pontos e receba
          em casa através do Mercado Livre.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={MERCADO_LIVRE.pontos85}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
          >
            Comprar 85 Pontos
          </a>
          <a
            href={MERCADO_LIVRE.pontos75}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            Comprar 75 Pontos
          </a>
        </div>
      </div>
    </section>
  );
}
