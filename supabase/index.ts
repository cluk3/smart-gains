import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import type { Database } from './types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const options =
  Platform.OS === 'web'
    ? {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    : {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      };

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, options);
