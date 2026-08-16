import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    // location.pathname for /admin/login will be "/admin/login"
    // We check if it ends with /login or is exactly /admin/login
    if (location.pathname.endsWith('/login') || location.pathname.endsWith('/login/')) {
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
