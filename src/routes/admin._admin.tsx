import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { LayoutGrid, Users, MessageSquare, Briefcase, MapPin, Settings, LogOut, ExternalLink, Menu, X, Globe, Share2, Mail } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/admin/_admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate({ to: '/admin/login', search: { redirect: window.location.href } as any });
        return;
      }

      const { data: hasAdminRole } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin' as any
      });

      if (!hasAdminRole) {
        await supabase.auth.signOut();
        navigate({ to: '/admin/login', search: { error: 'unauthorized' } as any });
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple" />
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const menuGroups = [
    {
      label: 'Visão Geral',
      items: [
        { name: 'Dashboard', icon: LayoutGrid, to: '/admin' as any },
      ]
    },
    {
      label: 'Conteúdo',
      items: [
        { name: 'Clientes', icon: Users, to: '/admin/clientes' as any },
        { name: 'Serviços', icon: Briefcase, to: '/admin/servicos' as any },
        { name: 'Depoimentos', icon: MessageSquare, to: '/admin/depoimentos' as any },
        { name: 'Atuação Nacional', icon: MapPin, to: '/admin/atuacao' as any },
      ]
    },
    {
      label: 'Comunicação',
      items: [
        { name: 'Contatos e Redes', icon: Share2, to: '/admin/contatos' as any },
        { name: 'Formulário / Leads', icon: Mail, to: '/admin/formulario' as any },
      ]
    },
    {
      label: 'Site',
      items: [
        { name: 'SEO', icon: Globe, to: '/admin/seo' as any },
        { name: 'Configurações', icon: Settings, to: '/admin/configuracoes' as any },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-manrope">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-purple/10 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 mb-2">
          <div className="flex items-center gap-3">
            <Logo className="size-8" />
            <span className="font-bold text-ink tracking-tight">Cáliber Admin</span>
          </div>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="size-5 text-ink/40" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <h3 className="px-4 text-[10px] font-bold tracking-[0.2em] text-ink/30 uppercase mb-3">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-ink/60 hover:bg-purple/5 hover:text-purple transition-all"
                    activeProps={{ className: "bg-purple text-white hover:text-white shadow-lift" }}
                  >
                    <item.icon className="size-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-purple/10">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50"
          >
            <LogOut className="size-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-purple/10 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg border border-purple/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="size-5 text-ink" />
            </button>
            <h2 className="text-lg font-bold text-ink tracking-tight">Painel de Controle</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              className="hidden md:flex items-center gap-2 text-sm font-bold text-purple hover:underline underline-offset-4"
            >
              Ver site
              <ExternalLink className="size-4" />
            </a>
            <div className="h-8 w-[1px] bg-purple/10 mx-2 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-ink">Administrador</p>
                <p className="text-[10px] text-ink/40 uppercase tracking-wider">Cáliber Gestão</p>
              </div>
              <div className="size-10 rounded-full bg-lavender flex items-center justify-center text-purple font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
