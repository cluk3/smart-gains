import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';

import { SupabaseProvider, useSupabaseInit } from '~/context/supabase-provider';
import { NAV_THEME } from '~/lib/constants';
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

  const sup = useSupabaseInit();

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }

      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  React.useEffect(() => {
    if (sup.initialized && isColorSchemeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [sup.initialized]);

  if (!isColorSchemeLoaded || !sup.initialized) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <SupabaseProvider {...sup}>
        <Slot />
      </SupabaseProvider>
    </ThemeProvider>
  );
}
