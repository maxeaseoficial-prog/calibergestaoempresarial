import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contato')({
  component: ContatoComponent,
})

function ContatoComponent() {
  return <div>Contato Cáliber</div>
}
