import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/clientes')({
  component: ClientsAdmin,
});

function ClientsAdmin() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', logo_url: '' });

  const { data: clients, isLoading } = useQuery({
    queryKey: ['admin', 'clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (client: typeof newClient) => {
      const { data, error } = await supabase
        .from('clients')
        .insert([{ 
          ...client, 
          is_active: true, 
          sort_order: (clients?.length || 0) + 1 
        }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'clients'] });
      setIsAdding(false);
      setNewClient({ name: '', logo_url: '' });
      toast.success('Cliente adicionado com sucesso!');
    },
    onError: (error: any) => {
      toast.error('Erro ao adicionar cliente: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'clients'] });
      toast.success('Cliente removido.');
    },
    onError: (error: any) => {
      toast.error('Erro ao remover: ' + error.message);
    }
  });

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Gestão de Clientes</h1>
          <p className="text-ink/60 mt-1">Gerencie os logotipos exibidos no site.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-purple text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          ADICIONAR LOGO
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-purple/20 shadow-soft animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-ink mb-4">Novo Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Nome da Empresa</label>
              <input 
                type="text" 
                placeholder="Ex: Leo Madeiras" 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 focus:ring-2 focus:ring-purple/20 outline-none"
                value={newClient.name}
                onChange={e => setNewClient({...newClient, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">URL do Logotipo</label>
              <input 
                type="text" 
                placeholder="https://..." 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 focus:ring-2 focus:ring-purple/20 outline-none"
                value={newClient.logo_url}
                onChange={e => setNewClient({...newClient, logo_url: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-sm font-bold text-ink/40 cursor-pointer">CANCELAR</button>
            <button 
              onClick={() => addMutation.mutate(newClient)}
              disabled={!newClient.name || !newClient.logo_url || addMutation.isPending}
              className="bg-purple text-white px-8 py-2 rounded-xl font-bold text-sm disabled:opacity-50 cursor-pointer hover:bg-purple-deep"
            >
              {addMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "SALVAR"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {clients?.map((client) => (
          <div key={client.id} className="group relative bg-white p-6 rounded-2xl border border-purple/5 shadow-soft hover:border-purple/20 transition-all flex flex-col items-center justify-center min-h-[140px]">
            <div className="h-16 flex items-center justify-center mb-4 w-full px-2">
              <img src={client.logo_url} alt={client.name} className="max-h-full max-w-full object-contain" />
            </div>
            <p className="text-xs font-bold text-ink/60 uppercase tracking-wider text-center line-clamp-1">{client.name}</p>
            
            <button 
              onClick={() => { if(window.confirm('Excluir este logotipo?')) deleteMutation.mutate(client.id) }}
              className="absolute top-2 right-2 p-2 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}

        {clients?.length === 0 && !isAdding && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-purple/10 rounded-[2rem]">
            <p className="text-ink/40 font-medium">Nenhum cliente cadastrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
