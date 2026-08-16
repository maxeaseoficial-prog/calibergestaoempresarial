import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { seoQueryOptions } from '@/hooks/use-seo'


export const Route = createFileRoute('/clientes')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(seoQueryOptions("/clientes"));
  },
  head: ({ loaderData }) => {
    const seo = loaderData as any;
    return {

      title: seo?.title || "Clientes — Cáliber",
      meta: [
        { name: "description", content: seo?.description || "Empresas que confiam na Cáliber para sua gestão." },
      ],
    };
  },
  component: ClientesComponent,
})


function ClientesComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-cal">
          <h1 className="text-4xl font-extrabold text-purple-deep lg:text-6xl">Nossos Clientes</h1>
          <p className="mt-8 text-lg text-muted-foreground">Cases de sucesso em breve.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
