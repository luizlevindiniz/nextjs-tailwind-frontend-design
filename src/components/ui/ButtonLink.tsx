import type { ComponentPropsWithoutRef } from 'react';

import { buttonClasses, type ButtonVariant } from './buttonStyles';

interface ButtonLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  variant?: ButtonVariant;
}

/** A link styled as a button. Targets are in-page anchors, so it's a plain `<a>`. */
export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ButtonLinkProps) {
  return <a className={buttonClasses(variant, className)} {...props} />;
}
