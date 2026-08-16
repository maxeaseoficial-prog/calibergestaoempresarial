import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User, Key, Shield, Loader2, Save, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/configuracoes')({
  component: SettingsAdmin,
});

function SettingsAdmin() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { data: user, isLoading } = useQuery({
    queryKey: ['admin', 'current-user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (password: string) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
    onSuccess: () => {
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Senha atualizada com sucesso!');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    updatePasswordMutation.mutate(newPassword);
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-purple" /></div>;

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Configurações da Conta</h1>
        <p className="text-ink/60 mt-1">Gerencie suas credenciais de acesso.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-purple/10 shadow-soft space-y-8">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple/5 border border-purple/10">
          <div className="size-12 rounded-full bg-purple flex items-center justify-center text-white font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-ink">{user?.email}</p>
            <p className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">Acesso Administrador</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Key className="size-4 text-purple" />
            <h3 className="font-bold text-ink">Alterar Senha</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Nova Senha</label>
              <input 
                type="password" 
                className="w-full h-12 px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase">Confirmar Nova Senha</label>
              <input 
                type="password" 
                className="w-full h-12 px-4 rounded-xl border border-purple/10 outline-none focus:ring-2 focus:ring-purple/20"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={updatePasswordMutation.isPending || !newPassword}
            className="w-full flex items-center justify-center gap-2 bg-purple text-white py-4 rounded-xl font-bold hover:shadow-lift transition-all disabled:opacity-50 cursor-pointer"
          >
            {updatePasswordMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            ATUALIZAR SENHA
          </button>
        </form>

        <div className="pt-6 border-t border-purple/10">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <Shield className="size-5 text-ink/40 shrink-0 mt-0.5" />
            <p className="text-[11px] text-ink/60 leading-relaxed">
              Sua segurança é prioridade. Utilize senhas fortes com combinações de letras, números e símbolos. Esta ação afetará apenas o seu acesso administrativo atual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
