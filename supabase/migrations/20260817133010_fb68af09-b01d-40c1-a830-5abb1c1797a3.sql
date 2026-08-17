-- Policy to allow the very first admin to be created if no admins exist
-- Or simply allow insertion for new users if they don't have a role yet
CREATE POLICY "Allow first admin creation"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
  OR public.has_role(auth.uid(), 'admin')
);

-- Grant insert on user_roles to authenticated users so setup page works
GRANT INSERT ON public.user_roles TO authenticated;
