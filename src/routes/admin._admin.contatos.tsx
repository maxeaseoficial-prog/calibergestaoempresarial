import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Share2, Save, Loader2, Link as LinkIcon, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/contatos')({
  component: ContactsAdmin,
});

function ContactsAdmin() {
  const queryClient = useQueryClient();
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  const { data: links, isLoading } = useQuery({
    queryKey: ['admin', 'social-links'],
    queryFn: async () => {
      const { data, error } = await supabase.from('social_links').select('*');
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (links) setSocialLinks(links);
  }, [links]);

  const updateMutation = useMutation({
    mutationFn: async (updatedLinks: any[]) => {
      for (const link of updatedLinks) {
        const { error } = await supabase
          .from('social_links')
          .update({ url: link.url })
          .eq('id', link.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'social-links'] });
      toast.success('Links atualizados!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateLink = (id: string, url: string) => {
    setSocialLinks(prev => prev.map(l => l.id === id ? { ...l, url } : l));
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Contatos e Redes</h1>
          <p className="text-ink/60 mt-1">Gerencie os links de redes sociais e canais de contato.</p>
        </div>
        <button 
          onClick={() => updateMutation.mutate(socialLinks)}
          className="flex items-center gap-2 bg-purple text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all"
        >
          <Save className="size-4" />
          SALVAR LINKS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialLinks.map(link => (
          <div key={link.id} className="bg-white p-6 rounded-2xl border border-purple/10 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-purple/5 flex items-center justify-center text-purple">
                {link.platform === 'instagram' && <Instagram className="size-5" />}
                {link.platform === 'linkedin' && <Linkedin className="size-5" />}
                {link.platform === 'facebook' && <Facebook className="size-5" />}
                {['whatsapp', 'email', 'phone'].includes(link.platform) && <LinkIcon className="size-5" />}
              </div>
              <p className="font-bold text-ink uppercase tracking-wider text-xs">{link.platform}</p>
            </div>
            <input 
              type="text" 
              className="w-full h-12 px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
              value={link.url}
              onChange={e => updateLink(link.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
