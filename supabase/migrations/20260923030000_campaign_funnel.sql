create or replace view public.analytics_campaign_funnel as
with campaign_sessions as (
  select
    session_id,
    visitor_id,
    coalesce(nullif(utm_source, ''), 'Direto / não identificado') as source,
    coalesce(nullif(utm_medium, ''), '—') as medium,
    coalesce(nullif(utm_campaign, ''), '—') as campaign,
    coalesce(nullif(utm_content, ''), '—') as content,
    coalesce(nullif(utm_term, ''), '—') as term
  from public.quiz_sessions
),
started as (
  select distinct session_id
  from public.quiz_events
  where event_name = 'quiz_started'
),
completed as (
  select distinct session_id
  from public.quiz_events
  where event_name = 'quiz_completed'
),
result_viewed as (
  select distinct e.session_id
  from public.quiz_events e
  inner join completed c on c.session_id = e.session_id
  where e.event_name = 'result_viewed'
),
checkout as (
  select distinct e.session_id
  from public.quiz_events e
  inner join result_viewed r on r.session_id = e.session_id
  where e.event_name = 'checkout_click'
),
cta as (
  select distinct session_id
  from public.quiz_events
  where event_name = 'cta_click'
)
select
  cs.source,
  cs.medium,
  cs.campaign,
  cs.content,
  cs.term,
  count(distinct cs.visitor_id)::bigint as unique_visitors,
  count(distinct cs.session_id)::bigint as sessions,
  count(distinct cs.visitor_id) filter (where s.session_id is not null)::bigint as unique_quiz_starters,
  count(distinct cs.session_id) filter (where s.session_id is not null)::bigint as quiz_starts,
  count(distinct cs.visitor_id) filter (where c.session_id is not null)::bigint as unique_quiz_completions,
  count(distinct cs.session_id) filter (where c.session_id is not null)::bigint as quiz_completions,
  count(distinct cs.visitor_id) filter (where r.session_id is not null)::bigint as unique_result_viewers,
  count(distinct cs.session_id) filter (where r.session_id is not null)::bigint as result_views,
  count(distinct cs.visitor_id) filter (where co.session_id is not null)::bigint as unique_checkout_visitors,
  count(distinct cs.session_id) filter (where co.session_id is not null)::bigint as checkout_clicks,
  count(distinct cs.visitor_id) filter (where ct.session_id is not null)::bigint as unique_cta_visitors,
  count(distinct cs.session_id) filter (where ct.session_id is not null)::bigint as cta_clicks
from campaign_sessions cs
left join started s on s.session_id = cs.session_id
left join completed c on c.session_id = cs.session_id
left join result_viewed r on r.session_id = cs.session_id
left join checkout co on co.session_id = cs.session_id
left join cta ct on ct.session_id = cs.session_id
group by 1, 2, 3, 4, 5
order by unique_checkout_visitors desc, unique_quiz_completions desc, unique_visitors desc, sessions desc;

grant select on public.analytics_campaign_funnel to anon;
