'use client';

import { websiteConfig } from '@/config/website';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const logoLight = websiteConfig.metadata.images?.logoLight ?? '/logo.png';
  const logoDark = websiteConfig.metadata.images?.logoDark ?? logoLight;

  // During server-side rendering and initial client render, always use logoLight
  // This prevents hydration mismatch
  const logo = mounted && theme === 'dark' ? logoDark : logoLight;

  // Only show theme-dependent UI after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Image
      src={logo}
      alt="Universal Tower Defense Z Wiki logo"
      title="Universal Tower Defense Z Wiki"
      width={96}
      height={96}
      priority
      className={cn(
        'h-9 w-auto rounded-sm bg-[#170908] object-contain',
        className
      )}
    />
  );
}
