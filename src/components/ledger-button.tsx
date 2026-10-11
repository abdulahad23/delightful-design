import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'normal' | 'small' | 'icon'; asChild?: boolean };
export function Button({ className, variant = 'secondary', size = 'normal', asChild, ...props }: Props) {
  const Component = asChild ? Slot : 'button';
  return <Component className={cn('ld-button', `ld-button-${variant}`, `ld-button-${size}`, className)} {...props} />;
}