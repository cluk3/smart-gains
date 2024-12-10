import { Stack } from 'expo-router';

import { colors } from '~/constants/colors';
import { useColorScheme } from '~/lib/useColorScheme';

export const unstable_settings = {
  initialRouteName: '(root)',
};

export default function RoutinesLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="routines"
        options={{
          headerShown: true,
          headerTitle: 'Routine',
          headerBackTitle: 'Home',
          headerStyle: {
            backgroundColor: colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: colors[colorScheme].foreground,
        }}
      />
      <Stack.Screen
        name="exercises/[exerciseId]"
        options={{
          headerShown: true,
          headerTitle: 'Exercise',
          headerStyle: {
            backgroundColor: colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: colors[colorScheme].foreground,
        }}
      />
      <Stack.Screen
        name="track"
        options={{
          headerShown: true,
          headerTitle: 'Track',
          headerStyle: {
            backgroundColor: colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: colors[colorScheme].foreground,
        }}
      />
    </Stack>
  );
}
