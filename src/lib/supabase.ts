import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FlashcardProgress = {
  id: string;
  user_id: string;
  unit_id: string;
  topic_id: string;
  card_index: number;
  status: "new" | "learning" | "mastered";
  updated_at: string;
};

export type NoteBookmark = {
  id: string;
  user_id: string;
  unit_id: string;
  topic_id: string;
  created_at: string;
};
