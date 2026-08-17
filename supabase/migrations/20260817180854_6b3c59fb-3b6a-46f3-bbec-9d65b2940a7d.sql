
  -- Refine the public read policy to be even more restrictive
  -- Instead of excluding sensitive keys, we only ALLOW specific keys
  DROP POLICY IF EXISTS "Public read access for non-sensitive settings" ON public.site_settings;
  
  CREATE POLICY "Public read access for non-sensitive settings"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (key IN ('contact_email', 'contact_phone_mt', 'contact_phone_pr', 'site_title', 'site_description'));
