import type { ComponentPropsWithoutRef } from 'react';

import { buttonClasses, type ButtonVariant } from './buttonStyles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
