import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    // DO NOT REDIRECT if we are already going to /admin/login
    // location.pathname is just "/login" relative to /admin parent
    if (location.pathname === '/admin/login' || location.pathname === '/admin/login/') {
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect({
        to: '/admin/login' as any,
        search: {
          redirect: location.href,
        } as any,
      });
    }

    // Role check
    const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin' as any
    });

    if (error || !hasAdminRole) {
      // If they are logged in but not admin, sign them out and send to login
      await supabase.auth.signOut();
      throw redirect({
        to: '/admin/login' as any,
        search: {
          error: 'unauthorized'
        } as any,
      });
    }
  },
  component: () => <Outlet />,
});
