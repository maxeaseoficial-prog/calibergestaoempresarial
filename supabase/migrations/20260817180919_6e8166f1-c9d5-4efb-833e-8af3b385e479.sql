
  -- Final hardening: Revoke ALL access to site_settings for everyone EXCEPT service_role and admins
  -- This eliminates the linter warning about broad public access
  DROP POLICY IF EXISTS "Public read access for non-sensitive settings" ON public.site_settings;
  
  -- The app will now rely on fallback constants from site-data.ts for public users
  -- Admin will still have access to edit via the /admin dashboard
