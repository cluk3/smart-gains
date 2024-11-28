import { cva } from 'class-variance-authority';
import { View, type ViewProps } from 'react-native';

import { Text } from './text';

const alertVariants = cva('group flex p-2 items-center justify-center rounded-md border', {
  variants: {
    variant: {
      default: 'border-primary text-primary-foreground',
      secondary: 'border-secondary text-secondary-foreground',
      destructive: 'border-destructive text-destructive',
    },
  },
});

const alertTextVariants = cva('font-medium text-lg', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
    },
  },
});

export const Alert = ({ className, children, variant, ...props }: ViewProps) => (
  <View className={alertVariants({ variant, className })} {...props}>
    <Text className={alertTextVariants({ variant })}>{children}</Text>
  </View>
);
