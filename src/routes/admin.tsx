import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ location }) => {
    // Avoid redirect loop if already on login or setup
    if (location.pathname === '/admin/login' || location.pathname === '/admin/setup') {
      return;
    }
  },
  component: () => <Outlet />,
});
