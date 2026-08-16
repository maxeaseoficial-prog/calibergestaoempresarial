# Planejamento: Área Administrativa Cáliber

Criação de um mini CMS premium e seguro para gestão de conteúdo institucional da Cáliber, utilizando a infraestrutura do Lovable Cloud (Supabase).

## 1. Arquitetura e Segurança
- **Autenticação**: Supabase Auth (Email/Senha).
- **Autorização**: Tabela `user_roles` e função `has_role` para controle de acesso administrativo via RLS.
- **Segurança**: Políticas RLS estritas em todas as tabelas. GRANTs explícitos para `authenticated` e `service_role`.
- **Secrets**: Destinatário de leads e chaves de API permanecem exclusivamente no servidor.

## 2. Estrutura do Banco de Dados (Migrations)
- `site_settings`: Configurações gerais (nome, contatos, destinatário de e-mail).
- `social_links`: Gestão de redes sociais (URL, status ativo).
- `clients`: Logos e dados dos clientes do carrossel.
- `services`: Conteúdo dos cards de serviços.
- `testimonials`: Gestão de depoimentos.
- `served_states`: Estados ativos no mapa do Brasil.
- `user_roles`: Controle de papéis administrativos.

## 3. Rotas Administrativas (`/admin`)
- `/admin/login`: Login premium minimalista.
- `/admin`: Dashboard (Visão Geral).
- `/admin/contatos`: Redes sociais e contatos.
- `/admin/formulario`: Configuração do formulário de leads.
- `/admin/clientes`: Gestão das logos (CRUD + Reordenação).
- `/admin/servicos`: Edição dos cards de serviços.
- `/admin/depoimentos`: Gestão de depoimentos.
- `/admin/atuacao`: Mapa de estados atendidos.
- `/admin/seo`: Meta tags e OG Data.
- `/admin/configuracoes`: Perfil e senha.

## 4. Integração Frontend
- Refatoração dos componentes públicos para consumir dados via Supabase Client (com fallback para os dados atuais em `site-data.ts`).
- Backend (Server Functions) consultando o banco para definir o destinatário real do Resend.

## Detalhes Técnicos
- Utilização de `tanstack-start` para rotas e server functions.
- `framer-motion` para animações no painel.
- `sonner` para notificações.
- `lucide-react` para iconografia.

## Ações Iniciais
1. Criar migrações de banco de dados.
2. Configurar o primeiro usuário administrador via dashboard do Lovable Cloud.
3. Implementar a rota de login e layout base do admin.
