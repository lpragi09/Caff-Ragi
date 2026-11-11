import Image from "next/image";
import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    icon: (
      <path
        d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.36-6.36-2.12 2.12M8.76 15.24l-2.12 2.12m11.72 0-2.12-2.12M8.76 8.76 6.64 6.64"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
    title: "Origem Minas Gerais",
    desc: "Grãos selecionados no sul de Minas, torrados em Três Pontas.",
  },
  {
    icon: (
      <path
        d="M4 9h16l-1.4 9.2A2 2 0 0 1 16.63 20H7.37a2 2 0 0 1-1.97-1.8L4 9Zm3-4 1-2m4 2 0-2m4 2 1-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Torra Artesanal",
    desc: "Lotes pequenos, torrados com cuidado para equilibrar corpo e aroma.",
  },
  {
    icon: (
      <path
        d="M4 21h16M6 21V9.5C6 6 8.5 4 12 4s6 2 6 5.5V21M9 21v-4h6v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Notas Selecionadas",
    desc: "Lote com laudo sensorial: 83,5 pontos, notas de chocolate e cítricos.",
  },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ink pt-16 pb-20 lg:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-espresso/40 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium text-cream/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Torra artesanal. Direto de Três Pontas &ndash; MG.
            </span>

            <h1 className="mt-6 font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-[3.4rem]">
              O café especial que transforma sua rotina em{" "}
              <span className="text-gold-light">ritual</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Um café especial de 83,5 pontos, com notas de chocolate e frutas
              cítricas e a tradição italiana no nome. Do grão à xícara, pensado para quem exige qualidade em cada
              detalhe.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#produtos"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
              >
                Ver cafés
                <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#produtos"
                className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                Comprar
              </a>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100} className="h-full">
                <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold-light">
                    {f.icon}
                  </svg>
                  <p className="mt-3 text-sm font-semibold text-cream">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-cream/55">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="relative" delay={150}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/xicara-com-logo.webp"
                alt="Xícara de café Caffè Ragi com a marca, sobre mesa de madeira"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                quality={92}
                className="object-cover"
              />
            </div>
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-1.5 text-xs font-medium text-cream backdrop-blur">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 9h16l-1.4 9.2A2 2 0 0 1 16.63 20H7.37a2 2 0 0 1-1.97-1.8L4 9Zm3-4 1-2m4 2 0-2m4 2 1-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Café especial &middot; Premium
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-14">
              <p className="font-serif text-lg text-cream">
                83,5 pontos na escala SCA.
              </p>
              <p className="mt-1 text-sm text-cream/70">
                Notas claras, torra artesanal e origem rastreável em cada pacote.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
