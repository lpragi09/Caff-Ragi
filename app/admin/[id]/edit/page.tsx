import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-cream">Editar café</h1>
      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <div className="mt-8">
        <ProductForm
          action={updateProduct.bind(null, id)}
          initial={data as Product}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
