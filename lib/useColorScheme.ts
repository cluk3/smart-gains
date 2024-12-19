import { useColorScheme as useNativewindColorScheme } from 'nativewind';

import { colors } from '~/constants/colors';

export function useColorScheme() {
  const {
    colorScheme: _colorScheme,
    setColorScheme,
    toggleColorScheme,
  } = useNativewindColorScheme();

  const colorScheme = _colorScheme ?? 'dark';
  return {
    colorScheme,
    colors: colors[colorScheme],
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
