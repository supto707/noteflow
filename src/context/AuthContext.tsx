import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { User, AuthError } from "@supabase/supabase-js";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data.user && !error) {
      await supabase.from("users").upsert({ id: data.user.id, email, name });
      const { data: workspace } = await supabase.from("workspaces").insert({
        name: `${name}'s Workspace`,
        slug: `${name.toLowerCase().replace(/\s+/g, "-")}-workspace`,
        owner_id: data.user.id,
        is_personal: true,
      }).select("id").single();
      if (workspace) {
        await supabase.from("workspace_members").insert({
          workspace_id: workspace.id,
          user_id: data.user.id,
          role: "owner",
          invited_by: data.user.id,
        });
      }
    }
    return { error };
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
