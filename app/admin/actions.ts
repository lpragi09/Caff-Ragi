"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import type { Category, Moagem, Weight } from "@/lib/products";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent("E-mail ou senha inválidos.")}`);
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    redirect(`/admin/login?error=${encodeURIComponent("Esta conta não tem acesso ao painel.")}`);
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function productFromForm(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    points: Number(formData.get("points") || 0),
    category: String(formData.get("category") || "especial") as Category,
    weight: String(formData.get("weight") || "500g") as Weight,
    moagem: (formData.get("moagem") === "graos" ? "graos" : "moido") as Moagem,
    intensity: Number(formData.get("intensity") || 1),
    acidez: String(formData.get("acidez") || ""),
    corpo: String(formData.get("corpo") || ""),
    description: String(formData.get("description") || ""),
    mercado_livre_link: String(formData.get("mercado_livre_link") || "#"),
    active: formData.get("active") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").insert(productFromForm(formData));

  if (error) {
    redirect(`/admin/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update(productFromForm(formData))
    .eq("id", id);

  if (error) {
    redirect(`/admin/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function toggleActive(id: string, active: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("products").update({ active }).eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}
