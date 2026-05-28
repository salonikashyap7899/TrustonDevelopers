import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Json } from "@/integrations/supabase/types";

const MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "site-media";

type ContentBlock = {
  id: string;
  key: string;
  label: string;
  data: Json;
  created_at: string;
  updated_at: string;
};

type SaveContentPayload = { key: string; label: string; data: Json };
type UploadMediaPayload = { filename: string; contentType: string; base64: string };

function assertString(value: unknown, name: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${name} must be a non-empty string`);
  return value.trim();
}
function assertJson(value: unknown): Json {
  if (value === undefined) throw new Error("data must be JSON serializable");
  return value as Json;
}

/** ─── ALL DEFAULT CONTENT BLOCKS FOR EVERY PAGE ─── */
const DEFAULT_BLOCKS: { key: string; label: string; data: Record<string, unknown> }[] = [
  // ── HOME PAGE ──────────────────────────────────────────────────
  {
    key: "home.hero",
    label: "Home — Hero",
    data: {
      title: "TRUST",
      title_accent: "ON",
      subtitle: "Own the Ground. Build the Legacy.",
      video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4",
      image_url: "",
    },
  },
  {
    key: "home.gallery",
    label: "Home — Gallery Section",
    data: {
      heading: "SPACES WHERE LIFE",
      heading_accent: "Unfolds",
    },
  },
  {
    key: "home.prime_estate",
    label: "Home — Prime Estate Project",
    data: {
      eyebrow: "Flagship Project",
      title: "Prime",
      title_accent: "Estate",
      body: "A masterfully planned residential plot colony at Dubagga, Lucknow — designed for those who want the freedom to build on their own terms, in a location primed for significant growth.",
      stat_1_val: "120", stat_1_sup: "+", stat_1_label: "Total Plots",
      stat_2_val: "47",  stat_2_sup: "",  stat_2_label: "Available Now",
      stat_3_val: "2,400", stat_3_sup: "", stat_3_label: "Sq. Ft Range",
      stat_4_val: "₹12",  stat_4_sup: "L+", stat_4_label: "Starting Price",
      image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-05-25_19-38-16-cw2VCtfJrtIWHFnZ75BKIzp9ddykUQ.jpg",
    },
  },
  {
    key: "home.plots_structures",
    label: "Home — Plots & Structures",
    data: {
      eyebrow: "Strategic Masterpieces",
      title: "Building",
      title_accent: "Plots & Structures",
      body: "Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow's most promising corridors, offering 100% legal clearance and Jila Panchayat approval.",
      stat_1_val: "150+", stat_1_label: "Premium Plots",
      stat_2_val: "Elite", stat_2_label: "Architectural Support",
    },
  },
  {
    key: "home.testimonials",
    label: "Home — Testimonials",
    data: {
      eyebrow: "Client Narratives",
      title: "Distinguished",
      title_accent: "Partnerships",
      subtitle: "Voices of excellence from our growing network of homeowners, investors, and partners.",
      cta_text: "Join the future of luxury real estate.",
    },
  },
  {
    key: "home.stats",
    label: "Home — Stats Bar",
    data: {
      stat_1_val: "150+", stat_1_label: "Premium Plots",
      stat_2_val: "25%",  stat_2_label: "Land Appreciation",
      stat_3_val: "5+",   stat_3_label: "Years of Trust",
      stat_4_val: "100%", stat_4_label: "Legal Clearance",
    },
  },
  {
    key: "home.redefining",
    label: "Home — Redefining Luxury",
    data: {
      eyebrow: "Welcome to the Era of TrustOn",
      title: "Redefining",
      title_accent: "Luxury",
      subtitle: "Real Estate",
      body: "Where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
      body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
    },
  },
  {
    key: "home.who_we_are",
    label: "Home — Who We Are",
    data: {
      eyebrow: "Who We Are",
      title: "Shaping",
      title_accent: "Legacies",
      subtitle: "in Lucknow",
      body: "Truston Developers is a Lucknow-based property development company built on a single founding principle — that buying land should be simple, transparent, and deeply empowering for the buyer.",
      body_secondary: "We don't merely sell plots; we help you make one of the most significant decisions of your life with complete clarity, verified documentation, and a team that stands behind every commitment.",
    },
  },
  {
    key: "home.philosophy",
    label: "Home — Philosophy",
    data: {
      eyebrow: "Our Philosophy",
      title: "Crafting",
      title_accent: "Timeless",
      subtitle: "Legacies",
      body: "TrustOn stands at the intersection of architectural brilliance and strategic investment. We don't just sell plots; we provide the foundation for your future aspirations.",
      body_secondary: "Our commitment to quality and transparency ensures that every square foot you own is a testament to enduring luxury — built to outlast trends and appreciate with time.",
      image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-25_23-25-53-thbQTIwazkPXtZmxwz9M0Fc8S5PCNo.jpg",
    },
  },
  {
    key: "home.new_generation",
    label: "Home — New Generation (Intro Highlight)",
    data: {
      eyebrow: "New Generation",
      title: "Redefining",
      title_accent: "Luxury",
      subtitle: "Real Estate",
      body: "Welcome to the era of TrustOn, where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
      body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
    },
  },
  {
    key: "home.services",
    label: "Home — Services (Four Pillars)",
    data: {
      eyebrow: "What We Offer",
      title: "Four Pillars of",
      title_accent: "Our Expertise",
      body: "Truston Developers is your complete real estate ecosystem in Lucknow. Whether you're buying land, building a home, seeking investment guidance, or designing your dream space, we bring deep local knowledge and end-to-end capability.",
      cards: [
        { num: "01", name: "Plot Selling", desc: "Residential land parcels in Lucknow's high-growth corridors. Jila Panchayat approvals, clear title deeds, and complete legal documentation — every plot backed by full transparency.", linkText: "Explore Plots" },
        { num: "02", name: "Construction", desc: "Full home construction — from foundation to finishing. Quality materials, experienced teams, and complete transparency at every phase with on-time delivery guaranteed.", linkText: "Build With Us" },
        { num: "03", name: "Investment Consultancy", desc: "Expert land investment guidance for first-time buyers, NRIs, and seasoned investors. ROI assessments, location analysis, and long-term portfolio strategy crafted for Lucknow's real estate landscape.", linkText: "Grow Your Assets" },
        { num: "04", name: "Architecture & Design", desc: "In-house architectural planning tailored to your vision. Concept layouts, elevation designs, complete blueprint documentation — bringing your idea of home to life before a single brick is laid.", linkText: "Design Your Space" },
      ],
    },
  },
  {
    key: "home.why_truston",
    label: "Home — Why Truston",
    data: {
      eyebrow: "The Truston Difference",
      title: "Why Buyers Choose",
      title_accent: "Truston",
    },
  },
  {
    key: "home.cta",
    label: "Home — Call to Action",
    data: {
      eyebrow: "47 Plots Still Available · Prime Estate · Dubagga",
      title: "Ready to Claim",
      title_accent: "Your Plot?",
      body: "Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.",
    },
  },

  // ── ABOUT PAGE ─────────────────────────────────────────────────
  {
    key: "about.hero",
    label: "About Us — Hero",
    data: {
      eyebrow: "About Truston Developers",
      title: "Own the Ground.",
      title_accent: "Build the Legacy.",
      subtitle: "A real estate company rooted in Lucknow's growth story — building trust, one plot at a time since 2025.",
      image_url: "",
    },
  },
  {
    key: "about.stats",
    label: "About Us — Stats Bar",
    data: {
      stat_1_val: "1+",   stat_1_label: "Active Projects",
      stat_2_val: "4",    stat_2_label: "Core Services",
      stat_3_val: "100%", stat_3_label: "JP Approved Plots",
      stat_4_val: "2025", stat_4_label: "Established",
    },
  },
  {
    key: "about.mission",
    label: "About Us — Mission & Vision",
    data: {
      eyebrow: "Our Story",
      title: "We Don't Just",
      title_accent: "Sell Land",
      body: "TrustOn was born from a simple yet powerful idea — that land ownership in India should be transparent, empowering, and accessible to families who dream of building something lasting. Our flagship project, Prime Estate at Dubagga, is where that vision lives.",
      body_secondary: "Every plot we develop is Jila Panchayat approved, legally vetted, and selected for long-term value creation. We're not just developing land — we're building the foundation for Lucknow's next generation of homeowners and investors.",
      mission: "To democratise transparent land ownership in Uttar Pradesh by delivering fully legal, premium residential plots with complete buyer confidence.",
      vision: "To become Lucknow's most trusted name in real estate development — the company families recommend to families, generation after generation.",
      commitment: "Zero hidden conditions. Every document verified. Every promise kept. Our name is our commitment.",
    },
  },
  {
    key: "about.team",
    label: "About Us — Team",
    data: {
      eyebrow: "Our Team",
      title: "The People Behind",
      title_accent: "TrustOn",
      member_1_name: "Meraj Husain Rizvi",
      member_1_role: "Lead Architect",
      member_1_desc: "Meraj leads TrustOn's architecture and design division, bringing a meticulous eye for detail and deep expertise in residential planning. His work ensures every plot and structure meets the highest standards of design and regulatory compliance.",
      member_2_name: "TrustOn Founders",
      member_2_role: "Development & Operations",
      member_2_desc: "The founding team behind TrustOn brings together decades of combined experience in land acquisition, infrastructure development, and real estate investment across Uttar Pradesh.",
    },
  },
  {
    key: "about.process",
    label: "About Us — Process",
    data: {
      eyebrow: "How We Work",
      title: "How We Deliver",
      title_accent: "Excellence",
      step_1_title: "Site Visit & Consultation",
      step_1_desc: "We start by understanding your needs and showing you the plot in person. Complete transparency from the very first meeting.",
      step_2_title: "Legal Review & Approval",
      step_2_desc: "Our legal team reviews all documents — title deeds, JP approvals, and compliance certificates — before any commitment is made.",
      step_3_title: "Documentation & Registration",
      step_3_desc: "We handle the complete paperwork process — from registry to mutation — ensuring your ownership is clean and undisputed.",
      step_4_title: "Handover & After-Sales",
      step_4_desc: "Plot handover with full boundary marking, possession letter, and continued support for construction planning if needed.",
    },
  },

  // ── SERVICES PAGE ───────────────────────────────────────────────
  {
    key: "services.hero",
    label: "Services — Hero",
    data: {
      eyebrow: "Complete Real Estate Ecosystem",
      title: "Our",
      title_accent: "Services",
      subtitle: "From land acquisition to handover, TrustOn provides a complete ecosystem of real estate services. One trusted partner, every step of your journey.",
      image_url: "",
    },
  },
  {
    key: "services.main",
    label: "Services — Main Content",
    data: {
      eyebrow: "Everything Under One Roof",
      title: "Four Services.",
      title_accent: "One Complete Solution.",
      body: "Each service is designed to work seamlessly with the others — so your journey from plot selection to home handover is smooth, transparent, and expertly managed.",
    },
  },
  {
    key: "services.cta",
    label: "Services — Call to Action",
    data: {
      eyebrow: "Your Journey Starts Here",
      title: "Ready to Begin Your",
      title_accent: "Journey?",
      body: "Book a free 30-minute consultation with our team. No obligations — just honest advice about your options.",
    },
  },

  // ── CONTACT PAGE ────────────────────────────────────────────────
  {
    key: "contact.hero",
    label: "Contact — Hero",
    data: {
      eyebrow: "Get in Touch",
      title: "Let's Start a",
      title_accent: "Conversation",
      subtitle: "Whether you're buying a plot, building a home, or exploring investment opportunities — our team responds within 2 hours.",
      image_url: "",
    },
  },
  {
    key: "contact.info",
    label: "Contact — Info & Address",
    data: {
      phone: "+91 96160-61166",
      email: "trustondevelopers01@gmail.com",
      address: "UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003",
      hours: "Mon–Sat: 9 AM – 7 PM",
      whatsapp: "919616061166",
    },
  },

  // ── PROJECT PAGE ────────────────────────────────────────────────
  {
    key: "project.hero",
    label: "Projects — Prime Estate Hero",
    data: {
      eyebrow: "Now Selling — Phase 1 & 2",
      label: "Flagship Project · Dubagga, Lucknow",
      title: "Prime",
      title_accent: "Estate",
      subtitle: "Jila Panchayat approved residential plots in Lucknow's most promising growth corridor. Starting at ₹12 Lakhs.",
      image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-05-25_19-38-16-cw2VCtfJrtIWHFnZ75BKIzp9ddykUQ.jpg",
    },
  },
  {
    key: "project.details",
    label: "Projects — Prime Estate Details",
    data: {
      stat_1_val: "120+", stat_1_label: "Total Plots",
      stat_2_val: "47",   stat_2_label: "Available",
      stat_3_val: "₹12L+", stat_3_label: "Starting Price",
      approval: "Jila Panchayat Approved",
      location: "Dubagga, Lucknow",
      launched: "January 5, 2025",
    },
  },

  // ── PLOT SELLING PAGE ───────────────────────────────────────────
  {
    key: "plot_selling.hero",
    label: "Plot Selling — Hero",
    data: {
      eyebrow: "Jila Panchayat Approved",
      title: "Own Land That Builds a",
      title_accent: "Legacy",
      subtitle: "Jila Panchayat approved residential plots in Lucknow's high-growth corridor at Dubagga. Starting at ₹12 Lakhs.",
      image_url: "",
    },
  },
  {
    key: "plot_selling.main",
    label: "Plot Selling — Main Content",
    data: {
      eyebrow: "Plot Inventory",
      title: "Choose Your",
      title_accent: "Perfect Plot",
      body: "Every plot in Prime Estate is legally cleared, boundary-marked, and ready for construction. Browse our available inventory and reserve your preferred plot today.",
    },
  },

  // ── CONSTRUCTION PAGE ───────────────────────────────────────────
  {
    key: "construction.hero",
    label: "Construction — Hero",
    data: {
      eyebrow: "Building Reality",
      title: "Construction &",
      title_accent: "Build",
      subtitle: "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery — your home, built perfectly.",
      image_url: "",
    },
  },
  {
    key: "construction.main",
    label: "Construction — Main Content",
    data: {
      section_1_title: "Built with",
      section_1_accent: "Precision",
      section_1_body: "We combine traditional craftsmanship with modern engineering to deliver homes that stand the test of time.",
      section_2_title: "The Build",
      section_2_accent: "Process",
      section_2_body: "From breaking ground to the final polish, our process is structured for quality and clarity.",
      cta_title: "Build Your",
      cta_accent: "Legacy",
      cta_body: "Ready to turn your architectural vision into reality? Connect with our construction team for a detailed project consultation and quote.",
    },
  },

  // ── INVESTMENT CONSULTING PAGE ──────────────────────────────────
  {
    key: "investment.hero",
    label: "Investment Consulting — Hero",
    data: {
      eyebrow: "Strategic Wealth Building",
      title: "Investment",
      title_accent: "Consulting",
      subtitle: "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, portfolio strategy — all tailored to your financial goals and risk profile.",
      image_url: "",
    },
  },
  {
    key: "investment.main",
    label: "Investment Consulting — Main Content",
    data: {
      eyebrow: "Why Invest in Land",
      title: "The Smarter",
      title_accent: "Investment",
      body: "Land in Lucknow's growth corridors has consistently outperformed traditional investment classes. Our team gives you the data, analysis, and strategy to make the most informed decision possible.",
      appreciation_rate: "12–18%",
      appreciation_label: "Annual Appreciation",
      return_multiple: "3.1x–4.2x",
      return_label: "10-Year Return Multiple",
    },
  },

  // ── ARCHITECTURE PAGE ───────────────────────────────────────────
  {
    key: "architecture.hero",
    label: "Architecture & Design — Hero",
    data: {
      eyebrow: "Design Excellence",
      title: "Architecture &",
      title_accent: "Design",
      subtitle: "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation — each project a masterpiece.",
      image_url: "",
    },
  },
  {
    key: "architecture.main",
    label: "Architecture & Design — Main Content",
    data: {
      eyebrow: "What We Deliver",
      title: "Design That",
      title_accent: "Inspires",
      body: "Every design begins with a conversation. We listen to your vision, understand your lifestyle, and translate it into architectural language that's both beautiful and buildable.",
    },
  },

  // ── BLOG PAGE ───────────────────────────────────────────────────
  {
    key: "blog.hero",
    label: "Blog — Hero",
    data: {
      eyebrow: "Insights & Intelligence",
      title: "The Legacy",
      title_accent: "Journal",
      subtitle: "Expert perspectives on Lucknow real estate, investment strategies, and the TrustOn story.",
    },
  },

  // ── LIFESTYLE PAGE ──────────────────────────────────────────────
  {
    key: "lifestyle.hero",
    label: "Lifestyle — Hero",
    data: {
      eyebrow: "The TrustOn Experience",
      title: "A Life Less",
      title_accent: "Ordinary",
      subtitle: "Beyond the ground you own, we curate the lifestyle you live. Discover the difference of a community designed for those who demand excellence in every breath.",
      image_url: "",
    },
  },
  {
    key: "lifestyle.philosophy",
    label: "Lifestyle — Philosophy",
    data: {
      eyebrow: "Our Philosophy",
      title: "Designed for",
      title_accent: "Generations",
      body: "At TrustOn, we believe that true luxury is found in the details of daily life. It's the peace of mind that comes with secure boundaries, the joy of wide open green spaces, and the pride of living in a neighborhood that values excellence above all else.",
      body_secondary: "Every TrustOn township is a master-planned ecosystem where nature and infrastructure exist in perfect harmony, ensuring your investment doesn't just appreciate in value, but grows in soul.",
      quote: "TrustOn didn't just sell us a plot; they sold us a future where our children can play safely and we can enjoy the luxury of quiet evenings.",
      quote_author: "— A Prime Estate Homeowner",
    },
  },
  {
    key: "lifestyle.cta",
    label: "Lifestyle — Call to Action",
    data: {
      eyebrow: "Ready to Elevate Your Standard?",
      title: "Your New Chapter",
      title_accent: "Starts Here",
    },
  },
  {
    key: "lifestyle.stats",
    label: "Lifestyle — Stats",
    data: {
      stat_1_val: "40%",     stat_1_label: "Green Cover",
      stat_2_val: "24/7",    stat_2_label: "Surveillance",
      stat_3_val: "Premier", stat_3_label: "Clubhouse",
      stat_4_val: "Elite",   stat_4_label: "Neighborhood",
    },
  },

  // ── CHANNEL PARTNER PAGE ────────────────────────────────────────
  {
    key: "channel_partner.hero",
    label: "Channel Partner — Hero",
    data: {
      eyebrow: "Partnership Ecosystem",
      title: "Scale your business. Earn more,",
      title_accent: "together.",
      subtitle: "Built for elite real estate consultants who want to offer premium residential plots backed by a billion-dollar brand vision.",
      image_url: "",
    },
  },
  {
    key: "channel_partner.main",
    label: "Channel Partner — Main Content",
    data: {
      eyebrow: "Strategic Growth",
      title: "Accelerate your",
      title_accent: "yield.",
      body: "Join the global network of partners already scaling with TrustOn. Our private portal access will be authorized within 24 hours.",
      benefits_title: "Why partner with TrustOn Empire?",
      benefit_1_title: "Premium Commissions",
      benefit_1_desc: "Our tiered structure rewards high-performance — the more you scale, the more you earn.",
      benefit_2_title: "Strategic Compliance",
      benefit_2_desc: "Every TrustOn project is Jila Panchayat approved and legally documented for security.",
      benefit_3_title: "Empire Relationship Manager",
      benefit_3_desc: "Your personal point of contact for every query, private viewing, and deal closure.",
      benefit_4_title: "Global Marketing Assets",
      benefit_4_desc: "Access to high-definition cinematic brochures and 3D architectural visualization tools.",
    },
  },

  // ── FOOTER ──────────────────────────────────────────────────────
  {
    key: "footer.cta",
    label: "Footer — CTA Strip",
    data: {
      eyebrow: "Begin Your Journey",
      title: "Own the Ground.",
      title_accent: "Build the Legacy.",
      cta_primary: "Enquire Now →",
      cta_phone: "+91 96160-61166",
    },
  },
  {
    key: "footer.contact",
    label: "Footer — Contact & Brand",
    data: {
      brand_name: "TrustOn",
      brand_tagline: "Premium Estate",
      brand_desc: "Prime Estate by TrustOn Developers — a Jila Panchayat approved luxury township in Lucknow, crafted for those who expect more from every square foot.",
      phone: "+91 96160-61166",
      email: "trustondevelopers01@gmail.com",
      address: "UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003",
      copyright: "© 2025 TrustOn Developers. Billion Dollar Real Estate Empire.",
    },
  },
];

export const getSiteContentBlocks = createServerFn({ method: "POST" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("id,key,label,data,created_at,updated_at")
      .order("key", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as ContentBlock[];
  });

export const saveSiteContentBlock = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid payload");
    const { key, label, data } = payload as Record<string, unknown>;
    return { key: assertString(key, "key"), label: assertString(label, "label"), data: assertJson(data) } as SaveContentPayload;
  })
  .handler(async ({ data }) => {
    const { key, label, data: contentData } = data;
    const { error, data: saved } = await supabaseAdmin
      .from("site_content")
      .upsert({ key, label, data: contentData }, { onConflict: "key", ignoreDuplicates: false })
      .select("id,key,label,data,created_at,updated_at")
      .single();
    if (error) throw new Error(error.message);
    return saved as ContentBlock;
  });

export const seedDefaultContent = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    const p = payload as Record<string, unknown> | null | undefined;
    return { overwrite: !!(p?.overwrite) };
  })
  .handler(async ({ data }) => {
    const results: { key: string; status: string; error?: string }[] = [];
    for (const block of DEFAULT_BLOCKS) {
      try {
        const { error } = await supabaseAdmin
          .from("site_content")
          .upsert({ key: block.key, label: block.label, data: block.data }, { onConflict: "key", ignoreDuplicates: !data.overwrite });
        results.push({ key: block.key, status: error ? "error" : "seeded", error: error?.message });
      } catch (e) {
        results.push({ key: block.key, status: "error", error: String(e) });
      }
    }
    return results;
  });

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid upload payload");
    const { filename, contentType, base64 } = payload as Record<string, unknown>;
    return { filename: assertString(filename, "filename"), contentType: assertString(contentType, "contentType"), base64: assertString(base64, "base64") } as UploadMediaPayload;
  })
  .handler(async ({ data }) => {
    const filename = data.filename.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
    const storagePath = `${timestamp}-${filename}`;
    const buffer = Buffer.from(data.base64, "base64");
    const { error: uploadError } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .upload(storagePath, buffer, { contentType: data.contentType, upsert: true });
    if (uploadError) throw new Error(uploadError.message);
    const { data: publicUrlData } = await supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(storagePath);
    const url = publicUrlData.publicUrl;
    await supabaseAdmin.from("media").insert({ name: filename, type: data.contentType, url, storage_path: storagePath, size_bytes: buffer.length });
    return { url };
  });
