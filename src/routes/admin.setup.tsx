import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Logo } from '@/components/site/Logo';
import { Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/admin/setup')({
  component: AdminSetup,
});

function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Não foi possível criar o usuário.');

      // 2. Assign the admin role
      // Note: This relies on the service_role or a trigger if RLS prevents insertion.
      // In Lovable Cloud, we usually have a function or the user can be granted manually, 
      // but for this setup we'll try to insert directly. 
      // If it fails due to RLS, the user will need to use the SQL editor or wait for manual grant.
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'admin'
        });

      if (roleError) {
        console.error('Erro ao atribuir role:', roleError);
        setError('Usuário criado, mas houve um erro ao atribuir a permissão de administrador. Verifique as permissões no banco de dados.');
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar administrador.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl sm:p-12 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 mx-auto">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Admin Criado!</h1>
          <p className="mt-4 text-sm text-ink/60">
            O usuário administrador foi criado com sucesso. Agora você pode acessar o painel.
          </p>
          <Link
            to="/admin/login"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-purple py-4 text-sm font-bold tracking-wider text-white uppercase transition-all hover:bg-purple-deep"
          >
            IR PARA LOGIN <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl sm:p-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/5 text-purple">
            <Logo className="size-10" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Configurar Admin</h1>
          <p className="mt-2 text-sm text-ink/60">Crie a primeira conta de administrador do site.</p>
        </div>

        <form onSubmit={handleCreateAdmin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              className="flex h-12 w-full rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              className="flex h-12 w-full rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple/20"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple py-4 text-sm font-bold tracking-wider text-white uppercase transition-all hover:bg-purple-deep hover:shadow-lift disabled:opacity-70"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : "CRIAR ADMINISTRADOR"}
          </button>
          
          <div className="text-center">
            <Link to="/admin/login" className="text-xs text-ink/40 hover:text-purple transition-colors">
              Já possui uma conta? Entrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
