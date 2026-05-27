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

type SaveContentPayload = {
  key: string;
  label: string;
  data: Json;
};

type UploadMediaPayload = {
  filename: string;
  contentType: string;
  base64: string;
};

function assertString(value: unknown, name: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value.trim();
}

function assertJson(value: unknown): Json {
  if (value === undefined) {
    throw new Error("data must be JSON serializable");
  }
  return value as Json;
}

/** All default content blocks for every section of the site */
const DEFAULT_BLOCKS: { key: string; label: string; data: Record<string, unknown> }[] = [
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
];

export const getSiteContentBlocks = createServerFn({ method: "POST" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("id,key,label,data,created_at,updated_at")
      .order("key", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as ContentBlock[];
  });

export const saveSiteContentBlock = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("Invalid payload");
    }

    const { key, label, data } = payload as Record<string, unknown>;
    return {
      key: assertString(key, "key"),
      label: assertString(label, "label"),
      data: assertJson(data),
    } as SaveContentPayload;
  })
  .handler(async ({ data }) => {
    const { key, label, data: contentData } = data;

    const { error, data: saved } = await supabaseAdmin
      .from("site_content")
      .upsert(
        { key, label, data: contentData },
        { onConflict: "key", ignoreDuplicates: false },
      )
      .select("id,key,label,data,created_at,updated_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return saved as ContentBlock;
  });

export const seedDefaultContent = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    const p = payload as Record<string, unknown> | null | undefined;
    return { overwrite: !!(p?.overwrite) };
  })
  .handler(async ({ data }) => {
    const results: { key: string; status: "seeded" | "skipped" | "error"; error?: string }[] = [];

    for (const block of DEFAULT_BLOCKS) {
      try {
        const { error } = await supabaseAdmin
          .from("site_content")
          .upsert(
            { key: block.key, label: block.label, data: block.data },
            { onConflict: "key", ignoreDuplicates: !data.overwrite },
          );

        if (error) {
          results.push({ key: block.key, status: "error", error: error.message });
        } else {
          results.push({ key: block.key, status: data.overwrite ? "seeded" : "seeded" });
        }
      } catch (e) {
        results.push({ key: block.key, status: "error", error: String(e) });
      }
    }

    return results;
  });

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("Invalid upload payload");
    }

    const { filename, contentType, base64 } = payload as Record<string, unknown>;
    return {
      filename: assertString(filename, "filename"),
      contentType: assertString(contentType, "contentType"),
      base64: assertString(base64, "base64"),
    } as UploadMediaPayload;
  })
  .handler(async ({ data }) => {
    const filename = data.filename.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
    const storagePath = `${timestamp}-${filename}`;
    const buffer = Buffer.from(data.base64, "base64");

    const { error: uploadError } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .upload(storagePath, buffer, {
        contentType: data.contentType,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData, error: publicUrlError } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(storagePath);

    if (publicUrlError) {
      throw new Error(publicUrlError.message);
    }

    const url = publicUrlData.publicUrl;

    await supabaseAdmin.from("media").insert({
      name: filename,
      type: data.contentType,
      url,
      storage_path: storagePath,
      size_bytes: buffer.length,
    });

    return { url };
  });
