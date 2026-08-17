# Plano de Implementação - Área Administrativa Cáliber

Completar a integração entre o painel administrativo e o site público, garantindo que Clientes, Serviços, Depoimentos e SEO sejam totalmente gerenciáveis via interface sem necessidade de alterações no código.

## 1. Migração e Persistência de Dados (Supabase)
Migrar todos os dados atualmente hardcoded no código para tabelas do banco de dados, garantindo que o conteúdo atual seja preservado como estado inicial.

- **Clientes:** Extrair logos de `src/lib/site-data.ts` e inserir na tabela `clients`.
- **Serviços:** Migrar descrições e títulos de `src/lib/site-data.ts` para a tabela `services`.
- **Depoimentos:** Migrar os depoimentos reais (Paulo, Michelli, Adriano) para a tabela `testimonials`.
- **SEO:** Criar registros iniciais para a rota principal (`/`) na tabela `seo_settings`.

## 2. Ajustes na Interface Administrativa (/admin)
Refinar as telas existentes para suportar o fluxo completo de CRUD e garantir estados de interface consistentes.

- **Clientes (`/admin/clientes`):**
  - Implementar upload de imagem via Supabase Storage (se disponível) ou aceitar URLs externas.
  - Adicionar campos de texto alternativo e controle de status (ativo/inativo).
  - Adicionar confirmação de exclusão.
- **Serviços (`/admin/servicos`):**
  - Ajustar formulário para incluir todos os campos necessários (título, descrição, ícone, subtítulo, ordem).
  - Garantir que a edição reflita imediatamente no carrossel 3D da home.
- **Depoimentos (`/admin/depoimentos`):**
  - Adicionar campos para Cargo/Empresa e Foto/Logo.
  - Implementar listagem visual com preview das logos.
- **SEO (`/admin/seo`):**
  - Corrigir a visualização e edição das meta tags.
  - Garantir que os campos "Título SEO" e "Meta Description" funcionem.

## 3. Integração com o Site Público
Garantir que os componentes do site consumam prioritariamente os dados do banco de dados, usando os dados hardcoded apenas como fallback seguro.

- **Componente `LogoCloud`:** Atualizar para priorizar `dbClients`.
- **Componente `Methodology`:** Sincronizar os cards com os serviços vindos do banco.
- **Componente `Testimonials`:** Integrar com a tabela de depoimentos, mantendo o layout editorial.
- **SEO Global:** Configurar o `head` no `src/routes/index.tsx` para consumir os dados dinâmicos via hook `useSeoSettings`.

## 4. Segurança e Validação
- Aplicar RLS (Row Level Security) em todas as novas tabelas.
- Garantir que apenas usuários com `app_role = 'admin'` possam realizar mutações (INSERT, UPDATE, DELETE).
- Validar formatos de arquivo e tamanhos nos uploads de imagem.

## Detalhes Técnicos
- **Frontend:** React 19, TanStack Start (Router + Query), Lucide React.
- **Backend:** Supabase (Auth, DB, RLS, Storage).
- **Hooks:** Centralizar fetching em `src/hooks/use-site-content.ts` e `src/hooks/use-seo.ts`.
- **Validação:** Zod para esquemas de formulário.
