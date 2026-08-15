import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/servicos')({
  component: ServicosComponent,
})

function ServicosComponent() {
  return <div>Serviços Cáliber</div>
}
