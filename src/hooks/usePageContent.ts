import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContentBlock = {
  eyebrow?: string;
  title?: string;
  title_accent?: string;
  subtitle?: string;
  image_url?: string;
  video_url?: string;
  [k: string]: unknown;
};

const cache = new Map<string, { data: ContentBlock; timestamp: number }>();

export function usePageContent(key: string, fallback: ContentBlock = {}) {
  const [data, setData] = useState<ContentBlock>(fallback);

  useEffect(() => {
    let cancel = false;
    let lastTimestamp = 0;

    // Fetch content and check for updates
    const fetchData = async () => {
      try {
        const { data: row, error } = await supabase
          .from("site_content")
          .select("data, updated_at")
          .eq("key", key)
          .maybeSingle();

        if (cancel || error) return;

        if (row?.data) {
          const merged = { ...fallback, ...(row.data as ContentBlock) };
          const newTimestamp = new Date(row.updated_at).getTime();

          // Only update if content changed (based on updated_at timestamp)
          if (newTimestamp > lastTimestamp) {
            lastTimestamp = newTimestamp;
            cache.set(key, { data: merged, timestamp: newTimestamp });
            setData(merged);
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching content:", error);
      }
    };

    // Initial fetch immediately
    fetchData();

    // Poll for updates every 2 seconds
    const interval = setInterval(fetchData, 2000);

    return () => {
      cancel = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
