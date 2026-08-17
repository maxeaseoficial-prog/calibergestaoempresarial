import { createFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { LayoutGrid, Users, MessageSquare, Briefcase, MapPin, Settings, LogOut, ExternalLink, Menu, X, Globe, Share2, Mail, Loader2 } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/admin/_admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setLoading(false);
          setAuthError('Sessão não encontrada no cliente.');
          return;
        }

        const { data: roles, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin');

        const hasAdminRole = roles && roles.length > 0;

        if (roleError || !hasAdminRole) {
          setLoading(false);
          setAuthError(`Permissão negada. Papel 'admin' não encontrado para este usuário.`);
          return;
        }

        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setAuthError(`Erro inesperado: ${err.message}`);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const navItems = [
    { label: 'Visão Geral', icon: LayoutGrid, href: '/admin' },
    { label: 'Contatos / Leads', icon: Users, href: '/admin/contatos' },
    { label: 'Clientes', icon: UserCheck, href: '/admin/clientes' },
    { label: 'Serviços', icon: Briefcase, href: '/admin/servicos' },
    { label: 'Depoimentos', icon: MessageSquare, href: '/admin/depoimentos' },
    { label: 'Atuação Nacional', icon: MapPin, href: '/admin/atuacao' },
    { label: 'SEO', icon: Globe, href: '/admin/seo' },
    { label: 'Configurações', icon: Settings, href: '/admin/configuracoes' },
  ];

  if (authError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
        <div className="text-red-600 font-bold mb-4 text-xl">Erro de Acesso</div>
        <div className="text-slate-600 mb-8 max-w-md text-center">{authError}</div>
        <Button onClick={() => window.location.href = '/admin/login'} className="bg-purple text-white">
          Voltar para Login
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-r border-slate-200">
        <div className="p-6">
          <Logo className="h-10 w-auto" />
        </div>
        <nav className="flex-1 px-4 space-y-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href as any}
              activeOptions={{ exact: item.href === '/admin' }}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                "&.active]:bg-purple/10 [&.active]:text-purple"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair do Painel
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <Logo className="h-8 w-auto" />
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Top Header Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900 capitalize">
            {navItems.find(item => window.location.pathname === item.href || (item.href !== '/admin' && window.location.pathname.startsWith(item.href)))?.label || 'Painel de Controle'}
          </h1>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-slate-500 hover:text-purple flex items-center transition-colors">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between border-b border-slate-200">
              <Logo className="h-8 w-auto" />
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href as any}
                  activeOptions={{ exact: item.href === '/admin' }}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    "text-slate-600",
                    "[&.active]:bg-purple/10 [&.active]:text-purple"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-slate-200">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sair
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

// Separate icon imports to avoid missing lucide-react names
import { UserCheck } from 'lucide-react';
