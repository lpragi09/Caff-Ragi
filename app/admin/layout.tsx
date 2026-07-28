import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/admin/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-ink text-cream">
      {user && (
        <header className="border-b border-cream/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/admin" className="font-serif text-lg">
              Caffè Ragi &middot; Admin
            </Link>
            <div className="flex items-center gap-4 text-sm text-cream/60">
              <span>{user.email}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full border border-cream/20 px-4 py-2 text-cream transition-colors hover:border-cream hover:text-cream"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
