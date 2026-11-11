import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function QuoteBanner() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-espresso">
      <Image
        src="/images/espresso-cup-top.webp"
        alt="Xícara de espresso vista de cima"
        fill
        sizes="100vw"
        quality={92}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/55" />
      <Reveal className="relative max-w-2xl px-6">
        <blockquote className="text-center font-serif text-2xl italic leading-relaxed text-cream sm:text-3xl">
          &ldquo;Un buon caffè&rdquo; &ndash; um bom café não é sorte, é torra
          certa, ponto certo.
        </blockquote>
      </Reveal>
    </section>
  );
}
