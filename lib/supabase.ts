import { createClient } from '@supabase/supabase-js';

export interface ArticleView {
  id?: number;
  slug: string;
  view_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface ViewCount {
  slug: string;
  view_count: number;
}

// Check if Supabase environment variables are configured
const isSupabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Create Supabase client only if environment variables are available
export const supabase = isSupabaseConfigured 
  ? createClient<{
      public: {
        Tables: {
          view_counts: {
            Row: ArticleView;
            Insert: Omit<ArticleView, 'id'>;
            Update: Partial<Omit<ArticleView, 'id'>>;
          };
        };
      };
    }>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  : null;

export { isSupabaseConfigured }; 