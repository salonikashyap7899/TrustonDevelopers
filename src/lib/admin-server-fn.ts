import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const checkAdminStatus = createServerFn({ method: "POST" })
  .inputValidator((userId: unknown) => {
    if (typeof userId !== "string" || !userId) throw new Error("Invalid userId");
    return userId;
  })
  .handler(async ({ data: userId }) => {
    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) return { isAdmin: false };
    return { isAdmin: !!roles?.some((r) => r.role === "admin") };
  });

export const ensureFirstAdmin = createServerFn({ method: "POST" })
  .inputValidator((userId: unknown) => {
    if (typeof userId !== "string" || !userId) throw new Error("Invalid userId");
    return userId;
  })
  .handler(async ({ data: userId }) => {
    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .limit(1);

    if (existing && existing.length > 0) {
      return { success: true, reason: "already_admin" };
    }

    const { data: admins } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .limit(1);

    if (admins && admins.length > 0) {
      return { success: false, reason: "admin_exists" };
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (insertError) {
      return { success: false, reason: insertError.message };
    }

    return { success: true };
  });
