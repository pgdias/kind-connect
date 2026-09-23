-- Blinda Bolsa Família — analytics do quiz
-- Execute este SQL no Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  current_step integer not null default 1,
  landing_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  session_id text not null references public.quiz_sessions(session_id) on delete cascade,
  question_id integer not null,
  answer text not null,
  answered_at timestamptz not null default now(),
  unique (session_id, question_id)
);

create index if not exists quiz_answers_session_id_idx
  on public.quiz_answers(session_id);

create index if not exists quiz_answers_question_id_idx
  on public.quiz_answers(question_id);

alter table public.quiz_sessions enable row level security;
alter table public.quiz_answers enable row level security;

drop policy if exists "quiz sessions public insert" on public.quiz_sessions;
create policy "quiz sessions public insert"
  on public.quiz_sessions
  for insert
  to anon
  with check (true);

drop policy if exists "quiz sessions public update" on public.quiz_sessions;
create policy "quiz sessions public update"
  on public.quiz_sessions
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "quiz answers public insert" on public.quiz_answers;
create policy "quiz answers public insert"
  on public.quiz_answers
  for insert
  to anon
  with check (true);

drop policy if exists "quiz answers public update" on public.quiz_answers;
create policy "quiz answers public update"
  on public.quiz_answers
  for update
  to anon
  using (true)
  with check (true);

-- O navegador nunca recebe permissão pública de SELECT.
revoke select on public.quiz_sessions from anon;
revoke select on public.quiz_answers from anon;
