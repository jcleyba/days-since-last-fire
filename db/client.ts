import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lewgjwyoitwtbzfqyqer.supabase.co"; //process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxld2dqd3lvaXR3dGJ6ZnF5cWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzODk4NjAsImV4cCI6MTk4MTk2NTg2MH0.MuIaMiHqt_LZ7qjFFluq4I5hKbUY0ocupP6H28wP-Nw"; //process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const dbClient = createClient(supabaseUrl, supabaseKey);
