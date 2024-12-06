import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';
import { tv } from 'tailwind-variants';

import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const buttonVariants = tv({
  base: 'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  variants: {
    variant: {
      default: '',
      outline: 'border bg-background',
      ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
      link: 'web:underline-offset-4 web:hover:underline web:focus:underline ',
    },
    size: {
      default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8 native:h-14',
      icon: 'h-10 w-10',
    },
    color: {
      default: 'bg-border web:hover:opacity-90 active:opacity-90',
      primary: 'bg-primary web:hover:opacity-90 active:opacity-90',
      secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
      accent: 'bg-accent web:hover:opacity-80 active:opacity-80',
      destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      color: 'default',
      className:
        'border-border bg-background web:hover:bg-border/60 web:hover:text-foreground active:bg-border/60',
    },
    {
      variant: 'outline',
      color: 'primary',
      className:
        'border-primary web:hover:bg-primary/60 web:hover:text-primary-foreground active:bg-primary/60',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className:
        'border-secondary web:hover:bg-secondary/60 web:hover:text-secondary-foreground active:bg-secondary/60',
    },
    {
      variant: 'outline',
      color: 'accent',
      className:
        'border-accent web:hover:bg-accent/60 web:hover:text-accent-foreground active:bg-accent/60',
    },
    {
      variant: 'outline',
      color: 'destructive',
      className:
        'border-destructive web:hover:bg-destructive/60 web:hover:text-destructive-foreground active:bg-destructive/60',
    },
  ],
  defaultVariants: {
    variant: 'default',
    color: 'primary',
    size: 'default',
  },
});

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <TextClassContext.Provider
        value={buttonTextVariants({ variant, size, className: 'web:pointer-events-none' })}>
        <Pressable
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role="button"
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
