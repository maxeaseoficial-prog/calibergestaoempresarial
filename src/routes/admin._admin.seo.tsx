import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Save, Loader2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/seo')({
  component: SEOAdmin,
});

function SEOAdmin() {
  const queryClient = useQueryClient();
  const [seoData, setSeoData] = useState<any[]>([]);

  const { data: seo, isLoading } = useQuery({
    queryKey: ['admin', 'seo'],
    queryFn: async () => {
      const { data, error } = await supabase.from('seo_settings').select('*');
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (seo) setSeoData(seo);
  }, [seo]);

  const updateMutation = useMutation({
    mutationFn: async (updatedSeo: any[]) => {
      for (const item of updatedSeo) {
        // Cast to any to bypass strict type checking for dynamic schema fields if needed, 
        // but seo_settings table does have title and description.
        const { error } = await supabase
          .from('seo_settings')
          .update({ 
            title: item.title, 
            description: item.description 
          } as any)
          .eq('id', item.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'seo'] });
      toast.success('Configurações de SEO atualizadas!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateField = (id: string, field: string, value: string) => {
    setSeoData(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Configurações de SEO</h1>
          <p className="text-ink/60 mt-1">Gerencie como o site aparece nos buscadores (Google).</p>
        </div>
        <button 
          onClick={() => updateMutation.mutate(seoData)}
          className="flex items-center gap-2 bg-purple text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all cursor-pointer"
        >
          <Save className="size-4" />
          SALVAR SEO
        </button>
      </div>

      <div className="space-y-6">
        {seoData.map(item => (
          <div key={item.id} className="bg-white p-8 rounded-[2rem] border border-purple/10 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-purple/5 flex items-center justify-center text-purple">
                <Search className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-ink uppercase tracking-wider text-xs">Página: {item.page_path}</h3>
                <p className="text-[10px] text-ink/40 font-bold">META TAGS</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-ink/60 uppercase">Título da Página (Meta Title)</label>
                <input 
                  type="text" 
                  className="w-full h-12 px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                  value={item.title || ''}
                  onChange={e => updateField(item.id, 'title', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-ink/60 uppercase">Descrição (Meta Description)</label>
                <textarea 
                  className="w-full p-4 min-h-[100px] rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20 resize-none"
                  value={item.description || ''}
                  onChange={e => updateField(item.id, 'description', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Prévia no Google</p>
              <p className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-1">{item.title}</p>
              <p className="text-[14px] text-[#006621] line-clamp-1">https://calibergestao.com.br{item.page_path}</p>
              <p className="text-[14px] text-[#545454] line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
