import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_admin/seo')({
  component: () => <div className="p-8"><h1 className="text-2xl font-bold">Configurações de SEO</h1><p className="mt-4 text-ink/60">Interface de edição em desenvolvimento.</p></div>,
});
