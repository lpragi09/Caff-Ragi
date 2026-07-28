import Image from "next/image";

export default function CtaBanner() {
  return (
    <section className="bg-ink px-6 pb-6 lg:px-10">
      <div className="relative mx-auto min-h-[420px] max-w-6xl overflow-hidden rounded-[2rem] sm:min-h-[300px]">
        <Image
          src="/images/bag-75-mug-lifestyle.webp"
          alt="Xícara e pacote Caffè Ragi 75 pontos"
          fill
          sizes="100vw"
          quality={92}
          className="object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/20 sm:bg-gradient-to-r sm:from-ink sm:via-ink/85 sm:to-ink/40" />

        <div className="relative flex h-full min-h-[420px] flex-col justify-end gap-6 px-8 py-12 sm:min-h-[300px] sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <div>
            <h2 className="font-serif text-2xl text-cream sm:text-3xl">
              Receba cafés incríveis no ponto certo.
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/70">
              Compra simples pelo Mercado Livre, com torra artesanal e
              origem rastreável em cada pacote.
            </p>
          </div>

          <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
            <a
              href="#produtos"
              className="rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Ver cafés
            </a>
            <a
              href="#produtos"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
            >
              Comprar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
