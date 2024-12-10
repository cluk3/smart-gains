import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';

import { colors } from '~/constants/colors';
import { useColorScheme } from '~/lib/useColorScheme';

export const unstable_settings = {
  initialRouteName: '(root)',
};

const getCommonHeaderStyle = (colorScheme: 'light' | 'dark') => ({
  headerStyle: {
    backgroundColor: colors[colorScheme].background,
  },
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
  headerTintColor: colors[colorScheme].foreground,
  gestureEnabled: true,
});

export default function AppLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="welcome" />
        <Stack.Screen
          name="sign-up"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Sign Up',
            ...getCommonHeaderStyle(colorScheme),
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Sign In',
            ...getCommonHeaderStyle(colorScheme),
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Modal',
            ...getCommonHeaderStyle(colorScheme),
          }}
        />
      </Stack>
      <PortalHost />
    </>
  );
}
