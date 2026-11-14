import type { ComponentPropsWithoutRef } from 'react';

import { buttonClasses, type ButtonVariant } from './buttonStyles';

interface ButtonLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  variant?: ButtonVariant;
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ButtonLinkProps) {
  return <a className={buttonClasses(variant, className)} {...props} />;
}
