import { createFileRoute } from '@tanstack/react-router';
import { LayoutGrid, Users, MessageSquare, Briefcase, MapPin, Settings } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const menuItems = [
    { name: 'Visão Geral', icon: LayoutGrid, to: '/admin' },
    { name: 'Clientes', icon: Users, to: '/admin/clientes' },
    { name: 'Serviços', icon: Briefcase, to: '/admin/servicos' },
    { name: 'Depoimentos', icon: MessageSquare, to: '/admin/depoimentos' },
    { name: 'Atuação Nacional', icon: MapPin, to: '/admin/atuacao' },
    { name: 'Configurações', icon: Settings, to: '/admin/configuracoes' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-purple/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Logo className="size-8" />
          <span className="font-bold text-ink">Cáliber Admin</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ink/70 hover:bg-purple/5 hover:text-purple transition-all"
              activeProps={{ className: "bg-purple text-white hover:text-white" }}
            >
              <item.icon className="size-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">
        <header className="bg-white border-b border-purple/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink">Dashboard</h1>
          <a href="/" target="_blank" className="text-sm text-purple font-semibold">Ver site</a>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
