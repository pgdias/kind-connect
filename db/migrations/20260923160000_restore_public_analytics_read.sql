-- Restore the analytics read surface used by the public /analytics dashboard.
do $$
begin
  if to_regclass('public.analytics_visitors_overview') is not null then
    grant select on table public.analytics_visitors_overview to anon, authenticated;
  end if;
  if to_regclass('public.analytics_visitors_daily') is not null then
    grant select on table public.analytics_visitors_daily to anon, authenticated;
  end if;
  if to_regclass('public.analytics_funnel_overview') is not null then
    grant select on table public.analytics_funnel_overview to anon, authenticated;
  end if;
  if to_regclass('public.analytics_traffic_sources') is not null then
    grant select on table public.analytics_traffic_sources to anon, authenticated;
  end if;
  if to_regclass('public.analytics_devices') is not null then
    grant select on table public.analytics_devices to anon, authenticated;
  end if;
  if to_regclass('public.analytics_campaigns') is not null then
    grant select on table public.analytics_campaigns to anon, authenticated;
  end if;
  if to_regclass('public.analytics_campaign_funnel') is not null then
    grant select on table public.analytics_campaign_funnel to anon, authenticated;
  end if;
end;
$$;

grant execute on function public.get_analytics_campaign_funnel() to anon, authenticated;

notify pgrst, 'reload schema';
