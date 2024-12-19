import { Text, View } from 'react-native';

import { Screen } from '~/components/screen';
export default function HistoryScreen() {
  return (
    <Screen preset="auto">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">History</Text>
      </View>
    </Screen>
  );
}
