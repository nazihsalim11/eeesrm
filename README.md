# BEEE Learning Platform

A modern, minimal learning platform for **Basic Electrical and Electronics Engineering (21EES101T)** at SRM Institute.

## Features

- **5 Units** covering DC/AC circuits, electronics, machines, transducers, and power engineering
- **35+ Topics** extracted and structured from official course PPTs
- **LaTeX Formula Rendering** using KaTeX — copy formulas with one click
- **Active Recall Flashcards** with mastery tracking per card
- **Unified Search** across topics, concepts, formulas, and flashcards (Fuse.js, Ctrl+K)
- **Dark Mode** with system preference detection and toggle
- **Responsive** — works on mobile, tablet, and desktop
- **Subject → Unit → Topic** navigation sidebar

## Tech Stack

- **Next.js 16** (App Router, Static Generation — 44 pages)
- **Tailwind CSS** (dark mode, responsive)
- **Supabase** (progress tracking, bookmarks)
- **KaTeX** (formula rendering)
- **Fuse.js** (fuzzy search)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL editor
3. Update `.env.local` with your project URL and anon key

## Unit Structure

| Unit | Title | Topics |
|------|-------|--------|
| 1 | DC & AC Circuit Analysis | 8 topics |
| 2 | Electronics: Semiconductors & Digital | 8 topics |
| 3 | Machines & Drives | 6 topics |
| 4 | Transducers & Sensors | 7 topics |
| 5 | Power Engineering | 6 topics |
