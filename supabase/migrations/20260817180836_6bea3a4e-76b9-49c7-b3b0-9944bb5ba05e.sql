
  -- Enable RLS on site_settings
  ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

  -- Remove any existing policies to start fresh
  DROP POLICY IF EXISTS "Public read access for non-sensitive settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Service role access for all settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Allow authenticated admins all access" ON public.site_settings;

  -- Create policy for public read access, excluding sensitive keys
  CREATE POLICY "Public read access for non-sensitive settings"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (key NOT IN ('lead_recipient_email', 'RESEND_API_KEY'));

  -- Create policy for service role
  CREATE POLICY "Service role access for all settings"
    ON public.site_settings
    FOR ALL
    TO service_role
    USING (true);

  -- Create policy for authenticated admins (using security definer function)
  CREATE POLICY "Allow authenticated admins all access"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
