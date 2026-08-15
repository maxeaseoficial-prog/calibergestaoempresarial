# Redesign Premium Cáliber — Eficiência em Gestão Empresarial

Implementação da nova presença digital institucional da Cáliber com design premium, editorial e moderno, focando em autoridade e eficiência.

## Design e Experiência
- **Design System:** Utilização do roxo institucional (#5F5587) com paleta derivada (deep, dark, light, lavender). Tipografia Manrope para hierarquia editorial.
- **Identidade Visual:** Uso sutil do símbolo Cáliber como marca d'água e elemento geométrico.
- **Animações:** Microinterações refinadas (reveal de texto, fade-in, staggers) usando Tailwind e framer-motion (se disponível) ou classes CSS customizadas.
- **Responsividade:** Layout adaptável de 360px a 1920px, com navegação mobile dedicada.

## Estrutura de Páginas
- **Home (`/`):**
    - **Hero:** Composição assimétrica editorial com headline impactante e fotografia corporativa.
    - **Números de Autoridade:** Faixa com métricas reais (+12 anos, 8 estados, +12k empresários).
    - **Metodologia:** Fluxo visual da abordagem (Identifique, Solucione, Gerencie).
    - **Diferenciais:** Bento Grid com os 10 diferenciais exclusivos.
    - **Depoimentos:** Seção editorial com clientes reais.
    - **Clientes/Parceiros:** Marquee suave com logos monocromáticos.
    - **Atuação Nacional:** Destaque para escritórios em Cuiabá e Curitiba.
- **Sobre (`/sobre`):** Posicionamento institucional e história real.
- **Serviços (`/servicos`):** Detalhamento da Auditoria Estratégica, Estruturação 360° e Análise e Gestão.
- **Clientes (`/clientes`):** Portfólio completo e prova social.
- **Contato (`/contato`):** Formulário completo e informações de contato institucional.

## Detalhes Técnicos
- **Stack:** TanStack Start v1 (React 19, Vite 7).
- **SEO:** Metadados específicos por rota (title, description, OG tags).
- **Acessibilidade:** HTML semântico, contraste adequado e navegação por teclado.
- **Assets:** Reutilização de logos e fotos reais recuperados do site original.
- **Componentes:** Header (transparente a sólido no scroll), Footer, CalButton, SectionHeading, etc.

## Checklist de Qualidade
- [ ] Sem conteúdo fictício ou Lorem Ipsum.
- [ ] Sem emojis ou estética SaaS genérica.
- [ ] Formulário validado (sem simulação de sucesso falsa).
- [ ] Performance otimizada (LCP prioritário).
- [ ] Zero erros de console e build de produção limpo.
