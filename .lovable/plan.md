# Plano de Compactação Vertical do Site Cáliber

Ajustar a densidade vertical de todas as seções para otimizar a visualização em notebooks e desktops, buscando que cada seção principal caiba em aproximadamente uma viewport quando possível, sem comprometer o conteúdo ou a legibilidade.

## Alterações Técnicas

### 1. Ajustes Globais (`SectionHeading.tsx`)
- Redução do tamanho de títulos: `clamp(2.1rem, 4.2vw, 3.6rem)` → `clamp(1.9rem, 4vw, 3.2rem)`.
- Diminuição de margens entre elementos (eyebrow, título e descrição).

### 2. Hero (`Hero.tsx`)
- Padding vertical reduzido: `pt-32 pb-20` → `pt-28 pb-12` (desktop: `pt-48 pb-32` → `pt-36 pb-20`).
- Altura mínima ajustada para `85vh` (mobile) / `90vh` (desktop) para evitar espaços mortos no rodapé da hero.

### 3. Metodologia (`Methodology.tsx`)
- Padding da seção: `py-12 lg:py-20` → `py-10 lg:py-16`.
- Dimensões do carrossel 3D reduzidas proporcionalmente (largura e altura dos cards).
- Margens internas e externas dos elementos de navegação e indicadores encurtadas.

### 4. Por que a Cáliber (`WhyCaliber.tsx`)
- Padding vertical reduzido: `py-24` → `py-16` (desktop: `py-32` → `py-24`).
- Altura mínima definida como `40vh` para manter o impacto sem ocupar espaço excessivo.

### 5. Diferenciais (`Differentiators.tsx`)
- Padding da seção: `py-20 lg:py-32` → `py-12 lg:py-20`.
- Padding interno dos cards reduzido: `p-7` → `p-6`.
- Gaps do grid e margens dos títulos reduzidos.

### 6. Impacto e CTA (`ImpactSection.tsx`, `ContactCTA.tsx`)
- Padds verticais reduzidos para enquadrar melhor o conteúdo centralizado.
- Altura mínima ajustada para evitar excesso de espaço vazio.

### 7. Depoimentos (`Testimonials.tsx`)
- Altura das molduras (frames) roxas reduzida de `24/40` para `16/24`.
- Padding da seção: `py-32 lg:py-48` → `py-20 lg:py-32`.
- Redução de gaps no grid de depoimentos e margens internas dos itens.

### 8. Clientes (`LogoCloud.tsx`)
- Padding vertical: `py-20` → `py-12 lg:py-16`.
- Margem superior da trilha do logo reduzida.

### 9. Atuação Nacional (`NationalPresence.tsx`)
- Padding vertical: `py-24 lg:py-32` → `py-16 lg:py-24`.
- Ajuste na escala do `BrazilMap` para limitar a altura máxima do SVG e evitar que empurre o rodapé da seção.

## Viewport de Referência

| Resolução | Meta de Enquadramento |
| :--- | :--- |
| **1920 × 1080** | 100% das seções cabem integralmente. |
| **1440 × 900** | ~90% das seções cabem integralmente (Diferenciais podem exigir scroll mínimo dependendo do zoom). |
| **1366 × 768** | Seções simplificadas cabem integralmente; seções densas (Diferenciais/Depoimentos) ocupam ~1.2 telas. |

## Garantias de Preservação
- **Conteúdo:** Nenhuma alteração em textos, logos ou ícones.
- **Identidade Visual:** Cores, fontes e estilo premium mantidos.
- **Funcionalidades:** Links, modais, formulários e animações 100% operacionais.
- **Mobile:** Comportamento responsivo preservado, sem forçar 100vh onde não é natural.
