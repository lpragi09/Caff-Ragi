import Reveal from "@/components/Reveal";

const ITEMS = [
  { label: "100% Arábica" },
  { label: "Torra Artesanal" },
  { label: "Origem Minas Gerais" },
  { label: "Pacotes de 250g a 500g" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-cream/10 bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-4 px-6 py-6 text-center sm:grid-cols-4 lg:px-10">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 80}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/50">
              {item.label}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
