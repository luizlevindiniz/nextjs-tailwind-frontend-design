import type { ComponentPropsWithoutRef } from 'react';

import { buttonClasses, type ButtonVariant } from './buttonStyles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

/** An action. For navigation that looks like a button, use `ButtonLink`. */
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
