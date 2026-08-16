-- Create Enum for Roles
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Set Up the user_roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Grant Access to user_roles
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security Definer Function to check role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policy for user_roles
CREATE POLICY "Users can read their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- 1. Site Settings (nome, contatos, email_destinatario)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key text PRIMARY KEY,
    value text NOT NULL,
    description text,
    updated_at timestamptz DEFAULT now(),
    updated_by uuid REFERENCES auth.users(id)
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for site_settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin managed for site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 2. Social Links
CREATE TABLE IF NOT EXISTS public.social_links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    url text NOT NULL,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.social_links TO anon, authenticated;
GRANT ALL ON public.social_links TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.social_links TO authenticated;

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for social_links" ON public.social_links FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow admin managed for social_links" ON public.social_links FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. Clients (Logos)
CREATE TABLE IF NOT EXISTS public.clients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    logo_url text NOT NULL,
    alt_text text,
    website_url text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.clients TO anon, authenticated;
GRANT ALL ON public.clients TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.clients TO authenticated;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for clients" ON public.clients FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow admin managed for clients" ON public.clients FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 4. Services
CREATE TABLE IF NOT EXISTS public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    subtitle text,
    short_description text,
    long_description text,
    icon_name text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for services" ON public.services FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow admin managed for services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 5. Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    role text,
    company_name text,
    quote text NOT NULL,
    logo_url text,
    stars integer DEFAULT 5,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow admin managed for testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 6. Served States
CREATE TABLE IF NOT EXISTS public.served_states (
    id text PRIMARY KEY, -- Sigla do estado
    name text NOT NULL,
    is_active boolean DEFAULT false,
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.served_states TO anon, authenticated;
GRANT ALL ON public.served_states TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.served_states TO authenticated;

ALTER TABLE public.served_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for served_states" ON public.served_states FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin managed for served_states" ON public.served_states FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 7. SEO Settings
CREATE TABLE IF NOT EXISTS public.seo_settings (
    key text PRIMARY KEY,
    value text NOT NULL,
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.seo_settings TO anon, authenticated;
GRANT ALL ON public.seo_settings TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.seo_settings TO authenticated;

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for seo_settings" ON public.seo_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin managed for seo_settings" ON public.seo_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Initial Data Migration
INSERT INTO public.social_links (name, url, is_active, sort_order) VALUES
('instagram', 'https://www.instagram.com/calibergestao/', true, 1),
('facebook', 'https://www.facebook.com/calibergestao', true, 2),
('linkedin', 'https://www.linkedin.com/company/calibergestao/', true, 3)
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.site_settings (key, value, description) VALUES
('contact_email', 'contato@calibergestao.com.br', 'Email principal de contato'),
('lead_recipient_email', 'leonardo.froese@gmail.com', 'Email que recebe os leads do formulário'),
('contact_whatsapp', '5565981598205', 'Número de WhatsApp (apenas dígitos)'),
('contact_phone_mt', '+55 (65) 2127-4718', 'Telefone unidade MT'),
('contact_phone_pr', '+55 (41) 2626-1294', 'Telefone unidade PR')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.served_states (id, name, is_active) VALUES
('AC', 'Acre', true),
('AM', 'Amazonas', true),
('BA', 'Bahia', true),
('MS', 'Mato Grosso do Sul', true),
('MT', 'Mato Grosso', true),
('PA', 'Pará', true),
('PI', 'Piauí', true),
('PR', 'Paraná', true),
('RO', 'Rondônia', true),
('SP', 'São Paulo', true)
ON CONFLICT (id) DO NOTHING;
