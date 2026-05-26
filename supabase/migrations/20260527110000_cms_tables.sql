-- Auth Role Function
CREATE OR REPLACE FUNCTION public.has_role(_role app_role, _user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Hero Sections
CREATE TABLE IF NOT EXISTS public.hero_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_key TEXT UNIQUE NOT NULL,
    eyebrow TEXT,
    title TEXT,
    title_accent TEXT,
    subtitle TEXT,
    video_url TEXT,
    image_url TEXT,
    button_text TEXT,
    button_link TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    src TEXT NOT NULL,
    alt TEXT,
    category TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT,
    description TEXT,
    profile_image TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    link_text TEXT,
    link_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    slug TEXT UNIQUE NOT NULL,
    content_json JSONB DEFAULT '{}'::jsonb,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Plots
CREATE TABLE IF NOT EXISTS public.plots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    tag TEXT,
    tag_color TEXT,
    area TEXT,
    dimensions TEXT,
    facing TEXT,
    road TEXT,
    ownership TEXT,
    price TEXT,
    subtitle TEXT,
    type TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_sold BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT,
    category TEXT,
    image_url TEXT,
    author TEXT,
    read_time TEXT,
    content TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Configs
CREATE TABLE IF NOT EXISTS public.seo_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path TEXT UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    og_title TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navbar Links
CREATE TABLE IF NOT EXISTS public.navbar_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    to TEXT NOT NULL,
    parent_id UUID REFERENCES public.navbar_links(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Footer Configs
CREATE TABLE IF NOT EXISTS public.footer_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navbar_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_configs ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('hero_sections', 'gallery', 'testimonials', 'services', 'projects', 'plots', 'articles', 'seo_configs', 'navbar_links', 'footer_configs')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Allow public read" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Allow public read" ON public.%I FOR SELECT USING (true)', t);
        EXECUTE format('DROP POLICY IF EXISTS "Allow admin all" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Allow admin all" ON public.%I FOR ALL TO authenticated USING (public.has_role(''admin'', auth.uid())) WITH CHECK (public.has_role(''admin'', auth.uid()))', t);
    END LOOP;
END $$;
