# Cáliber Elevate

# PROJETO: NOVO SITE INSTITUCIONAL CÁLIBER

Crie um redesign completo, premium, moderno e altamente refinado para o site institucional da **Cáliber — Eficiência em Gestão Empresarial**.

O objetivo NÃO é fazer apenas uma landing page bonita.

O objetivo é construir a nova presença digital institucional da Cáliber, com aparência de uma empresa de consultoria e gestão empresarial consolidada, sofisticada, confiável e de alto nível.

O resultado deve parecer desenvolvido por uma agência digital premium, com direção de arte própria, excelente hierarquia tipográfica, fotografia corporativa de alto nível, composição editorial, microinterações refinadas e animações elegantes.

O site NÃO pode parecer:

* template genérico;
* site gerado por IA;
* startup SaaS;
* agência de marketing digital;
* landing page de infoproduto;
* interface cheia de gradientes neon;
* dashboard;
* site excessivamente futurista.

A sensação desejada é:

**estratégia + autoridade + gestão + execução + eficiência + sofisticação.**

---

# 1. REFERÊNCIA DE CONTEÚDO

O site atual da Cáliber é a fonte de verdade para conteúdo institucional:

https://calibergestao.com.br/

Preservar as informações institucionais, serviços, números, diferenciais, depoimentos, clientes, endereços e formas de contato existentes.

NÃO inventar:

* números;
* cases;
* depoimentos;
* clientes;
* prêmios;
* certificações;
* serviços;
* pessoas;
* escritórios;
* resultados;
* estatísticas;
* parceiros.

Não substituir textos reais por Lorem Ipsum.

Não criar conteúdo corporativo fictício apenas para preencher layout.

Podem ser feitos apenas pequenos ajustes de capitalização, quebra de linha e hierarquia visual quando necessários para apresentação.

---

# 2. IDENTIDADE DA MARCA

A identidade visual deve nascer da marca original Cáliber.

## Cor principal

Utilizar aproximadamente:

`#5F5587`

como roxo institucional principal.

Não substituir o roxo Cáliber por violeta neon.

Criar uma família visual derivada dessa cor.

Sugestão inicial de tokens:

```css
--caliber-purple: #5F5587;
--caliber-purple-deep: #302A49;
--caliber-purple-dark: #1C1928;
--caliber-purple-light: #8D83B3;
--caliber-lavender: #F1EFF6;
--caliber-background: #FAFAFC;
--caliber-white: #FFFFFF;
--caliber-text: #17151D;
--caliber-muted: #6F6B78;
--caliber-border: rgba(95, 85, 135, 0.14);
```

Ajustes finos podem ser realizados se necessários para contraste e acessibilidade.

## Gradientes

Gradientes são permitidos e desejados, mas devem utilizar a própria família da marca.

Exemplos:

`#302A49 → #5F5587`

`#5F5587 → #8176AA`

ou gradientes radiais extremamente suaves derivados dessas cores.

NÃO utilizar gradientes azul-neon, rosa-neon ou arco-íris.

O gradiente deve transmitir profundidade e sofisticação, não estética gamer/crypto/IA.

---

# 3. LOGOTIPO E SÍMBOLO CÁLIBER

Usar o logotipo original fornecido como referência.

Não redesenhar a marca.

Não substituir por texto genérico.

O símbolo Cáliber pode ser utilizado como elemento gráfico secundário de identidade:

* marca d'água;
* máscara;
* recorte;
* textura geométrica;
* detalhe de fundo;
* elemento de transição entre seções.

Usar isso com bastante sutileza.

Uma possibilidade é ter versões gigantes e parcialmente cortadas do símbolo no background de algumas seções, com `opacity` muito baixa.

Isso deve fazer o site parecer inequivocamente Cáliber, e não um template que recebeu outra logo.

---

# 4. DIREÇÃO DE ARTE

A direção deve combinar:

