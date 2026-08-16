import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Save, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/atuacao')({
  component: PresenceAdmin,
});

const ALL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

function PresenceAdmin() {
  const queryClient = useQueryClient();
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const { data: servedStates, isLoading } = useQuery({
    queryKey: ['admin', 'served-states'],
    queryFn: async () => {
      const { data, error } = await supabase.from('served_states').select('id');
      if (error) throw error;
      return data.map(s => s.id);
    }
  });

  useEffect(() => {
    if (servedStates) {
      setSelectedStates(servedStates);
    }
  }, [servedStates]);

  const updateMutation = useMutation({
    mutationFn: async (newStates: string[]) => {
      // First, delete current records (except debug or non-existent)
      const { error: deleteError } = await supabase.from('served_states').delete().neq('id', 'DEBUG');
      if (deleteError) throw deleteError;
      
      const inserts = newStates.map(st => ({ 
        id: st, 
        name: st, // Required field in schema
        is_active: true 
      }));
      
      const { error: insertError } = await supabase.from('served_states').insert(inserts);
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'served-states'] });
      toast.success('Mapa atualizado com sucesso!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const toggleState = (code: string) => {
    setSelectedStates(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Atuação Nacional</h1>
          <p className="text-ink/60 mt-1">Selecione os estados onde a Cáliber está presente.</p>
        </div>
        <button 
          onClick={() => updateMutation.mutate(selectedStates)}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 bg-purple text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all cursor-pointer"
        >
          {updateMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          SALVAR ALTERAÇÕES
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-purple/10 shadow-soft">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-3">
          {ALL_STATES.map(state => {
            const isActive = selectedStates.includes(state);
            return (
              <button
                key={state}
                onClick={() => toggleState(state)}
                className={`h-12 flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-purple text-white shadow-lift' 
                    : 'bg-slate-50 text-ink/30 border border-purple/5 hover:border-purple/20'
                }`}
              >
                {state}
              </button>
            );
          })}
        </div>
        
        <div className="mt-10 p-6 rounded-2xl bg-lavender/30 border border-purple/10 flex items-start gap-4">
          <MapPin className="size-6 text-purple shrink-0 mt-1" />
          <div>
            <p className="font-bold text-ink">Total: {selectedStates.length} estados</p>
            <p className="text-sm text-ink/60 mt-1">
              Os estados selecionados aparecerão destacados com sua sigla no mapa interativo da página inicial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
