'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  poster?: string;
  rootMargin?: string;
  /** If true, load and play immediately without waiting for intersection */
  eager?: boolean;
}

export function LazyVideo({
  src,
  className,
  loop = true,
  muted = true,
  playsInline = true,
  autoPlay = true,
  poster,
  rootMargin = '200px',
  eager = false,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (eager) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, rootMargin]);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;
    video.src = src;
    video.load();

    if (autoPlay) {
      video.play().catch(() => {});
    }
  }, [isVisible, src, autoPlay]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {isVisible ? (
        <>
          {/* biome-ignore lint/a11y/useMediaCaption: Decorative auto-play video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload="none"
            poster={poster}
            onLoadedData={() => setIsLoaded(true)}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted/50 animate-pulse" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-muted/30 animate-pulse" />
      )}
    </div>
  );
}