* editorial corporativo premium;
* consultoria empresarial;
* arquitetura contemporânea;
* fotografia sofisticada;
* grandes áreas de respiro;
* grids bem definidos;
* contraste entre branco e roxo profundo;
* cards refinados;
* tipografia forte;
* detalhes geométricos inspirados no símbolo da Cáliber.

Utilizar as referências visuais fornecidas pelo usuário como inspiração de:

* composição;
* proporção;
* hierarquia;
* fotografia;
* cards;
* números;
* CTAs;
* seções de contraste;
* movimento.

NÃO copiar literalmente nenhum dos layouts de referência.

Criar uma linguagem própria da Cáliber.

---

# 5. TIPOGRAFIA

Escolher uma tipografia moderna, elegante e altamente legível.

Preferência por uma sans-serif premium/contemporânea disponível para web.

Sugestões aceitáveis:

* Manrope;
* Inter;
* Plus Jakarta Sans;
* DM Sans;
* Geist;
* outra equivalente se houver justificativa visual.

Evitar fontes futuristas.

Headlines devem ter presença editorial.

Usar pesos e tamanhos, e não dezenas de cores, para construir hierarquia.

Desktop:

Hero H1 aproximadamente `clamp(3.8rem, 6vw, 6.5rem)` conforme composição.

Mobile:

Hero deve continuar impactante sem quebrar palavras de maneira ruim.

Usar `text-wrap: balance` quando apropriado.

Números importantes podem usar `font-variant-numeric: tabular-nums`.

---

# 6. GRID E LAYOUT

Desktop deve trabalhar com container máximo aproximadamente entre 1280px e 1440px.

Usar grid consistente.

Muito espaço negativo.

Não colocar tudo dentro de pequenos cards.

Misturar:

* conteúdo editorial;
* imagens grandes;
* cards;
* números;
* faixas;
* layouts assimétricos controlados.

A página deve possuir ritmo.

Algumas seções devem ser amplas e minimalistas.

Outras podem ser densas.

Não repetir a fórmula:

`título + quatro cards`

em todas as seções.

---

# 7. HEADER / NAVEGAÇÃO

Criar header premium, limpo e responsivo.

Desktop:

Logo Cáliber à esquerda.

Navegação central ou centro-direita:

* Início
* Sobre
* Serviços
* Clientes
* Área do Cliente
* Contato

Área do Cliente pode possuir dropdown quando necessário para:

* Central de Recursos Cáliber
* Cadastro de Indicação

CTA destacado:

**Fale com um Especialista**

O CTA deve utilizar o roxo institucional.

## Comportamento

No topo do hero, header pode ser transparente ou muito leve dependendo da imagem escolhida.

Depois do scroll:

* fundo branco/translúcido;
* `backdrop-filter` sutil;
* pequena sombra ou border inferior;
* transição suave.

Não exagerar no efeito glassmorphism.

## Mobile

Criar navegação mobile própria.

Menu acessível, confortável e bem organizado.

Não simplesmente comprimir o menu desktop.

---

# 8. HERO — PRINCIPAL MOMENTO VISUAL

O hero deve ser o elemento visual mais forte da página.

Evitar hero genérico centralizado com título, parágrafo e botão sobre gradiente.

Criar uma composição editorial assimétrica.

## Conteúdo

Eyebrow:

**TRANSFORME-SE**

Headline:

**É hora de levar sua empresa ao próximo nível**

Descrição:

**Um trabalho único e completamente prático, com sistema que combina técnicas de gestão, processos, finanças, estoques, produção, compras, logística, comercial, estratégias, pessoas, sistemas e mais de uma década de experiência, para evoluir sua empresa.**

CTA:

**EVOLUA CONOSCO**

Criar um segundo acesso discreto, se fizer sentido:

**Conheça a Cáliber**

## Composição

Desktop:

aproximadamente 45% conteúdo / 55% imagem, podendo quebrar essa proporção para melhorar a direção de arte.

Usar uma fotografia premium relacionada a:

* negócios;
* liderança;
* gestão;
* operação empresarial;
* arquitetura corporativa contemporânea;
* equipe executiva;
* reunião estratégica.

