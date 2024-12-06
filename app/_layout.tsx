import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NAV_THEME } from '~/constants/colors';
import { SupabaseProvider, useSupabaseInit } from '~/context/supabase-provider';
import { useColorScheme } from '~/lib/useColorScheme';
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  // @ts-expect-error TODO fix fonts
  fonts: {},
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  // @ts-expect-error TODO fix fonts
  fonts: {},
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const queryClient = new QueryClient();
  const sup = useSupabaseInit();

  console.log('colorScheme', colorScheme);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
      }
    })().finally(() => {
      setIsColorSchemeLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    if (sup.initialized && isColorSchemeLoaded) {
      console.log('hide splash');
      SplashScreen.hideAsync();
    }
  }, [sup.initialized, isColorSchemeLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <SupabaseProvider {...sup}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
          </GestureHandlerRootView>
        </SupabaseProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
