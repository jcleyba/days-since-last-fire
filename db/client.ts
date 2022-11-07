import { createClient } from "https://deno.land/x/supabase@1.3.1/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

export const dbClient = createClient(supabaseUrl, supabaseKey);
