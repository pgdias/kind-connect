-- Lock the analytics read surface behind the server-side Netlify function.
-- Public quiz tracking keeps its existing INSERT/RPC permissions; analytics reads move to service_role only.

do $$
begin
  if to_regclass('public.analytics_visitors_overview') is not null then
    revoke all on table public.analytics_visitors_overview from anon, authenticated;
    grant select on table public.analytics_visitors_overview to service_role;
  end if;
  if to_regclass('public.analytics_visitors_daily') is not null then
    revoke all on table public.analytics_visitors_daily from anon, authenticated;
    grant select on table public.analytics_visitors_daily to service_role;
  end if;
  if to_regclass('public.analytics_funnel_overview') is not null then
    revoke all on table public.analytics_funnel_overview from anon, authenticated;
    grant select on table public.analytics_funnel_overview to service_role;
  end if;
  if to_regclass('public.analytics_traffic_sources') is not null then
    revoke all on table public.analytics_traffic_sources from anon, authenticated;
    grant select on table public.analytics_traffic_sources to service_role;
  end if;
  if to_regclass('public.analytics_devices') is not null then
    revoke all on table public.analytics_devices from anon, authenticated;
    grant select on table public.analytics_devices to service_role;
  end if;
  if to_regclass('public.analytics_campaigns') is not null then
    revoke all on table public.analytics_campaigns from anon, authenticated;
    grant select on table public.analytics_campaigns to service_role;
  end if;
  if to_regclass('public.analytics_campaign_funnel') is not null then
    revoke all on table public.analytics_campaign_funnel from anon, authenticated;
    grant select on table public.analytics_campaign_funnel to service_role;
  end if;
end;
$$;

revoke all on function public.get_analytics_campaign_funnel() from anon, authenticated;
grant execute on function public.get_analytics_campaign_funnel() to service_role;

notify pgrst, 'reload schema';
