import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente paralelo apontando para o Supabase EXTERNO do usuário.
// Configure no Lovable em Project Settings → Environment Variables:
//   VITE_EXTERNAL_SUPABASE_URL
//   VITE_EXTERNAL_SUPABASE_ANON_KEY

const FALLBACK_URL = "https://cafctsqyrrslblzphnts.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZmN0c3F5cnJzbGJsenBobnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDkwNTYsImV4cCI6MjA5NTkyNTA1Nn0.WRyLgKHilN06NV3uzKSLhoD1e8zFcF9GYMTaAlwA5So";

function build(): SupabaseClient {
  const url =
    (import.meta.env.VITE_EXTERNAL_SUPABASE_URL as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
    (typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined) ||
    FALLBACK_URL;
  const key =
    (import.meta.env.VITE_EXTERNAL_SUPABASE_ANON_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (typeof process !== "undefined"
      ? process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY
      : undefined) ||
    FALLBACK_ANON_KEY;

  return createClient(url, key, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      storageKey: "sb-external-auth",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

let _client: SupabaseClient | undefined;

export const supabaseExternal = new Proxy({} as SupabaseClient, {
  get(_t, prop, receiver) {
    if (!_client) _client = build();
    return Reflect.get(_client, prop, receiver);
  },
});
