import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

const sizeClasses = { 32: 'size-8', 40: 'size-10' } as const;

interface AvatarStackProps {
  avatars: readonly StaticImageData[];
  size: keyof typeof sizeClasses;
  borderClassName?: string;
}

export function AvatarStack({
  avatars,
  size,
  borderClassName,
}: AvatarStackProps) {
  return (
    <div className='flex -space-x-2'>
      {avatars.map((avatar) => (
        <Image
          key={avatar.src}
          src={avatar}
          alt=''
          width={size}
          height={size}
          className={cn(
            'rounded-full border-2 bg-primary-blue-light object-cover',
            sizeClasses[size],
            borderClassName,
          )}
        />
      ))}
    </div>
  );
}
