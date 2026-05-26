import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database } from "@/integrations/supabase/types";

type PublicSchema = Database["public"];
type TableName = keyof PublicSchema["Tables"];

export function useCollection<T>(
  table: TableName,
  options: {
    order?: string;
    ascending?: boolean;
    filter?: (
      query: PostgrestFilterBuilder<PublicSchema, PublicSchema["Tables"][TableName]["Row"], T[]>,
    ) => PostgrestFilterBuilder<PublicSchema, PublicSchema["Tables"][TableName]["Row"], T[]>;
  } = {},
) {
  const queryClient = useQueryClient();
  const { order = "order_index", ascending = true } = options;

  const fetcher = async () => {
    let query = supabase.from(table).select("*") as unknown as PostgrestFilterBuilder<
      PublicSchema,
      PublicSchema["Tables"][TableName]["Row"],
      T[]
    >;
    if (options.filter) query = options.filter(query);
    const { data, error } = await query.order(order, { ascending });
    if (error) throw error;
    return data as T[];
  };

  const query = useQuery({
    queryKey: [table, options],
    queryFn: fetcher,
  });

  useEffect(() => {
    const channel = supabase
      .channel(`${table}-changes`)
      .on("postgres_changes", { event: "*", schema: "public", table: table }, () => {
        queryClient.invalidateQueries({ queryKey: [table] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, queryClient]);

  return query;
}

export function useSingleRecord<T>(table: TableName, keyColumn: string, keyValue: string) {
  const queryClient = useQueryClient();

  const fetcher = async () => {
    const { data, error } = await (supabase.from(table).select("*") as any)
      .eq(keyColumn, keyValue)
      .maybeSingle();
    if (error) throw error;
    return data as T;
  };

  const query = useQuery({
    queryKey: [table, keyColumn, keyValue],
    queryFn: fetcher,
  });

  useEffect(() => {
    const channel = supabase
      .channel(`${table}-${keyValue}-changes`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: `${keyColumn}=eq.${keyValue}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: [table, keyColumn, keyValue] });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, keyColumn, keyValue, queryClient]);

  return query;
}