Não usar fotos clichês de aperto de mãos.

Não usar imagens com aparência explícita de banco de imagens barato.

A imagem pode ter máscara ou recorte sutil inspirado no símbolo da Cáliber.

## Elemento flutuante

Sobre a composição visual, usar no máximo 1 ou 2 indicadores.

Por exemplo:

**+12 anos**
de experiência no mercado brasileiro

Evitar excesso de floating cards.

## Background

Off-white/branco com iluminação roxa extremamente suave.

Pode existir um grande elemento abstrato derivado do símbolo Cáliber.

---

# 9. ANIMAÇÃO DO HERO

Ao carregar:

1. eyebrow aparece;
2. headline entra em reveal por linha;
3. descrição aparece suavemente;
4. CTAs entram;
5. imagem é revelada por máscara;
6. indicador flutuante entra com pequeno atraso.

Usar stagger elegante.

Nada deve “pular”.

Nada de bounce.

Nada de animação exagerada.

Imagem pode realizar scale de aproximadamente `1.03 → 1` durante a entrada.

---

# 10. FAIXA DE AUTORIDADE / NÚMEROS

Logo após o hero, criar uma faixa visual premium contendo os números reais apresentados pela Cáliber.

Destaques:

**+12 anos**
de experiência

**8 estados**
com clientes atendidos

**+12.000**
empresários e colaboradores transformados

**R$ 1,1 bilhão**
em faturamento dos clientes

Apresentar como prova de autoridade.

Pode ser uma superfície branca elevada sobre a transição do hero ou uma faixa roxa profunda.

Não inventar novos números.

## Animação

Números podem utilizar count-up somente quando entrarem no viewport.

Executar uma única vez.

Sem efeitos chamativos.

---

# 11. SEÇÃO — COMO TORNAMOS SUA EMPRESA MAIS EFICIENTE?

Criar uma seção editorial forte.

Eyebrow:

**NOSSA ABORDAGEM**

Headline:

**Como tornamos sua empresa mais eficiente?**

Apresentar três pilares:

### 01

**IDENTIFIQUE OS PROBLEMAS**

### 02

**SOLUCIONE**

### 03

**GERENCIE E EVOLUA**

Não criar três cards genéricos iguais.

Preferência:

layout horizontal progressivo no desktop, com linha ou trajetória visual conectando as etapas.

No mobile, transformar em sequência vertical.

A progressão pode possuir animação conforme scroll.

---

# 12. SEÇÃO — METODOLOGIA / SOLUÇÕES

Esta deve ser uma das seções mais marcantes da página.

Apresentar:

### AUDITORIA ESTRATÉGICA

**Entenda o que está errado ou precisa melhorar nos seus processos, controles, equipes, ferramentas, gestão e estratégias.**

### ESTRUTURAÇÃO 360° NA PRÁTICA

**Implemente todas as mudanças na prática e ganhe eficiência em todos os departamentos e na sua gestão.**

### ANÁLISE E GESTÃO

**Conheça os seus números, antecipe e evite problemas, alcance seu potencial e tenha suporte, acompanhamento e orientação em toda a sua operação e gestão.**

## Experiência visual

No desktop, considerar:

* lado esquerdo sticky;
* lado direito com as três etapas;
* cada etapa ocupando uma parte significativa do viewport;
* indicador `01 / 02 / 03`;
* fotografia/contexto visual mudando conforme a etapa.

Outra solução premium equivalente é aceitável.

No mobile:

não usar sticky complexo.

Transformar em fluxo vertical natural.

---

# 13. SEÇÃO — DA OPERAÇÃO À GESTÃO

Criar uma seção institucional de respiro.

Headline baseada no conteúdo existente:

**Leve a transformação para a sua empresa**

Texto:

**Conte com muito mais do que uma consultoria, e sim uma plataforma completa e prática, da Operação à Gestão, com uma equipe dedicada a tornar sua empresa melhor todos os dias.**

