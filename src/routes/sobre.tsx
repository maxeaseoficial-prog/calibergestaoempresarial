import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sobre')({
  component: SobreComponent,
})

function SobreComponent() {
  return <div>Sobre Cáliber</div>
}
