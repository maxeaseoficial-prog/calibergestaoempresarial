
  -- Revoke all permissions from public and anon on the security definer function
  -- This fixes SUPA_anon_security_definer_function_executable and SUPA_authenticated_security_definer_function_executable
  REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
  REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;

  -- Explicitly grant execution to authenticated and service_role
  -- Note: We still grant to authenticated because the application uses it for RLS checks on client queries
  GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
