import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, Briefcase, MessageSquare, MapPin, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_admin/index')({
  component: Dashboard,
});

function StatCard({ title, value, icon: Icon, to, label }: { title: string, value: string | number, icon: any, to: string, label: string }) {
  return (
    <Link 
      to={to as any} 
      className="group relative bg-white p-6 rounded-3xl border border-purple/10 shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover:border-purple/30"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-purple/5 text-purple transition-colors group-hover:bg-purple group-hover:text-white">
          <Icon className="size-6" />
        </div>
        <ArrowUpRight className="size-5 text-ink/20 group-hover:text-purple transition-colors" />
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-bold tracking-wider text-ink/40 uppercase">{title}</h3>
        <p className="mt-2 text-3xl font-extrabold text-ink tracking-tight">{value}</p>
        <p className="mt-4 text-xs font-semibold text-purple">{label} →</p>
      </div>
    </Link>
  );
}

function Dashboard() {
  const { data: clientsCount } = useQuery({
    queryKey: ['admin', 'stats', 'clients'],
    queryFn: async () => {
      const { count } = await supabase.from('clients').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: testimonialsCount } = useQuery({
    queryKey: ['admin', 'stats', 'testimonials'],
    queryFn: async () => {
      const { count } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: statesCount } = useQuery({
    queryKey: ['admin', 'stats', 'states'],
    queryFn: async () => {
      const { count } = await supabase.from('served_states').select('*', { count: 'exact', head: true }).eq('is_active', true);
      return count || 0;
    }
  });

  const { data: servicesCount } = useQuery({
    queryKey: ['admin', 'stats', 'services'],
    queryFn: async () => {
      const { count } = await supabase.from('services').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-ink tracking-tight">Bem-vindo, Administrador</h1>
        <p className="mt-2 text-ink/60">Acompanhe as principais informações do site institucional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Clientes" 
          value={clientsCount ?? '--'} 
          icon={Users} 
          to="/admin/clientes"
          label="Gerenciar logos"
        />
        <StatCard 
          title="Depoimentos" 
          value={testimonialsCount ?? '--'} 
          icon={MessageSquare} 
          to="/admin/depoimentos"
          label="Editar depoimentos"
        />
        <StatCard 
          title="Estados Atendidos" 
          value={statesCount ?? '--'} 
          icon={MapPin} 
          to="/admin/atuacao"
          label="Configurar mapa"
        />
        <StatCard 
          title="Serviços" 
          value={servicesCount ?? '--'} 
          icon={Briefcase} 
          to="/admin/servicos"
          label="Ajustar serviços"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-purple/10 shadow-soft">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-ink tracking-tight">Acesso Rápido</h3>
            <TrendingUp className="size-5 text-purple/40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/contatos" className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-purple/20 transition-all group">
              <p className="text-sm font-bold text-ink group-hover:text-purple">Contatos e Redes</p>
              <p className="text-xs text-ink/40 mt-1">Alterar links sociais</p>
            </Link>
            <Link to="/admin/formulario" className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-purple/20 transition-all group">
              <p className="text-sm font-bold text-ink group-hover:text-purple">Configurações de E-mail</p>
              <p className="text-xs text-ink/40 mt-1">Destinatário de leads</p>
            </Link>
            <Link to="/admin/seo" className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-purple/20 transition-all group">
              <p className="text-sm font-bold text-ink group-hover:text-purple">Meta Tags SEO</p>
              <p className="text-xs text-ink/40 mt-1">Otimização de busca</p>
            </Link>
            <Link to="/admin/configuracoes" className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-purple/20 transition-all group">
              <p className="text-sm font-bold text-ink group-hover:text-purple">Perfil</p>
              <p className="text-xs text-ink/40 mt-1">Alterar senha admin</p>
            </Link>
          </div>
        </div>

        <div className="bg-purple-dark p-8 rounded-[2rem] text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-purple-light uppercase">Suporte Técnico</span>
            <h3 className="text-2xl font-extrabold mt-4 leading-tight">Precisa de ajuda com o painel?</h3>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              Estamos à disposição para ajustes técnicos, novas funcionalidades ou dúvidas sobre a gestão do CMS.
            </p>
          </div>
          <a 
            href="https://wa.me/5565981598205" 
            target="_blank"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white py-4 px-8 text-sm font-bold tracking-wider text-purple uppercase transition-all hover:bg-lavender hover:shadow-lift"
          >
            Falar com suporte
          </a>
        </div>
      </div>
    </div>
  );
}
