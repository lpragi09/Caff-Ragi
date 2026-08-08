import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("products").select("id").limit(1);

    if (error) throw error;

    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Keep-alive falhou:", err);
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
