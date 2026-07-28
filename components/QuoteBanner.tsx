import Image from "next/image";

export default function QuoteBanner() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-espresso">
      <Image
        src="/images/flatlay-both-bags-cup.webp"
        alt="Pacotes Caffè Ragi 85 e 75 pontos ao lado de um espresso, vistos de cima"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/55" />
      <blockquote className="relative max-w-2xl px-6 text-center font-serif text-2xl italic leading-relaxed text-cream sm:text-3xl">
        &ldquo;Un buon caffè&rdquo; &ndash; um bom café não é sorte, é torra
        certa, ponto certo.
      </blockquote>
    </section>
  );
}
