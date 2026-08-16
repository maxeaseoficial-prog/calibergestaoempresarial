import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Logo } from '@/components/site/Logo';
import { Loader2, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Role check is handled by the parent /admin route's beforeLoad
      window.location.href = '/admin';
    } catch (err) {
      setError('Erro ao realizar login.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl sm:p-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/5 text-purple">
            <Logo className="size-10" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Área Administrativa</h1>
          <p className="mt-2 text-sm text-ink/60">Gerencie as informações do site.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@empresa.com"
              className="flex h-12 w-full rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple/20"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-ink">Senha</label>
              <button 
                type="button"
                className="text-xs font-semibold text-purple hover:underline"
                onClick={() => alert('Recuperação de senha via Lovable Cloud dashboard.')}
              >
                Esqueci minha senha
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
            {loading ? <Loader2 className="size-4 animate-spin" /> : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
