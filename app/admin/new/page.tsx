import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/app/admin/actions";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="font-serif text-2xl text-cream">Novo café</h1>
      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <div className="mt-8">
        <ProductForm action={createProduct} submitLabel="Criar anúncio" />
      </div>
    </div>
  );
}
