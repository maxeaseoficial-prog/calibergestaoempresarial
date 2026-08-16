import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Save, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/formulario')({
  component: LeadsSettingsAdmin,
});

function LeadsSettingsAdmin() {
  const queryClient = useQueryClient();
  const [recipientEmail, setRecipientEmail] = useState('');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin', 'site-settings', 'lead_recipient_email'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'lead_recipient_email')
        .single();
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (settings) setRecipientEmail(settings.value);
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (value: string) => {
      const { error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', 'lead_recipient_email');
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'site-settings'] });
      toast.success('Configuração salva!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Gestão de E-mail / Leads</h1>
        <p className="text-ink/60 mt-1">Configure o destino das mensagens enviadas pelo site.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-purple/10 shadow-soft space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            <strong>Importante:</strong> Este e-mail receberá todas as solicitações enviadas através do formulário "Evolua Conosco". Certifique-se de que é um endereço monitorado.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-ink flex items-center gap-2">
            <Mail className="size-4 text-purple" />
            E-mail Destinatário
          </label>
          <input 
            type="email" 
            className="w-full h-14 px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20 font-medium"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
          />
        </div>

        <button 
          onClick={() => updateMutation.mutate(recipientEmail)}
          disabled={updateMutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-purple text-white py-4 rounded-xl font-bold hover:shadow-lift transition-all disabled:opacity-50"
        >
          {updateMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          SALVAR CONFIGURAÇÃO
        </button>
      </div>
    </div>
  );
}
