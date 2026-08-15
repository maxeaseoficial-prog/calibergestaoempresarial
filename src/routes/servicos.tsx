import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'

export const Route = createFileRoute('/servicos')({
  component: ServicosComponent,
})

function ServicosComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-cal">
          <h1 className="text-4xl font-extrabold text-purple-deep lg:text-6xl">Nossos Serviços</h1>
          <p className="mt-8 text-lg text-muted-foreground">Detalhes das soluções em breve.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
