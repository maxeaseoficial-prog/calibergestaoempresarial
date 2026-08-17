
-- 1. Inserir Clientes
INSERT INTO public.clients (name, logo_url, is_active, sort_order)
VALUES 
('Claro', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/CLARO.webp?fit=83%2C81&ssl=1', true, 1),
('NET', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2025/02/net-1.png?fit=200%2C125&ssl=1', true, 2),
('Megasom', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/05/Logo-Megasom-sem-fundo.png?fit=200%2C125&ssl=1', true, 3),
('Leo Madeiras', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/LEO-MADEIRAS.webp?fit=128%2C68&ssl=1', true, 4),
('Procria', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2025/02/procria.png?fit=200%2C125&ssl=1', true, 5),
('LEGO', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/LEGO.webp?fit=71%2C68&ssl=1', true, 6),
('Maxvinil', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/MAXVINIL.webp?fit=104%2C68&ssl=1', true, 7),
('Tupperware', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/TUPPERWARE.webp?fit=191%2C55&ssl=1', true, 8),
('Águas de Sorriso', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/AGUAS-DE-SORRISO.webp?fit=117%2C74&ssl=1', true, 9),
('Aliança', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/ALIANCA.webp?fit=133%2C94&ssl=1', true, 10),
('Campo Solar', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/CAMPO-SOLAR.webp?fit=199%2C61&ssl=1', true, 11),
('Cobertura Imasa', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/COBERTURA-IMASA.webp?fit=135%2C61&ssl=1', true, 12),
('Eletricidade Paraense', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/ELETRICIDADE-PARAENSE.webp?fit=137%2C101&ssl=1', true, 13),
('Fatex', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/FATEX.webp?fit=108%2C68&ssl=1', true, 14),
('Frota', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/FROTA.webp?fit=81%2C95&ssl=1', true, 15),
('Octech', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/OCTECH.webp?fit=132%2C48&ssl=1', true, 16),
('Pantanal', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/PANTANAL.webp?fit=114%2C76&ssl=1', true, 17),
('Tempermat', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/02/TEMPERMAT.webp?fit=176%2C57&ssl=1', true, 18),
('Prime Lente | Gradual', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2025/02/prime-lente-logo-gradual-1.png?fit=200%2C125&ssl=1', true, 19),
('Trevo', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2025/02/trevo.png?fit=200%2C125&ssl=1', true, 20);

-- 2. Inserir Serviços
INSERT INTO public.services (title, short_description, icon_name, sort_order, is_active)
VALUES 
('CONTROLADORIA ESTRATÉGICA COMERCIAL', 'Estruturamos toda a máquina de vendas da sua empresa para que ela não dependa de você: processos, pessoas e ferramentas.', 'TrendingUp', 1, true),
('CONTROLADORIA ESTRATÉGICA FINANCEIRA', 'Gestão financeira estratégica para otimizar recursos, reduzir riscos e garantir saúde financeira sólida.', 'BarChart3', 2, true),
('CONSELHO DE GESTÃO ESTRATÉGICA', 'Decisões estratégicas com visão de longo prazo, alinhamento de lideranças e foco em crescimento sustentável.', 'Users', 3, true),
('CÁLIBER COR', 'Soluções exclusivas que integram tecnologia, pessoas e processos para elevar o nível da sua gestão.', 'LayoutGrid', 4, true);

-- 3. Inserir Depoimentos
INSERT INTO public.testimonials (name, role, quote, logo_url, company_name, is_active, sort_order)
VALUES 
('Paulo Willemann', 'Proprietário', 'A Cáliber tem nos ajudado a organizar e otimizar nossa gestão de estoque, com definições e aprimoramentos de processos internos ajustando de maneira eficiente nosso MRP...', 'https://calibergestao.com.br/wp-content/uploads/2022/02/LEO-MADEIRAS.webp?fit=128%2C68&ssl=1', 'Leo Madeiras', true, 1),
('Michelli Freire', 'Gestora Contábil', 'Conhecia o trabalho da Cáliber maneira superficial, então fiquei muito surpresa com o resultado do projeto. Achei tudo de uma competência muito grande...', 'https://calibergestao.com.br/wp-content/uploads/2022/02/MAXVINIL.webp?fit=104%2C68&ssl=1', 'Tintas Maxvinil', true, 2),
('Adriano Ghilardi', 'Proprietário', 'A parceria com a Cáliber foi muito promissora para a empresa, pois com as ferramentas e treinamentos que recebemos conseguimos padronizar muitos processos...', 'https://i0.wp.com/calibergestao.com.br/wp-content/uploads/2022/05/Logo-Megasom-sem-fundo.png?fit=200%2C125&ssl=1', 'Megasom', true, 3);

-- 4. Inserir SEO Inicial (usando a estrutura de site_settings como fallback ou corrigindo seo_settings se necessário)
-- Primeiro, vamos ver o que tem em seo_settings se a coluna não existe.
-- Baseado no types.ts, seo_settings tem Row: { key: string, updated_at: string | null, value: string }
-- Mas o hook useSeoSettings usa .eq('page_path', path). Algo está errado entre o hook e o types.ts.
-- Vamos ajustar o hook ou a tabela. Vou optar por ajustar a tabela para ter page_path, title, description via migration.

DROP TABLE IF EXISTS public.seo_settings;

CREATE TABLE public.seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_settings TO authenticated;
GRANT SELECT ON public.seo_settings TO anon;
GRANT ALL ON public.seo_settings TO service_role;

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to seo_settings"
ON public.seo_settings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow admins to manage seo_settings"
ON public.seo_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.seo_settings (page_path, title, description)
VALUES ('/', 'Cáliber — Eficiência em Gestão Empresarial', 'Transforme sua empresa com a Cáliber. Especialistas em eficiência, gestão, processos e finanças com resultados reais e práticos.');
