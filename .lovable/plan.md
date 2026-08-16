# Plano de Implementação - Modal de Detalhes dos Serviços

Adicionar uma experiência de modal premium para detalhamento dos serviços ao clicar no card ativo da seção "Nossas Soluções" (Methodology), mantendo a integridade do carrossel atual.

## Alterações Técnicas

### 1. Novo Componente de Modal
- Criar `src/components/site/ServiceDetailsModal.tsx` utilizando `motion/react` para animações.
- **Estrutura**: Backdrop com desfoque (8px), container centralizado com largura de 850px-1000px (desktop) e responsivo.
- **Animações**: Opacidade (0 -> 1), escala (0.96 -> 1), e translação vertical (15px -> 0) com easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Funcionalidades**: Botão fechar (X), fechar ao clicar fora, fechar com ESC, bloqueio de scroll do body.

### 2. Integração no Carrossel (`Methodology.tsx`)
- Adicionar estado `selectedServiceId` para controlar qual modal está aberto.
- Modificar o `onClick` do card para que, se `isActive` for verdadeiro, abra o modal em vez de apenas centralizar (o comportamento de centralizar cards laterais será mantido).
- Adicionar indicação visual "Ver detalhes →" no hover do card ativo (desktop).
- Inserir o componente `ServiceDetailsModal` no final do JSX da seção.

### 3. Conteúdo dos Modais
- **01 - Comercial**: Introdução, pilares (Processos, Pessoas, Ferramentas), sequência visual de 4 etapas, bloco de autoridade (+450 empresas, +R$ 100M lucro).
- **02 - Financeira**: Introdução, pilares (Processos, Pessoas, Ferramentas, Indicadores), sequência visual de 4 etapas, destaques de resultados.
- **03 - Conselho**: Introdução, frequência (Mensal/Trimestral), sequência visual de 4 etapas, bloco de autoridade, e bloco final (Prioridade, Responsável, Prazo).
- **04 - Cáliber COR**: Sem modal (preparado tecnicamente, mas desativado).

## Design e Identidade
- Reutilizar tokens de cor: `--caliber-purple`, `--caliber-purple-deep`, `--caliber-text`.
- Tipografia: Manrope (padrão do site).
- Ícones: Lucide (já instalada).

## Arquivos Afetados
- `src/components/site/Methodology.tsx` (Integração e gatilhos).
- `src/components/site/ServiceDetailsModal.tsx` (Novo componente).
