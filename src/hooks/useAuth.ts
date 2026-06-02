import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ensureFirstAdmin, checkAdminStatus } from "@/lib/admin-server-fn";

async function resolveAdminStatus(userId: string): Promise<boolean> {
  try {
    await ensureFirstAdmin({ data: userId });
  } catch {
    // Not the first user, or assignment already done — that's fine
  }

  try {
    const { isAdmin } = await checkAdminStatus({ data: userId });
    return isAdmin;
  } catch {
    return false;
  }
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const handleUser = async (u: User | null) => {
      if (!isMounted) return;
      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const admin = await resolveAdminStatus(u.id);
      if (isMounted) {
        setIsAdmin(admin);
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }
      handleUser(s?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }
      handleUser(s?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading };
}
