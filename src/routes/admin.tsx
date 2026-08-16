import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    // DO NOT REDIRECT if we are already going to /admin/login
    // Check if the current route being loaded is admin.login
    // We can use the context or location.
    
    // In TanStack Start/Router, beforeLoad runs for the entire branch.
    // However, if we are on /admin/login, we shouldn't trigger the redirect.
    
    // To be absolutely safe, let's just bypass if the URL contains login
    if (location.pathname.includes('/login')) {
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect({
        to: '/admin/login' as any,
      });
    }

    // Role check
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
  },
  component: () => <Outlet />,
});
