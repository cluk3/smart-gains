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
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
