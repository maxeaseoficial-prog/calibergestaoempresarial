import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    // Basic session check
    const { data: { session } } = await supabase.auth.getSession();
    
    // Only redirect to login if NOT already on the login page
    // Using endsWith to catch both /admin/login and /admin/login/
    const isLoginPage = location.pathname.endsWith('/login') || location.pathname.endsWith('/login/');
    
    if (!session && !isLoginPage) {
      throw redirect({
        to: '/admin/login' as any,
        search: {
          redirect: location.href,
        } as any,
      });
    }

    // If session exists, we do role checking (except on login page where user might be logging in)
    if (session && !isLoginPage) {
      const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin' as any
      });

      if (error || !hasAdminRole) {
        await supabase.auth.signOut();
        throw redirect({
          to: '/admin/login' as any,
          search: {
            error: 'unauthorized'
          } as any,
        });
      }
    }
  },
  component: () => <Outlet />,
});
