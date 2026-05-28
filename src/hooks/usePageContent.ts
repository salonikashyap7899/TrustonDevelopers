import { useCallback, useEffect, useRef, useState } from "react";
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

const POLL_INTERVAL = 30000; // Reduced polling frequency for better performance

// Global cache to prevent duplicate subscriptions
const subscriptionCache = new Map<string, Promise<void>>();

export function usePageContent(key: string, fallback: ContentBlock = {}): ContentBlock {
  const [data, setData] = useState<ContentBlock>(fallback);
  const cancelRef = useRef(false);
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  // Monotonically-increasing version counter.
  // Realtime updates bump this; poll results are discarded if their
  // version is older than the current one.
  const versionRef = useRef(0);
  const lastRealtimeRef = useRef(0);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchContent = useCallback(
    async (requestVersion: number) => {
      try {
        const { data: row, error } = await supabase
          .from("site_content")
          .select("data")
          .eq("key", key)
          .maybeSingle();

        if (cancelRef.current) return;
        if (error) {
          console.warn(`[usePageContent] Error fetching ${key}:`, error);
          return;
        }

        // Discard if a newer update (Realtime or later poll) already arrived
        if (requestVersion < versionRef.current) return;

        if (row?.data) {
          versionRef.current = requestVersion;
          setData({ ...fallbackRef.current, ...(row.data as ContentBlock) });
        }
      } catch (e) {
        console.warn(`[usePageContent] Exception fetching ${key}:`, e);
      }
    },
    [key],
  );

  useEffect(() => {
    cancelRef.current = false;
    versionRef.current = 0;
    lastRealtimeRef.current = 0;

    // Initial fetch
    const initialVersion = ++versionRef.current;
    fetchContent(initialVersion);

    // Polling — always uses the current version so it can't win over Realtime
    // Only poll if not already subscribed to realtime
    pollTimerRef.current = setInterval(() => {
      if (cancelRef.current) return;
      const v = ++versionRef.current;
      fetchContent(v);
    }, POLL_INTERVAL);

    // Realtime subscription — wins over any poll
    const subscription = supabase
      .channel(`site_content_${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_content",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          if (cancelRef.current) return;

          // Realtime always takes priority — bump version high so polls lose
          versionRef.current += 1000;
          lastRealtimeRef.current = versionRef.current;

          if (payload.eventType === "DELETE") {
            setData(fallbackRef.current);
            return;
          }

          const newData = (payload.new as { data?: ContentBlock })?.data;
          if (newData) {
            setData({ ...fallbackRef.current, ...newData });
          } else {
            // Realtime fired but payload had no data — do a fresh fetch
            const v = versionRef.current;
            fetchContent(v);
          }
        },
      )
      .subscribe();

    return () => {
      cancelRef.current = true;
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      subscription.unsubscribe();
    };
  }, [key, fetchContent]);
  
  return data;
}
