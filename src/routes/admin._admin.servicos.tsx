import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Loader2, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/servicos')({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({ 
    title: '', 
    short_description: '', 
    icon_name: 'Briefcase',
    sort_order: 0
  });

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (service: typeof newService) => {
      const { data, error } = await supabase
        .from('services')
        .insert([{ 
          ...service, 
          is_active: true, 
          sort_order: (services?.length || 0) + 1 
        }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
      setIsAdding(false);
      setNewService({ title: '', short_description: '', icon_name: 'Briefcase', sort_order: 0 });
      toast.success('Serviço adicionado!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
      toast.success('Serviço removido.');
    }
  });

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Gestão de Serviços</h1>
          <p className="text-ink/60 mt-1">Configure os pilares de atuação da Cáliber.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-purple text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          NOVO SERVIÇO
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2rem] border border-purple/20 shadow-soft space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Título do Serviço</label>
              <input 
                type="text" 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={newService.title}
                onChange={e => setNewService({...newService, title: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Ícone (Nome Lucide)</label>
              <input 
                type="text" 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={newService.icon_name}
                onChange={e => setNewService({...newService, icon_name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Ordem</label>
              <input 
                type="number" 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={newService.sort_order}
                onChange={e => setNewService({...newService, sort_order: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-ink/40 uppercase">Descrição curta</label>
            <textarea 
              className="w-full p-4 min-h-[100px] rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20 resize-none"
              value={newService.short_description}
              onChange={e => setNewService({...newService, short_description: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-sm font-bold text-ink/40 cursor-pointer">CANCELAR</button>
            <button 
              onClick={() => addMutation.mutate(newService)}
              disabled={!newService.title || !newService.short_description || addMutation.isPending}
              className="bg-purple text-white px-10 py-2 rounded-xl font-bold text-sm disabled:opacity-50 cursor-pointer"
            >
              {addMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "ADICIONAR"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services?.map((s) => (
          <div key={s.id} className="bg-white p-8 rounded-[2rem] border border-purple/5 shadow-soft hover:border-purple/20 transition-all group relative">
            <div className="flex items-start justify-between mb-4">
              <div className="size-12 rounded-2xl bg-purple/5 flex items-center justify-center text-purple">
                {(() => {
                  const Icon = (Briefcase as any); // Fallback to Briefcase for now, logic to dynamic icons can be added
                  return <Icon className="size-6" />;
                })()}

              </div>
              <span className="text-[10px] font-bold text-ink/20">#{s.sort_order}</span>
            </div>
            <h3 className="font-bold text-ink text-lg">{s.title}</h3>
            <p className="text-sm text-ink/60 mt-3 line-clamp-3 leading-relaxed">{s.short_description}</p>
            
            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => { if(window.confirm('Excluir este serviço?')) deleteMutation.mutate(s.id) }}
                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
