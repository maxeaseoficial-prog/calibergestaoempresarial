import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock } from 'lucide-react';
import { Logo } from '@/components/site/Logo';

export const Route = createFileRoute('/admin/login')({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search['redirect'] as string) || undefined,
    error: (search['error'] as string) || undefined,
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { error: searchError } = Route.useSearch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(searchError === 'unauthorized' ? 'Acesso não autorizado. Use uma conta administrativa.' : null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password
      });

      if (error) {
        setError('E-mail ou senha inválidos.');
        setLoading(false);
        return;
      }

      console.log("[AdminLogin] Login successful, user ID:", data.user?.id);

      // Force session persistence check
      const { data: { session } } = await supabase.auth.getSession();
      
      // Small delay to ensure session is stored in all contexts
      await new Promise(r => setTimeout(r, 800));
      
      // Explicitly navigate to /admin/ (the pathless layout parent)
      window.location.replace('/admin/');
    } catch (err) {
      console.error("[AdminLogin] Unexpected error:", err);
      setError('Ocorreu um erro inesperado. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Logo className="h-16 w-auto" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Área Administrativa</h1>
          <p className="text-sm text-slate-500">Acesse o painel de controle da Cáliber</p>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email text-slate-700">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@caliber.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-200 focus:border-purple focus:ring-purple"
                  autoComplete="email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password text-slate-700">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-slate-200 focus:border-purple focus:ring-purple"
                  autoComplete="current-password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple hover:bg-purple-dark text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    ENTRAR
                  </>
                )}
              </Button>

              <div className="mt-4 text-center">
                <Link 
                  to="/admin/setup" 
                  className="text-xs text-slate-400 hover:text-purple transition-colors"
                >
                  Configurar primeiro acesso
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Cáliber Eficiência em Gestão. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
