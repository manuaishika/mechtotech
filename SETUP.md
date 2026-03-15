# MechPrep Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Go to **SQL Editor** in the Supabase dashboard
4. Copy the entire contents of `supabase-schema.sql`
5. Paste and run it in the SQL editor
6. This will create all tables and seed 30+ practice questions

### 3. Configure Environment Variables

1. In Supabase, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Create a file named `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## Troubleshooting

### "Failed to fetch questions"

- Check that your `.env.local` file has correct Supabase credentials
- Verify that the SQL schema was run successfully in Supabase
- Check Supabase logs in the dashboard

### TypeScript errors

```bash
npm run build
```

This will show any build errors.

### Questions not showing up

- Make sure you ran the entire `supabase-schema.sql` script
- Check the Supabase Table Editor to verify questions were inserted
- Verify Row Level Security (RLS) policies are created

## Database Structure

After running the schema, you should see:

- **questions** table with ~30 rows
- **pending_questions** table (empty)
- **quiz_attempts** table (empty)

## Next Steps

- Explore the quiz mode at `/quiz`
- Browse questions at `/questions`
- Check out concept cards at `/concepts`
- Try submitting a question at `/submit`

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

Vercel will automatically detect Next.js and configure everything.

## Adding More Questions

Edit `supabase-schema.sql` and add more INSERT statements, then run them in Supabase SQL Editor:

```sql
INSERT INTO questions (question, answer, question_type, options, correct_option, topic, difficulty, company, is_real_interview) 
VALUES (
  'Your question here?',
  'Your detailed answer here.',
  'mcq',
  '["Option 1", "Option 2", "Option 3", "Option 4"]',
  0,
  'Thermodynamics',
  'medium',
  'Tesla',
  TRUE
);
```

For conceptual questions, set `options` and `correct_option` to NULL.
