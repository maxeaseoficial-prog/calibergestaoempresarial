import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clientes')({
  component: ClientesComponent,
})

function ClientesComponent() {
  return <div>Clientes Cáliber</div>
}
