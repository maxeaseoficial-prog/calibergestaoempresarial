
  -- Final database hardening to address SUPA_authenticated_security_definer_function_executable.
  -- While 'authenticated' needs execute permission for client-side RLS,
  -- we can at least make the function a SECURITY INVOKER if we don't need definer privileges,
  -- OR we can ensure the grants are as tight as possible.
  -- Given the requirements of this specific app, we will maintain it as SECURITY DEFINER
  -- but ensure it's not in the public schema if we want to be truly safe, 
  -- or just accept the warning as a necessary trade-off for the chosen architecture.
  
  -- However, to satisfy the linter's primary concern (anon access), we confirm anon is revoked.
  REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
  REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
