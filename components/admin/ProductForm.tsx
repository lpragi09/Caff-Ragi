"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { WEIGHTS_FOR_SALE, type Category, type Product, type Weight } from "@/lib/products";

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "especial", label: "Café Especial" },
  { value: "gourmet", label: "Café Gourmet" },
];

const WEIGHT_OPTIONS: { value: Weight; label: string }[] = WEIGHTS_FOR_SALE.map(
  (w) => ({ value: w, label: w })
);

export default function ProductForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: Product;
  submitLabel: string;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [points, setPoints] = useState(initial?.points ?? 83.5);
  const [category, setCategory] = useState<Category>(initial?.category ?? "especial");
  const [weight, setWeight] = useState<Weight>(initial?.weight ?? "500g");
  const [intensity, setIntensity] = useState(initial?.intensity ?? 3);
  const [acidez, setAcidez] = useState(initial?.acidez ?? "");
  const [corpo, setCorpo] = useState(initial?.corpo ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [mercadoLivreLink, setMercadoLivreLink] = useState(
    initial?.mercado_livre_link ?? ""
  );
  const [active, setActive] = useState(initial?.active ?? true);

  const preview: Product = {
    id: initial?.id ?? "preview",
    title: title || "Nome do café",
    points,
    category,
    weight,
    intensity,
    acidez: acidez || "—",
    corpo: corpo || "—",
    description: description || "Descrição do café aparece aqui.",
    mercado_livre_link: mercadoLivreLink || "#",
    active,
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <form action={action} className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm text-cream/70">
          Título
          <input
            required
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Caffè Ragi Especial — 500g"
            className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-cream/70">
            Pontuação
            <input
              required
              type="number"
              name="points"
              min={0}
              max={100}
              step={0.25}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
            />
          </label>

          <div className="flex flex-col gap-2 text-sm text-cream/70">
            Intensidade
            <div className="flex h-[42px] items-center gap-1 rounded-xl border border-cream/15 bg-espresso/40 px-4">
              <input type="hidden" name="intensity" value={intensity} />
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Intensidade ${n}`}
                  onClick={() => setIntensity(n)}
                  className="p-0.5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill={n <= intensity ? "var(--color-gold-light)" : "none"}
                    stroke="var(--color-gold-light)"
                    strokeWidth="1.2"
                  >
                    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-cream/70">
          Categoria
          <input type="hidden" name="category" value={category} />
          <div className="flex gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCategory(opt.value)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  category === opt.value
                    ? "border-gold bg-gold text-espresso font-semibold"
                    : "border-cream/15 text-cream/70 hover:border-cream/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-cream/70">
          Peso do pacote
          <input type="hidden" name="weight" value={weight} />
          <div className="flex gap-2">
            {WEIGHT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setWeight(opt.value)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  weight === opt.value
                    ? "border-gold bg-gold text-espresso font-semibold"
                    : "border-cream/15 text-cream/70 hover:border-cream/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-cream/40">
            A imagem do anúncio é escolhida automaticamente pelo peso.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-cream/70">
            Acidez
            <input
              required
              name="acidez"
              value={acidez}
              onChange={(e) => setAcidez(e.target.value)}
              placeholder="Equilibrada"
              className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-cream/70">
            Corpo
            <input
              required
              name="corpo"
              value={corpo}
              onChange={(e) => setCorpo(e.target.value)}
              placeholder="Encorpado"
              className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-cream/70">
          Descrição
          <textarea
            required
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Chocolate, caramelo e frutas cítricas em um café encorpado e equilibrado."
            className="resize-y rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-cream/70">
          Link do Mercado Livre
          <input
            required
            name="mercado_livre_link"
            value={mercadoLivreLink}
            onChange={(e) => setMercadoLivreLink(e.target.value)}
            placeholder="https://produto.mercadolivre.com.br/..."
            className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-cream/70">
          <input
            type="checkbox"
            name="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 rounded border-cream/30 bg-espresso/40"
          />
          Anúncio visível no site
        </label>

        <button
          type="submit"
          className="mt-2 self-start rounded-full bg-gold px-7 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
        >
          {submitLabel}
        </button>
      </form>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
          Pré-visualização
        </p>
        <div className="max-w-sm">
          <ProductCard product={preview} />
        </div>
      </div>
    </div>
  );
}
