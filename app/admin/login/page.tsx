import { login } from "@/app/admin/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
        Painel Admin
      </p>
      <h1 className="mt-3 font-serif text-2xl text-cream">Entrar</h1>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <form action={login} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-cream/70">
          E-mail
          <input
            required
            type="email"
            name="email"
            className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-cream/70">
          Senha
          <input
            required
            type="password"
            name="password"
            className="rounded-xl border border-cream/15 bg-espresso/40 px-4 py-2.5 text-cream outline-none focus:border-gold"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
