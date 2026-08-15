import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'

export const Route = createFileRoute('/contato')({
  component: ContatoComponent,
})

function ContatoComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-cal">
          <h1 className="text-4xl font-extrabold text-purple-deep lg:text-6xl">Contato</h1>
          <p className="mt-8 text-lg text-muted-foreground">Entre em contato conosco.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
