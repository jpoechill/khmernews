# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready

## 2. Create the Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the view_counts table
CREATE TABLE view_counts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  view_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on slug for faster lookups
CREATE INDEX idx_view_counts_slug ON view_counts(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE view_counts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for view counts, this is usually fine)
CREATE POLICY "Allow all operations on view_counts" ON view_counts
  FOR ALL USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_view_counts_updated_at 
  BEFORE UPDATE ON view_counts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## 3. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 4. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Base URL for API calls
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 5. Initialize View Counts (Optional)

If you want to pre-populate view counts for existing articles, you can run this in your Supabase SQL Editor:

```sql
-- Insert initial records for your articles (replace with your actual slugs)
INSERT INTO view_counts (slug, view_count) VALUES
  ('article-slug-1', 0),
  ('article-slug-2', 0),
  ('article-slug-3', 0)
ON CONFLICT (slug) DO NOTHING;
```

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Visit an article page
3. Check that the view count increments
4. Verify in Supabase dashboard that the data is being stored

## 7. Monitor Your Data

You can monitor view counts in your Supabase dashboard:
- Go to Table Editor
- Select the `view_counts` table
- View real-time data updates

## Benefits of Using Supabase

✅ **Real Database**: Proper relational database instead of JSON files
✅ **Scalability**: Can handle high traffic and concurrent updates
✅ **Real-time**: Built-in real-time subscriptions if needed
✅ **Backups**: Automatic database backups
✅ **Security**: Row Level Security and proper authentication
✅ **Analytics**: Built-in analytics and monitoring
✅ **API**: RESTful API with automatic generation

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables
2. **"Table not found"**: Make sure you created the table correctly
3. **"Permission denied"**: Check your RLS policies
4. **"Network error"**: Verify your Supabase URL is correct

### Debug Tips:

- Check browser console for errors
- Verify environment variables are loaded
- Test API endpoints directly
- Check Supabase logs in dashboard 