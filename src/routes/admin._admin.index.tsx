import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, Briefcase, MapPin, Loader2, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_admin/')({
  component: AdminDashboard,
});

function StatCard({ title, value, icon: Icon, to }: any) {
  return (
    <Link 
      to={to}
      className="bg-white p-8 rounded-[2rem] border border-purple/10 shadow-soft hover:shadow-lift transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="size-12 rounded-2xl bg-purple/5 flex items-center justify-center text-purple group-hover:bg-purple group-hover:text-white transition-all">
          <Icon className="size-6" />
        </div>
      </div>
      <p className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.2em] mb-1">{title}</p>
      <h3 className="text-3xl font-black text-ink">{value}</h3>
    </Link>
  );
}

function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [clients, services, testimonials, states] = await Promise.all([
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('served_states').select('id', { count: 'exact', head: true }),
      ]);

      return {
        clients: clients.count || 0,
        services: services.count || 0,
        testimonials: testimonials.count || 0,
        states: states.count || 0,
        lastUpdate: new Date().toLocaleString('pt-BR')
      };
    }
  });

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-ink tracking-tight">Bem-vindo ao Cáliber Admin</h1>
        <p className="text-ink/60 mt-2">Visão geral do conteúdo do seu site.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Clientes" value={stats?.clients} icon={Users} to="/admin/clientes" />
        <StatCard title="Serviços" value={stats?.services} icon={Briefcase} to="/admin/servicos" />
        <StatCard title="Depoimentos" value={stats?.testimonials} icon={MessageSquare} to="/admin/depoimentos" />
        <StatCard title="Estados" value={stats?.states} icon={MapPin} to="/admin/atuacao" />
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-purple/10 shadow-soft">
        <div className="flex items-center gap-3 mb-8">
          <div className="size-10 rounded-xl bg-purple/5 flex items-center justify-center text-purple">
            <Clock className="size-5" />
          </div>
          <div>
            <h3 className="font-bold text-ink">Atalhos Rápidos</h3>
            <p className="text-xs text-ink/40">Ações frequentes de gerenciamento.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Gerenciar Clientes', to: '/admin/clientes' },
            { label: 'Editar Contatos', to: '/admin/contatos' },
            { label: 'Editar Serviços', to: '/admin/servicos' },
            { label: 'Configurar Leads', to: '/admin/formulario' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to as any}
              className="flex items-center justify-center px-6 py-4 rounded-xl border border-purple/5 bg-slate-50 text-xs font-bold text-ink hover:bg-purple hover:text-white hover:border-purple transition-all text-center"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-purple/5 flex items-center justify-between text-[10px] font-bold text-ink/30 uppercase tracking-widest">
          <span>Sistema Cáliber v1.0</span>
          <span>Última consulta: {stats?.lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}
