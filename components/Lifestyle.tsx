import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Lifestyle() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-espresso py-28">
      <Image
        src="/images/cafe-ragi-1kg.webp"
        alt="Pacote de 1kg do Caffè Ragi sobre mesa de madeira, com moedor, xícara e grãos"
        fill
        sizes="100vw"
        quality={92}
        className="object-cover object-[70%_45%]"
      />
      <div className="absolute inset-0 bg-espresso/85 sm:bg-transparent sm:bg-gradient-to-r sm:from-espresso sm:via-espresso/85 sm:to-espresso/20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
            Qualidade em cada torra
          </p>
          <h2 className="mt-4 font-serif text-3xl text-cream sm:text-4xl">
            Torrado artesanalmente para o seu dia a dia
          </h2>
          <p className="mt-6 leading-relaxed text-cream/75">
            Cada lote do Caffè Ragi é torrado em pequenas quantidades em
            Três Pontas, no sul de Minas Gerais, para garantir consistência
            de sabor do primeiro ao último grão do pacote.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/15 pt-8 sm:grid-cols-3">
            {[
              { value: "500g–1kg", label: "por pacote" },
              { value: "83+", label: "pontos de qualidade" },
              { value: "100%", label: "arábica" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <p className="font-serif text-2xl text-gold-light">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wide text-cream/60">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