Composição:

imagem grande + texto editorial.

Utilizar uma fotografia que comunique empresa real, estratégia e execução.

Adicionar uma pequena assinatura visual:

**DA OPERAÇÃO À GESTÃO**

como conceito recorrente da marca.

---

# 14. SEÇÃO — POR QUE A CÁLIBER?

Eyebrow:

**POR QUE A CÁLIBER?**

Headline:

**Somos especialistas em eficiência e inovação.**

Complemento:

**Ser cliente Cáliber é ter um parceiro da operação à gestão para a sua empresa crescer cada dia mais.**

Esta seção deve estabelecer autoridade antes dos diferenciais.

Pode usar fundo roxo profundo.

Texto branco.

Imagem ou composição abstrata com símbolo da marca.

Incluir de maneira elegante:

**Central de Atendimento**
+55 (65) 2127-4718

---

# 15. DIFERENCIAIS EXCLUSIVOS

Eyebrow:

**DIFERENCIAIS EXCLUSIVOS**

Headline:

**O que só a Cáliber faz por você**

Usar exatamente os diferenciais existentes:

1. Resultado na Prática
2. Exclusividade — Método CBR
3. Experiência
4. Autoridade em Gestão
5. Personalizado para Você
6. Evolução
7. Especialidade no Assunto
8. Transparência e Pontualidade
9. Suporte Exclusivo
10. Garantia de Continuidade e Evolução

Preservar o conteúdo textual existente de cada diferencial.

## Layout

NÃO criar dez cards idênticos.

Criar um **Bento Grid editorial** com diferentes proporções.

Dar maior destaque a:

* Resultado na Prática;
* Método CBR;
* Experiência;
* Autoridade em Gestão.

Os demais podem ter dimensões menores.

Cards devem usar:

* fundo branco ou lavanda extremamente clara;
* borda discreta;
* ícones SVG lineares;
* bastante espaço;
* hierarquia tipográfica.

No hover:

* pequeno deslocamento;
* border roxa;
* background levemente alterado;
* ícone reage discretamente.

Nada de glow.

---

# 16. SEÇÃO DE IMPACTO

Criar uma quebra visual forte em roxo escuro/degradê.

Mensagem:

**Alavanque seus RESULTADOS.**
**Transforme seu negócio.**

Complemento:

**A Solução Definitiva para a sua Empresa**

CTA:

**EVOLUA CONOSCO**

Pode utilizar tipografia muito grande e composição gráfica derivada do símbolo Cáliber.

Esta seção deve funcionar como grande momento de conversão no meio/final da página.

---

# 17. DEPOIMENTOS

Título:

**Depoimentos**

Utilizar os três depoimentos reais existentes.

### Paulo Willemann

Proprietário

“A Cáliber tem nos ajudado a organizar e otimizar nossa gestão de estoque, com definições e aprimoramentos de processos internos ajustando de maneira eficiente nosso MRP, melhorando nosso controle de estoque e automaticamente melhorando o atendimento aos nossos clientes que é o que realmente importa no final.”

### Michelli Freire

Gestora Contábil

“Conhecia o trabalho da Cáliber maneira superficial, então fiquei muito surpresa com o resultado do projeto. Achei tudo de uma competência muito grande, desde o início da negociação à entrega. Todos os colaboradores foram muito organizados, competentes e eficazes.”

### Adriano Ghilardi

Proprietário

“A parceria com a Cáliber foi muito promissora para a empresa, pois com as ferramentas e treinamentos que recebemos conseguimos padronizar muitos processos na empresa além de ter maior controle dos custos, fluxo de caixa, estoque, entre outros relatórios. A empresa ficou mais aprimorada para poder crescer sem perder o foco no que realmente faz.”

Se as fotografias originais dos depoentes estiverem disponíveis no site existente, preservá-las.

Não gerar rostos fictícios.

## Layout

Desktop:

um depoimento principal grande e navegação elegante para os demais.

Ou composição editorial equivalente.

