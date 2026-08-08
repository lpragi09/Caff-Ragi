import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// No cookies involved — safe to use in cacheable/static server rendering,
// unlike lib/supabase/server.ts which reads cookies() and forces every
// request to be rendered dynamically on the server.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
