const ITEMS = [
  { label: "100% Arábica" },
  { label: "Torra Artesanal" },
  { label: "Origem Minas Gerais" },
  { label: "Pacotes de 250g" },
];

export default function TrustBar() {
  return (
    <div className="border-b border-espresso/10 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-4 px-6 py-6 text-center sm:grid-cols-4 lg:px-10">
        {ITEMS.map((item) => (
          <p
            key={item.label}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso/70"
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
