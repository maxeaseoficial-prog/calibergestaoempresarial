import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_admin/index')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-purple/10 shadow-soft">
        <h3 className="text-sm text-ink/60 font-medium">Clientes Cadastrados</h3>
        <p className="text-3xl font-bold text-ink mt-2">--</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-purple/10 shadow-soft">
        <h3 className="text-sm text-ink/60 font-medium">Depoimentos</h3>
        <p className="text-3xl font-bold text-ink mt-2">--</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-purple/10 shadow-soft">
        <h3 className="text-sm text-ink/60 font-medium">Estados Atendidos</h3>
        <p className="text-3xl font-bold text-ink mt-2">--</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-purple/10 shadow-soft">
        <h3 className="text-sm text-ink/60 font-medium">Serviços</h3>
        <p className="text-3xl font-bold text-ink mt-2">--</p>
      </div>
    </div>
  );
}