Não fazer três pequenos cards genéricos.

Aspas podem ser elemento gráfico.

Não usar estrelas em excesso.

---

# 18. CLIENTES E PARCEIROS

Eyebrow:

**ALGUMAS DAS EMPRESAS QUE CONFIAM NO NOSSO TRABALHO**

Headline:

**Parceiros & Clientes**

Preservar os logos/clientes reais existentes, incluindo quando disponíveis:

* Claro
* NET
* Megasom
* Leo Madeiras
* Procria
* LEGO
* Maxvinil
* Tupperware
* Águas de Sorriso
* Aliança
* Campo Solar
* Cobertura Imasa
* Eletricidade Paraense
* Fatex
* Frota
* Octech
* Pantanal
* Tempermat
* Prime Lente / Gradual
* Trevo

Não inventar logos adicionais.

Não criar “Microsoft”, “Google”, “Amazon” etc. apenas porque aparecem nas referências de design.

## Visual

Preferir logos monocromáticos ou neutralizados inicialmente.

No hover, permitir transição sutil.

Pode haver marquee lento e contínuo, desde que:

* não seja rápido;
* pause ou seja controlável;
* não prejudique acessibilidade;
* respeite `prefers-reduced-motion`.

---

# 19. ATUAÇÃO NACIONAL

Criar seção:

**Atendemos todo o Brasil.**

Texto:

**Será um enorme prazer recebê-lo ou visitá-lo para tomar um café e conversarmos sobre novas formas de gerar eficiência e rentabilidade para o seu negócio.**

Criar uma composição elegante que comunique atuação nacional.

Pode utilizar mapa abstrato do Brasil de forma discreta.

Não inventar cidades atendidas.

Destacar os escritórios existentes:

### Cuiabá | MT

Av. Miguel Sutil, 8000
Santa Rosa Tower

### Curitiba | PR

Av. Sete de Setembro, 4990
Edifício New Orleans | Batel

---

# 20. CTA FINAL

Criar um dos elementos mais bonitos da página.

Fundo roxo profundo com gradiente sutil.

Headline sugerida usando conceitos existentes:

**Sua empresa pode evoluir mais.**

Complemento baseado na proposta da marca:

**Fale com um especialista e descubra novas formas de gerar eficiência e rentabilidade para o seu negócio.**

CTA:

**Fale com um Especialista**

O CTA deve levar ao canal real existente.

Não inventar WhatsApp.

Utilizar o destino atualmente configurado no site original.

---

# 21. FOOTER

Footer sofisticado, espaçoso e funcional.

Fundo:

`#17131F`, `#1C1928` ou equivalente derivado da identidade.

Incluir:

Logo Cáliber branco.

Descrição institucional curta baseada no conteúdo existente.

## Navegação

* Início
* Sobre
* Serviços
* Clientes
* Área do Cliente
* Central de Recursos Cáliber
* Cadastro de Indicação
* Contato

## Contato

E-mail:

`contato@calibergestao.com.br`

Telefone:

`+55 (65) 2127-4718`

Também preservar o telefone de Curitiba quando aplicável:

`(41) 2626-1294`

## Endereços

Cuiabá e Curitiba conforme conteúdo real.

Copyright Cáliber.

Não manter automaticamente crédito da antiga desenvolvedora se não for requisito.

---

# 22. PÁGINA SOBRE

Criar `/sobre`.

Não inventar história corporativa que não exista na fonte.

Usar apenas informações institucionais reais disponíveis.

Estrutura visual sugerida:

1. Hero Sobre
2. posicionamento da Cáliber
3. “Da operação à gestão”
4. experiência e números
5. metodologia
6. princípios/diferenciais já existentes
7. presença nacional
8. CTA

A página deve compartilhar o mesmo design system da Home.

---

# 23. PÁGINA SERVIÇOS

Criar `/servicos`.

Não inventar serviços adicionais.

Estruturar os serviços confirmados:

* Auditoria Estratégica
* Estruturação 360° na Prática
* Análise e Gestão

