import { useLocalSearchParams } from 'expo-router';

import { Screen } from '~/components/screen';
import { Text } from '~/components/ui/text';
import { H2 } from '~/components/ui/typography';

export default function RoutineScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen preset="auto" contentContainerClassName="flex-1 p-4">
      <H2>Well Done!</H2>
      <Text>You completed the workout {id}</Text>
    </Screen>
  );
}
