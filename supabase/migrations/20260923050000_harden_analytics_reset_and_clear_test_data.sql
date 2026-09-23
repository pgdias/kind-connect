-- One-time production hardening and cleanup of the pre-launch analytics dataset.
-- The marker makes this safe when the migration runner replays all migrations.

create table if not exists public.analytics_maintenance (
  operation_key text primary key,
  applied_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from public.analytics_maintenance
    where operation_key = 'initial_test_data_reset_2026_09_23'
  ) then
    delete from public.respostas_quiz where true;
    delete from public.quiz_events where true;
    delete from public.quiz_answers where true;
    delete from public.quiz_sessions where true;

    insert into public.analytics_maintenance (operation_key)
    values ('initial_test_data_reset_2026_09_23');
  end if;
end;
$$;

-- The reset RPC must not remain callable by public/anonymous clients.
drop function if exists public.reset_analytics_data();

-- Keep the maintenance marker private to database-side automation.
revoke all on table public.analytics_maintenance from public;

notify pgrst, 'reload schema';
