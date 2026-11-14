// SVGR (next.config.js) turns `*.svg` imports into React components.
declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const Icon: FC<SVGProps<SVGSVGElement> & { title?: string }>;
  export default Icon;
}
