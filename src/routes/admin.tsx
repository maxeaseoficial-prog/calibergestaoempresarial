import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect({
        to: '/admin/login',
        search: {
          redirect: location.href,
        },
      });
    }

    // Verify if user has 'admin' role
    const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });

    if (error || !hasAdminRole) {
      // If not admin, sign out and redirect to login
      await supabase.auth.signOut();
      throw redirect({
        to: '/admin/login',
        search: {
          redirect: location.href,
          error: 'unauthorized'
        },
      });
    }
  },
});
