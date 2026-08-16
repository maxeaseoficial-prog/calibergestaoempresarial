import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_admin/depoimentos')({
  component: () => <div className="p-8"><h1 className="text-2xl font-bold">Gestão de Depoimentos</h1><p className="mt-4 text-ink/60">Interface de edição em desenvolvimento.</p></div>,
});
