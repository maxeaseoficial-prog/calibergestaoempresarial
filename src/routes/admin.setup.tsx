import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { setupAdmin, confirmUserManually } from '@/lib/setup.functions';
import { Logo } from '@/components/site/Logo';
import { Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useServerFn } from '@tanstack/react-start';

export const Route = createFileRoute('/admin/setup')({
  component: AdminSetup,
});

function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createAdmin = useServerFn(setupAdmin);
  const confirmUser = useServerFn(confirmUserManually);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createAdmin({
        data: {
          email,
          password,
        }
      });

      if (result.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Erro no setup:', err);
      setError(err.message || 'Erro ao criar administrador.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmExisting = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await confirmUser({
        data: { email: 'leonardo.froese@gmail.com' }
      });
      if (result.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao confirmar usuário.');
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
          
          <div className="flex flex-col gap-4 text-center">
            <Link to="/admin/login" className="text-xs text-ink/40 hover:text-purple transition-colors">
              Já possui uma conta? Entrar
            </Link>
            
            <button 
              type="button"
              onClick={handleConfirmExisting}
              className="text-xs text-purple/60 hover:text-purple underline cursor-pointer"
            >
              Confirmar conta leonardo.froese@gmail.com
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
