'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  src: string;
  className?: string;
}

export function HeroVideo({ src, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/50 animate-pulse" />
      )}
    </div>
  );
}
