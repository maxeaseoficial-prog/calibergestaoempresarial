# Redesign da Seção de Metodologia (Soluções)

Reconstrução da seção "Como tornamos sua empresa mais eficiente?" como um carrossel 3D premium com cards programáticos (HTML/CSS), removendo a dependência de imagens estáticas.

## Ações Realizadas

- [x] Identificar tokens de design (cores, tipografia) no `src/styles.css`.
- [x] Redefinir os dados dos serviços em `Methodology.tsx` seguindo o novo briefing.
- [x] Reconstruir o componente `ServiceCard` usando Tailwind e Lucide Icons.
- [x] Implementar a lógica de profundidade 3D real com `framer-motion` (perspective, translateZ, scale, blur).
- [x] Reposicionar as setas de navegação para as laterais do palco dos cards.
- [x] Refinar indicadores inferiores (bullets).
- [x] Garantir responsividade e interatividade (hover, swipe mobile).

## Detalhes Técnicos

- **Cores**: Roxo oficial (`#5F5587`) e variações profundas.
- **Transições**: `cubic-bezier(0.22, 1, 0.36, 1)` com duração de 650ms.
- **Profundidade**: Perspective de 1400px com deslocamento em Z e desfoque progressivo.
- **Ícones**: Lucide Icons integrados para cada categoria.
- **Cards**: Estrutura semântica HTML (Número > Ícone > Título > Descrição).
