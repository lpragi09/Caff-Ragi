import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORY_LABEL, type Product } from "@/lib/products";
import { deleteProduct, toggleActive } from "@/app/admin/actions";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products = (data ?? []) as Product[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-cream">Anúncios de café</h1>
        <Link
          href="/admin/new"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
        >
          + Novo café
        </Link>
      </div>

      {products.length === 0 && (
        <p className="mt-8 text-sm text-cream/50">
          Nenhum anúncio ainda. Rode o schema.sql no Supabase e/ou crie o
          primeiro anúncio.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-3 rounded-2xl border border-cream/10 bg-espresso/40 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-cream/40">
                {CATEGORY_LABEL[product.category]} &middot; {product.points} Pontos &middot;{" "}
                {product.weight} &middot; {product.active ? "Ativo" : "Oculto"}
              </p>
              <p className="mt-1 font-serif text-lg text-cream">{product.title}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <form action={toggleActive.bind(null, product.id, !product.active)}>
                <button
                  type="submit"
                  className="rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold text-cream/70 transition-colors hover:border-cream/40"
                >
                  {product.active ? "Ocultar" : "Publicar"}
                </button>
              </form>
              <Link
                href={`/admin/${product.id}/edit`}
                className="rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold text-cream/70 transition-colors hover:border-cream/40"
              >
                Editar
              </Link>
              <form action={deleteProduct.bind(null, product.id)}>
                <button
                  type="submit"
                  className="rounded-full border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-300 transition-colors hover:border-red-500/60"
                >
                  Excluir
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
