import { supabase, isSupabaseConfigured, ArticleView } from './supabase';
import fs from 'fs';
import path from 'path';

// Fallback JSON file system
const VIEW_COUNTS_FILE = path.join(process.cwd(), 'data', 'viewCounts.json');

// Fallback functions for JSON file system
function getViewCountsFromFile(): Record<string, number> {
  try {
    const data = fs.readFileSync(VIEW_COUNTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function saveViewCountsToFile(viewCounts: Record<string, number>): void {
  try {
    fs.writeFileSync(VIEW_COUNTS_FILE, JSON.stringify(viewCounts, null, 2));
  } catch {
    console.error('Failed to write view counts');
  }
}

// Get view count for a specific article
export async function getArticleViewCount(slug: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('view_counts')
        .select('view_count')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching view count:', error);
        return 0;
      }

      return data?.view_count || 0;
    } catch (error) {
      console.error('Error fetching view count:', error);
      return 0;
    }
  } else {
    // Fallback to JSON file system
    const viewCounts = getViewCountsFromFile();
    return viewCounts[slug] || 0;
  }
}

// Increment view count for an article
export async function incrementArticleView(slug: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      // First, try to get the current record
      const { data: existingData } = await supabase
        .from('view_counts')
        .select('view_count')
        .eq('slug', slug)
        .single();

      if (existingData) {
        // Update existing record
        const { data, error } = await supabase
          .from('view_counts')
          .update({ 
            view_count: existingData.view_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('slug', slug)
          .select('view_count')
          .single();

        if (error) {
          console.error('Error updating view count:', error);
          return existingData.view_count;
        }

        return data?.view_count || existingData.view_count;
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('view_counts')
          .insert({
            slug,
            view_count: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('view_count')
          .single();

        if (error) {
          console.error('Error inserting view count:', error);
          return 0;
        }

        return data?.view_count || 1;
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
      return 0;
    }
  } else {
    // Fallback to JSON file system
    const viewCounts = getViewCountsFromFile();
    const currentCount = viewCounts[slug] || 0;
    const newCount = currentCount + 1;
    viewCounts[slug] = newCount;
    saveViewCountsToFile(viewCounts);
    return newCount;
  }
}

// Get all view counts
export async function getAllViewCounts(): Promise<Record<string, number>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('view_counts')
        .select('slug, view_count');

      if (error) {
        console.error('Error fetching all view counts:', error);
        return {};
      }

      const viewCounts: Record<string, number> = {};
      data?.forEach((item: ArticleView) => {
        viewCounts[item.slug] = item.view_count;
      });

      return viewCounts;
    } catch (error) {
      console.error('Error fetching all view counts:', error);
      return {};
    }
  } else {
    // Fallback to JSON file system
    return getViewCountsFromFile();
  }
}

// Initialize view counts for all articles (useful for setup)
export async function initializeViewCounts(articleSlugs: string[]): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      for (const slug of articleSlugs) {
        const { data } = await supabase
          .from('view_counts')
          .select('slug')
          .eq('slug', slug)
          .single();

        if (!data) {
          // Insert new record with 0 views
          await supabase
            .from('view_counts')
            .insert({
              slug,
              view_count: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
        }
      }
    } catch (error) {
      console.error('Error initializing view counts:', error);
    }
  } else {
    // Fallback to JSON file system
    const viewCounts = getViewCountsFromFile();
    let hasChanges = false;
    
    for (const slug of articleSlugs) {
      if (!(slug in viewCounts)) {
        viewCounts[slug] = 0;
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      saveViewCountsToFile(viewCounts);
    }
  }
} 