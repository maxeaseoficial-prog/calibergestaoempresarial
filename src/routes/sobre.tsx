import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { seoQueryOptions } from '@/hooks/use-seo'


export const Route = createFileRoute('/sobre')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(seoQueryOptions("/sobre"));
  },
  head: ({ loaderData }) => {
    const seo = loaderData as any;
    return {

      title: seo?.title || "Sobre a Cáliber — Eficiência em Gestão",
      meta: [
        { name: "description", content: seo?.description || "Conheça a história e os valores da Cáliber." },
      ],
    };
  },
  component: SobreComponent,
})


function SobreComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-cal">
          <h1 className="text-4xl font-extrabold text-purple-deep lg:text-6xl">Sobre a Cáliber</h1>
          <p className="mt-8 text-lg text-muted-foreground">Conteúdo institucional em breve.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
