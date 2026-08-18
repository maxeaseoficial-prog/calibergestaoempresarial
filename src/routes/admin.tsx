import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ location }) => {
    // Basic redirect for direct /admin access to login or sub-routes
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      throw redirect({ to: '/admin/login', search: { redirect: location.pathname, error: undefined } });
    }
  },
  component: () => <Outlet />,
});
