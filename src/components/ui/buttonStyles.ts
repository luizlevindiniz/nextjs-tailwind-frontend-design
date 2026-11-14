import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'onBlue';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-blue text-text-white-primary outline-primary-blue hover:bg-primary-blue/90',
  // A ring, unlike a border, adds no height.
  secondary:
    'bg-background-white text-text-primary outline-primary-blue inset-ring inset-ring-line-1 hover:inset-ring-text-tertiary',
  onBlue:
    'bg-secondary-yellow text-text-primary outline-text-white-primary hover:bg-secondary-yellow/90',
};

export function buttonClasses(variant: ButtonVariant, className?: string) {
  return cn(
    'inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-center text-mobile-body-1 font-bold lg:text-desktop-body-1',
    'focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors',
    variants[variant],
    className,
  );
}
