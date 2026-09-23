-- Reset all analytics/test data so the dashboard starts clean.
-- This migration is intentionally one-way: it only clears current analytics rows.

delete from public.respostas_quiz;
delete from public.quiz_events;
delete from public.quiz_answers;
delete from public.quiz_sessions;

notify pgrst, 'reload schema';
