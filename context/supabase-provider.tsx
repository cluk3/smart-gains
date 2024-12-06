import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '~/supabase';

type SupabaseContextProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type SupabaseProviderProps = {
  children: React.ReactNode;
} & SupabaseContextProps;

export const SupabaseContext = createContext<SupabaseContextProps>({
  user: null,
  session: null,
  initialized: false,
  signUp: async () => {},
  signInWithPassword: async () => {},
  signOut: async () => {},
});

export const useSupabase = () => useContext(SupabaseContext);

export function useSupabaseInit(): SupabaseContextProps {
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('onAuthStateChange', session);
      setSession(session);
      setUser(session ? session.user : null);
    });
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inProtectedGroup = segments[1] === '(protected)';

    if (session && !inProtectedGroup) {
      console.log('login');
      router.replace('/(app)/(protected)/(tabs)');
    } else if (!session) {
      console.log('onlogout');

      router.replace('/(app)/welcome');
    }
  }, [initialized, session]);
  return { user, session, initialized, signUp, signInWithPassword, signOut };
}

export const SupabaseProvider = ({
  children,
  user,
  session,
  initialized,
  signUp,
  signInWithPassword,
  signOut,
}: SupabaseProviderProps) => {
  return (
    <SupabaseContext.Provider
      value={{
        user,
        session,
        initialized,
        signUp,
        signInWithPassword,
        signOut,
      }}>
      {children}
    </SupabaseContext.Provider>
  );
};
