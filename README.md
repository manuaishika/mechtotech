# MechPrep

The missing interview prep platform for mechanical engineers. Think LeetCode meets hardwareishard.com, but actually interactive.

## Features

- 🧠 **Interactive Quiz Mode** - MCQ and conceptual questions with instant feedback
- 📚 **Question Bank** - Filterable database of practice questions
- 💡 **Concept Cards** - Bite-sized explanations with real-world examples
- ✍️ **Community Submissions** - Contribute your own questions
- 🌙 **Dark Mode** - Full dark mode support
- ⌨️ **Keyboard Shortcuts** - 1-4 for MCQ options, Space for reveal
- 🎉 **Smart UX** - Confetti on high scores, progress tracking, timer

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui utilities
- **Animations**: Framer Motion
- **Font**: Inter

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mechtotech
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase-schema.sql` in the Supabase SQL editor
   - This will create all tables and seed 30+ questions

4. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase URL and anon key:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
mechtotech/
├── app/
│   ├── api/              # API routes
│   │   ├── questions/    # Get questions
│   │   ├── quiz/         # Quiz completion
│   │   └── submit/       # Submit new questions
│   ├── quiz/             # Quiz mode page
│   ├── questions/        # Question bank page
│   ├── concepts/         # Concept cards page
│   ├── submit/           # Submit question page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── lib/
│   ├── supabase.ts       # Supabase client & types
│   ├── concepts.ts       # Concept cards data
│   └── utils.ts          # Utility functions
├── supabase-schema.sql   # Database schema & seed data
└── tailwind.config.js    # Tailwind configuration
```

## Database Schema

### Tables

- **questions** - Approved questions (MCQ & conceptual)
- **pending_questions** - Community submissions awaiting review
- **quiz_attempts** - Anonymous quiz statistics

### Seeded Content

The schema includes 30+ questions covering:
- Thermodynamics (Otto cycle, Carnot efficiency, heat exchangers)
- Fluid Mechanics (Bernoulli's principle, cavitation, Reynolds number)
- Materials Science (stress-strain, fatigue, heat treatment)
- Manufacturing (casting, forging, CNC, 3D printing)
- Automobile Systems (engines, differentials, braking)
- EVs (BMS, regenerative braking, battery chemistry)
- Design & Mechanisms (FOS, linkages, stress concentration)

Plus 40+ concept cards with real-world examples!

## Features in Detail

### Quiz Mode
- Select topic, difficulty, and question count (10/20/30)
- Two question types:
  - **MCQ**: 4 options, instant feedback, explanation on answer
  - **Conceptual**: Show answer button, self-rate (Got it/Partially/Missed)
- Progress bar, timer (toggleable), keyboard shortcuts
- Results screen with score breakdown and confetti (>80%)

### Question Bank
- Filter by topic, difficulty, type, company
- Search functionality
- Collapsible question cards
- Mark questions as reviewed (localStorage)
- Shows correct answer with explanation

### Concept Cards
- 7 topics, 6+ concepts each
- Short explanations (3-5 lines)
- Real-world examples
- Link to practice questions

### Submit Question
- Add MCQ or conceptual questions
- Rich form with validation
- Company tag (optional)
- "Asked in real interview" flag
- Submissions go to pending queue

## Design Philosophy

- **Minimal & Clean** - Whites, zinc-50/100 backgrounds, zinc-800 text
- **Generous Whitespace** - No card clutter
- **Linear.app / Vercel Aesthetic** - Professional, modern
- **Mobile First** - Responsive design
- **Dark Mode** - Full support via Tailwind
- **Subtle Animations** - Framer Motion for smooth transitions

## Contributing

Want to add questions? Visit `/submit` on the live site or submit a PR with additions to `supabase-schema.sql`.

## Roadmap

- [ ] User authentication (optional)
- [ ] Bookmarking questions
- [ ] Study streaks & progress tracking
- [ ] Topic-wise performance analytics
- [ ] Spaced repetition system
- [ ] Community question voting
- [ ] Interview experience sharing

## License

MIT

## Acknowledgments

- Inspired by hardwareishard.com for mechanical engineering content
- Built with love for ME students tired of Googling

---

**Happy Learning! 🚀**