Para cada serviço:

* nome;
* descrição existente;
* apresentação visual;
* CTA para contato.

Se houver conteúdo adicional recuperável do site atual, preservar.

Se não houver informação suficiente para determinado detalhe, NÃO inventar.

---

# 24. PÁGINA CLIENTES

Criar `/clientes`.

Estrutura:

1. Hero
2. números de autoridade
3. clientes/parceiros
4. depoimentos reais
5. atuação nacional
6. CTA

Usar somente empresas e depoimentos existentes.

---

# 25. PÁGINA CONTATO

Criar `/contato`.

Hero simples e sofisticado.

Conteúdo institucional:

**Somos especialistas em eficiência e inovação.**

**Ser cliente Cáliber é ter um parceiro da operação à gestão para a sua empresa crescer cada dia mais.**

## Telefones

(65) 2127-4718
(41) 2626-1294

## E-mail

[contato@calibergestao.com.br](mailto:contato@calibergestao.com.br)

## Endereços

Avenida Miguel Sutil, 8000
Santa Rosa
Cuiabá - MT

e endereço de Curitiba existente no site.

## Formulário

Campos:

* Nome
* E-mail
* Empresa
* Serviço
* Telefone
* Mensagem

CTA:

**Enviar Mensagem**

Labels reais e acessíveis.

Não usar placeholder como substituto de label.

Preservar os dados digitados caso haja erro.

Criar estados:

* normal;
* focus;
* preenchido;
* inválido;
* enviando;
* sucesso;
* erro.

Não simular envio bem-sucedido se não houver backend configurado.

---

# 26. ÁREA DO CLIENTE

Preservar os acessos existentes:

* Central de Recursos Cáliber
* Cadastro de Indicação

Não recriar autenticação, painel ou funcionalidades internas sem necessidade.

Se atualmente forem links externos ou páginas existentes, preservar seus destinos.

---

# 27. IMAGENS

Fotografia é parte fundamental da direção de arte.

Buscar imagens com linguagem:

* executivos brasileiros;
* liderança;
* estratégia;
* reunião empresarial;
* operação;
* arquitetura corporativa contemporânea;
* indústria;
* gestão;
* colaboração profissional.

Evitar:

* aperto de mãos clichê;
* pessoas apontando para gráficos falsos;
* hologramas;
* cérebros digitais;
* robôs;
* imagens explicitamente “AI”;
* pessoas excessivamente posadas;
* fotos genéricas de call center.

Priorizar fotografias com:

* luz natural;
* composição arquitetônica;
* tons neutros;
* espaço negativo;
* sensação premium.

Quando houver imagens reais da Cáliber ou de seus clientes no site original, priorizar os assets existentes em vez de gerar substitutos fictícios.

---

# 28. ÍCONES

Usar uma única biblioteca SVG consistente.

Preferência:

**Lucide React**

Ícones devem ter stroke consistente.

Não utilizar emojis.

Não misturar múltiplas bibliotecas sem necessidade.

---

# 29. ANIMAÇÕES E MICROINTERAÇÕES

O site deve possuir movimento sofisticado.

Mas animação deve reforçar hierarquia, não competir com conteúdo.

Implementar quando apropriado:

### Reveal de texto

Headlines entrando por linha através de máscara.

### Scroll reveal

Elementos com fade + translate pequeno.

### Stagger

Cards entrando em sequência curta.

### Image reveal

Imagem aparecendo através de `clip-path` ou máscara.

### Parallax

Muito leve em fotografias selecionadas.

### Count-up

Números institucionais.

### Hover

Cards com deslocamento de 2–4px e mudança sutil de border/background.

### CTA

Seta desloca alguns pixels no hover.

### Navbar

Transição ao passar do hero.

### Logos

Marquee lento quando fizer sentido.

### Progress

A metodologia pode ter indicador visual de progresso relacionado ao scroll.

---

# 30. REGRAS DE MOVIMENTO

Não usar:

