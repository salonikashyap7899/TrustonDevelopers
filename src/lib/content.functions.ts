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
