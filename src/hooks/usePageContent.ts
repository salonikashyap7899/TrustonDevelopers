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

const cache = new Map<string, ContentBlock>();
let channelCounter = 0;

export function usePageContent(key: string, fallback: ContentBlock = {}) {
  const [data, setData] = useState<ContentBlock>(cache.get(key) ?? fallback);

  useEffect(() => {
    let cancel = false;
    let subscription: any = null;

    // Initial fetch
    const fetchData = async () => {
      try {
        const { data: row } = await supabase
          .from("site_content")
          .select("data")
          .eq("key", key)
          .maybeSingle();

        if (cancel) return;
        
        if (row?.data) {
          const merged = { ...fallback, ...(row.data as ContentBlock) };
          cache.set(key, merged);
          setData(merged);
          console.log("[v0] Fetched content for key:", key, merged);
        } else {
          console.log("[v0] No content found for key:", key);
          setData(fallback);
        }
      } catch (error) {
        console.error("[v0] Failed to fetch content:", error);
      }
    };

    fetchData();

    // Subscribe to real-time changes
    const setupSubscription = async () => {
      try {
        const uniqueChannelId = `content:${key}:${++channelCounter}`;
        console.log("[v0] Setting up real-time subscription for:", uniqueChannelId);
        
        subscription = supabase
          .channel(uniqueChannelId, { config: { broadcast: { self: true } } })
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "site_content",
              filter: `key=eq.${key}`,
            },
            (payload: any) => {
              if (cancel) return;
              
              console.log("[v0] Real-time update received for", key, ":", payload);
              
              if (payload.new?.data) {
                const merged = { ...fallback, ...(payload.new.data as ContentBlock) };
                cache.set(key, merged);
                setData(merged);
                console.log("[v0] Content updated for key:", key, merged);
              }
            }
          )
          .subscribe((status: string) => {
            console.log("[v0] Subscription status for", key, ":", status);
          });
      } catch (error) {
        console.error("[v0] Failed to setup subscription:", error);
      }
    };

    setupSubscription();

    return () => {
      cancel = true;
      if (subscription) {
        supabase.removeChannel(subscription);
        console.log("[v0] Cleaned up subscription for:", key);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
