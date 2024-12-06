import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClientOptions } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import type { Database } from './types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const options: SupabaseClientOptions<'public'> = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      log_level: 'info',
    },
  },
};

if (Platform.OS !== 'web') {
  options.auth!.storage = AsyncStorage;
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, options);
