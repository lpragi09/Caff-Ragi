import Image from "next/image";

export default function Gallery() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
            Ritual do Café
          </p>
          <h2 className="mt-4 font-serif text-3xl text-espresso sm:text-4xl">
            Da torra ao espresso perfeito
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-square">
            <Image
              src="/images/espresso-cup-top.webp"
              alt="Espresso Caffè Ragi visto de cima, com grãos de café ao redor"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-square">
            <Image
              src="/images/bag-75-mug-lifestyle.webp"
              alt="Pacote Caffè Ragi 75 pontos ao lado de uma xícara da marca"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
