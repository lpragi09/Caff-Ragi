import Image from "next/image";
import { MERCADO_LIVRE } from "@/lib/constants";

const PRODUCTS = [
  {
    id: "85",
    points: "85 Pontos",
    tier: "Linha Especial",
    name: "Caffè Ragi 85 Pontos",
    image: "/images/bag-85-packshot.webp",
    notes: "Chocolate, Caramelo, Frutas Cítricas",
    acidez: "Equilibrada",
    corpo: "Encorpado",
    origem: "Minas Gerais · Altitude 1100m",
    link: MERCADO_LIVRE.pontos85,
    badge: "bg-espresso text-cream",
  },
  {
    id: "75",
    points: "75 Pontos",
    tier: "Linha Tradicional",
    name: "Caffè Ragi 75 Pontos",
    image: "/images/bag-75-packshot.webp",
    notes: "Café Tradicional, Doçura Suave, Leve Amargor",
    acidez: "Leve",
    corpo: "Médio",
    origem: "Sul de Minas Gerais",
    link: MERCADO_LIVRE.pontos75,
    badge: "bg-kraft-dark text-cream",
  },
];

export default function Products() {
  return (
    <section id="produtos" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
            Nossos Cafés
          </p>
          <h2 className="mt-4 font-serif text-3xl text-espresso sm:text-4xl">
            Duas torras, uma origem
          </h2>
          <div className="brand-rule mx-auto mt-5 w-24">
            <span />
            <span />
            <span />
          </div>
          <p className="mt-6 text-espresso/70">
            Do dia a dia à xícara mais exigente: escolha a torra do Caffè
            Ragi que combina com o seu momento de café.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${product.badge}`}
                >
                  {product.points}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {product.tier}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-espresso">
                  {product.name}
                </h3>

                <dl className="mt-6 grid grid-cols-2 gap-y-3 border-t border-espresso/10 pt-6 text-sm">
                  <dt className="text-espresso/50">Notas</dt>
                  <dd className="col-start-1 -mt-2 mb-2 text-espresso">
                    {product.notes}
                  </dd>
                  <dt className="text-espresso/50">Acidez</dt>
                  <dd className="text-espresso">{product.acidez}</dd>
                  <dt className="text-espresso/50">Corpo</dt>
                  <dd className="text-espresso">{product.corpo}</dd>
                  <dt className="text-espresso/50">Origem</dt>
                  <dd className="col-span-2 text-espresso">{product.origem}</dd>
                </dl>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso-light"
                >
                  Comprar no Mercado Livre
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