* bounce;
* elementos voando pela tela;
* partículas aleatórias;
* cursor customizado extravagante;
* tilt 3D em todos os cards;
* blobs neon;
* animações infinitas sem propósito;
* texto piscando;
* scroll hijacking;
* delays longos;
* animação que impeça clique.

Duração normal:

aproximadamente 300–800ms dependendo do efeito.

Movimentos editoriais maiores podem ultrapassar isso quando necessário.

Usar easing refinado.

Exemplo:

`cubic-bezier(0.22, 1, 0.36, 1)`

Respeitar:

`prefers-reduced-motion: reduce`.

---

# 31. RESPONSIVIDADE

O site precisa ser realmente responsivo.

Testar pelo menos:

* 360px
* 390px
* 430px
* 768px
* 1024px
* 1280px
* 1440px
* 1920px

Nenhum scroll horizontal inesperado no `body`.

Não resolver overflow usando `overflow-x: hidden` global para esconder bugs.

Corrigir o elemento responsável.

## Mobile

No mobile:

* reorganizar composição;
* reduzir animações pesadas;
* manter hierarquia;
* CTAs confortáveis;
* cards em uma coluna quando necessário;
* imagens com aspect ratio apropriado;
* metodologia deixa de ser sticky se isso prejudicar UX;
* tipografia permanece expressiva;
* menus e dropdowns acessíveis.

O mobile deve parecer projetado, não uma versão desktop espremida.

---

# 32. ACESSIBILIDADE

Usar HTML semântico.

Obrigatório:

* `

`;
* ``;
* ``;
* `

`;
* `

`;
* headings hierárquicos;
* `` para ações;
* `` para navegação;
* labels associados aos inputs;
* `alt` apropriado;
* foco visível;
* navegação por teclado;
* contraste adequado;
* targets confortáveis.

Não remover outline sem substituto.

Respeitar WCAG 2.2 sempre que possível.

---

# 33. PERFORMANCE

Não sacrificar performance para obter efeitos visuais.

Evitar dependências enormes apenas para pequenas animações.

Otimizar:

* imagens;
* lazy loading abaixo da dobra;
* fontes;
* scripts;
* bundle;
* animações.

Definir dimensões/aspect ratio de imagens para evitar CLS.

Não lazy-load a imagem principal LCP do hero.

---

# 34. STACK E COMPONENTIZAÇÃO

Preservar a stack criada pelo projeto Lovable, evitando trocar infraestrutura sem necessidade.

Criar componentes reutilizáveis quando houver repetição real.

Exemplos:

* Header
* MobileNavigation
* SectionHeading
* Button
* Metric
* ServiceSection
* DifferentiatorCard
* Testimonial
* LogoCloud
* ContactCTA
* Footer

Não transformar cada `

` em componente.

Manter código legível e organizado.

---

# 35. DESIGN TOKENS

Centralizar:

* cores;
* spacing;
* radius;
* typography;
* shadows;
* containers;
* transitions.

Evitar valores aleatórios em cada componente.

Sugestão de radius:

* controles: 10–12px;
* cards: 16–20px;
* grandes superfícies/imagens: 20–28px.

Não transformar tudo em pills.

Sombras extremamente sutis.

---

# 36. SEO E METADADOS

Criar estrutura adequada para:

* title;
* meta description;
* Open Graph;
* headings;
* URLs semânticas;
* conteúdo indexável.

Não inventar claims para SEO.

Preservar o posicionamento relacionado a:

* consultoria empresarial;
* gestão empresarial;
* eficiência empresarial;
* auditoria estratégica;
* estruturação empresarial.

---

# 37. O QUE NÃO FAZER

NÃO:

