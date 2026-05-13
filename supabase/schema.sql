-- BEEE Learning Platform — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Flashcard progress tracking
create table if not exists flashcard_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  unit_id text not null,
  topic_id text not null,
  card_index integer not null,
  status text check (status in ('new', 'learning', 'mastered')) default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, unit_id, topic_id, card_index)
);

-- Topic bookmarks
create table if not exists bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  unit_id text not null,
  topic_id text not null,
  created_at timestamptz default now(),
  unique (user_id, unit_id, topic_id)
);

-- Study sessions (optional analytics)
create table if not exists study_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  unit_id text not null,
  topic_id text not null,
  duration_seconds integer,
  started_at timestamptz default now(),
  ended_at timestamptz
);

-- Row Level Security
alter table flashcard_progress enable row level security;
alter table bookmarks enable row level security;
alter table study_sessions enable row level security;

-- Policies: users can only see/edit their own data
create policy "Users manage own flashcard progress"
  on flashcard_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own bookmarks"
  on bookmarks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own study sessions"
  on study_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger flashcard_progress_updated_at
  before update on flashcard_progress
  for each row execute function update_updated_at();
