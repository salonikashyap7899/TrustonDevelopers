import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContentBlock = {
  eyebrow?: string;
  title?: string;
  title_accent?: string;
  subtitle?: string;
  image_url?: string;
  video_url?: string;
  body?: string;
  body_secondary?: string;
  [k: string]: unknown;
};

const cache = new Map<string, ContentBlock>();

export function usePageContent(key: string, fallback: ContentBlock = {}) {
  const [data, setData] = useState<ContentBlock>(cache.get(key) ?? fallback);

  useEffect(() => {
    const fetchData = async () => {
      const { data: row, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("key", key)
        .maybeSingle();

      if (row) {
        const merged = { ...fallback, ...(row.data as ContentBlock) };
        cache.set(key, merged);
        setData(merged);
      }
    };

    fetchData();

    const channel = supabase
      .channel(`site_content_${key}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_content",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          const newData = payload.new as { data: ContentBlock };
          const merged = { ...fallback, ...newData.data };
          cache.set(key, merged);
          setData(merged);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