* usar emojis;
* usar Lorem Ipsum;
* inventar conteúdo;
* inventar empresas clientes;
* inventar depoimentos;
* inventar estatísticas;
* inventar prêmios;
* transformar a Cáliber em empresa de tecnologia;
* usar estética SaaS;
* usar excesso de glassmorphism;
* usar neon;
* usar azul como nova cor principal;
* colocar gradiente em todos os textos;
* criar cards demais;
* usar border-radius exagerado;
* criar gráficos fictícios;
* criar dashboards falsos;
* usar ilustrações infantis;
* adicionar seções apenas para preencher espaço;
* criar FAQ sem conteúdo real;
* criar blog fictício;
* criar membros de equipe fictícios;
* criar logos fictícios;
* criar avaliações fictícias;
* copiar literalmente os templates de referência.

---

# 38. SENSAÇÃO FINAL

Ao entrar no site, a pessoa deve pensar:

**“Essa empresa entende de gestão e trabalha com empresas sérias.”**

E não:

**“Isso parece um template de startup.”**

O visual deve comunicar uma empresa estabelecida, moderna e competente.

A Cáliber precisa parecer maior, mais sofisticada e mais valiosa sem abandonar sua identidade original.

---

# 39. CRITÉRIO DE QUALIDADE VISUAL

Antes de considerar a implementação concluída, revisar cada seção perguntando:

1. Existe hierarquia visual clara?
2. Essa seção parece Cáliber ou poderia pertencer a qualquer empresa?
3. Há espaço suficiente?
4. Existe algum elemento decorativo sem função?
5. A fotografia parece premium?
6. Há repetição excessiva de cards?
7. A animação melhora a experiência?
8. O layout continua excelente no mobile?
9. O roxo Cáliber continua sendo reconhecível?
10. Existe alguma aparência de template ou IA?

Se parecer genérico, redesenhar.

---

# 40. ORDEM DE IMPLEMENTAÇÃO

Primeiro construir corretamente:

1. design system;
2. header;
3. hero;
4. faixa de autoridade;
5. abordagem em 3 etapas;
6. metodologia/serviços;
7. seção institucional;
8. Por que a Cáliber;
9. diferenciais;
10. CTA de impacto;
11. depoimentos;
12. clientes;
13. atuação nacional;
14. CTA final;
15. footer;
16. páginas internas;
17. responsividade;
18. animações;
19. acessibilidade;
20. refinamento visual final.

Não priorizar animações antes do layout estar correto.

---

# 41. TESTES OBRIGATÓRIOS

Ao terminar, verificar:

* nenhuma informação fictícia;
* nenhum Lorem Ipsum;
* nenhum emoji;
* nenhuma logo fictícia;
* nenhum cliente fictício;
* conteúdo real preservado;
* links internos funcionando;
* CTA funcionando;
* formulário validando corretamente;
* nenhum falso sucesso no formulário;
* navegação desktop funcionando;
* navegação mobile funcionando;
* dropdown funcionando por teclado;
* sem overflow horizontal;
* 360px funcionando;
* 390px funcionando;
* 768px funcionando;
* 1024px funcionando;
* 1440px funcionando;
* 1920px funcionando;
* hero sem CLS evidente;
* imagens otimizadas;
* focus visível;
* `prefers-reduced-motion` respeitado;
* sem erros de console;
* sem warnings críticos;
* build de produção concluído.

---

# 42. ENTREGA DA PRIMEIRA VERSÃO

Implemente agora a primeira versão completa da experiência visual.

Não entregue apenas wireframe.

Não entregue somente hero.

Não pare para perguntar sobre pequenos detalhes que podem ser resolvidos a partir destas especificações.

Tome decisões de design coerentes dentro destas regras.

Prioridade máxima:

**qualidade visual + identidade própria + clareza empresarial + responsividade + performance.**

No final, relate objetivamente:

* páginas implementadas;
* seções implementadas;
* componentes criados;
* animações implementadas;
* assets reais reutilizados;
* conteúdo que não pôde ser recuperado e portanto não foi inventado;
* viewports testados;
* resultado do build;
* itens ainda dependentes de integração externa.

Não declare formulário, WhatsApp, backend ou integração como funcional sem realmente verificar.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://calibergestaoempresarial.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/44734da2-ab72-421d-8a60-bc8652eb5cad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
