-- Final production launch reset.
-- From this point onward, analytics starts at zero and records only traffic
-- generated after the production launch reset.
delete from public.respostas_quiz;
delete from public.quiz_events;
delete from public.quiz_answers;
delete from public.quiz_sessions;

notify pgrst, 'reload schema';
