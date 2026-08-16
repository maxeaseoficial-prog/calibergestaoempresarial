import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Loader2, Edit3 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/depoimentos')({
  component: TestimonialsAdmin,
});

function TestimonialsAdmin() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ 
    author_name: '', 
    author_role: '', 
    content: '', 
    rating: 5 
  });

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['admin', 'testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (testimonial: typeof newTestimonial) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{ 
          ...testimonial, 
          is_active: true, 
          sort_order: (testimonials?.length || 0) + 1 
        }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
      setIsAdding(false);
      setNewTestimonial({ author_name: '', author_role: '', content: '', rating: 5 });
      toast.success('Depoimento adicionado!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
      toast.success('Removido com sucesso.');
    }
  });

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Gestão de Depoimentos</h1>
          <p className="text-ink/60 mt-1">Controle as avaliações que aparecem na home.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-purple text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          NOVO DEPOIMENTO
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2rem] border border-purple/20 shadow-soft space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Nome do Autor</label>
              <input 
                type="text" 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={newTestimonial.author_name}
                onChange={e => setNewTestimonial({...newTestimonial, author_name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Cargo / Empresa</label>
              <input 
                type="text" 
                className="h-12 w-full px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={newTestimonial.author_role}
                onChange={e => setNewTestimonial({...newTestimonial, author_role: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-ink/40 uppercase">Conteúdo do Depoimento</label>
            <textarea 
              className="w-full p-4 min-h-[120px] rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20 resize-none"
              value={newTestimonial.content}
              onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-sm font-bold text-ink/40">CANCELAR</button>
            <button 
              onClick={() => addMutation.mutate(newTestimonial)}
              disabled={!newTestimonial.author_name || !newTestimonial.content || addMutation.isPending}
              className="bg-purple text-white px-10 py-2 rounded-xl font-bold text-sm disabled:opacity-50"
            >
              {addMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "PUBLICAR"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials?.map((t) => (
          <div key={t.id} className="bg-white p-8 rounded-[2rem] border border-purple/5 shadow-soft hover:border-purple/20 transition-all relative group">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < t.rating ? "text-amber-400" : "text-slate-200"}>★</span>
              ))}
            </div>
            <p className="text-ink/80 italic leading-relaxed mb-6">"{t.content}"</p>
            <div>
              <p className="font-bold text-ink">{t.author_name}</p>
              <p className="text-xs text-ink/40 font-bold uppercase tracking-wider mt-1">{t.author_role}</p>
            </div>
            
            <button 
              onClick={() => { if(window.confirm('Excluir este depoimento?')) deleteMutation.mutate(t.id) }}
              className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
