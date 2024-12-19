import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { Platform } from 'react-native';

import { Text } from './text';

import { Check } from '~/lib/icons/Check';
import { cn } from '~/lib/utils';

type CheckboxProps = CheckboxPrimitive.RootProps & { uncheckedText?: string };

const Checkbox = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxProps>(
  ({ className, uncheckedText, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'web:peer native:size-[20] native:rounded h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary disabled:cursor-not-allowed disabled:opacity-50 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.checked && 'bg-primary',
          className
        )}
        {...props}>
        {props.checked ? (
          <CheckboxPrimitive.Indicator className={cn('h-full w-full items-center justify-center')}>
            <Check
              size={12}
              strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
              className="text-primary-foreground"
            />
          </CheckboxPrimitive.Indicator>
        ) : (
          uncheckedText && (
            <Text className="text-center align-middle font-medium leading-5 text-primary">
              {uncheckedText}
            </Text>
          )
        )}
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
