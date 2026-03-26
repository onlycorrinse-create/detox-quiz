import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuizResultRow {
  id?: string;
  created_at?: string;
  answers: Record<number, string[]>;
  selected_count: number;
  result_level: "low" | "medium" | "high";
}

export async function saveQuizResult(
  data: Omit<QuizResultRow, "id" | "created_at">
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("quiz_results").insert([data]);

  if (error) {
    console.error("Supabase error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
