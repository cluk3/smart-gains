import { View } from 'react-native';

import { Screen } from '~/components/screen';
import { Text } from '~/components/ui/text';

export default function TrainScreen() {
  return (
    <Screen preset="auto">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Train</Text>
      </View>
    </Screen>
  );
}
