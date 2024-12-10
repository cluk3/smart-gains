import { View, type ViewProps } from 'react-native';
import { type SafeAreaViewProps } from 'react-native-safe-area-context';

import { SafeAreaView } from '~/components/safe-area-view';
import { cn } from '~/lib/utils';
export const Container = ({ className, ...props }: SafeAreaViewProps) => {
  return (
    <SafeAreaView className={cn('flex flex-1 flex-col bg-background p-4', className)} {...props} />
  );
};

export function Center({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-1 flex-col items-center justify-center', className)}
      {...props}
    />
  );
}
