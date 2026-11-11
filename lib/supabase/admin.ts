import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Usuário logado E cadastrado em public.admins (função is_admin() no banco).
export async function getAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) return null;

  return { supabase, user };
}

// Para server actions: elas são endpoints públicos, então cada uma
// precisa checar sozinha — o proxy não protege chamadas diretas.
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login?error=" + encodeURIComponent("Acesso restrito."));
  return admin;
}
