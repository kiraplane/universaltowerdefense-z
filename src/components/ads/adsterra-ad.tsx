import { type AdsterraSlotId, getAdsterraSlot } from '@/config/adsterra-ads';
import { cn } from '@/lib/utils';

interface AdsterraAdFrameProps {
  slot: AdsterraSlotId;
  className?: string;
  frameClassName?: string;
  label?: boolean;
  loading?: 'eager' | 'lazy';
}

export function AdsterraAdFrame({
  slot,
  className,
  frameClassName,
  label = false,
  loading = 'lazy',
}: AdsterraAdFrameProps) {
  const ad = getAdsterraSlot(slot);

  if (!ad.enabled) {
    return null;
  }

  return (
    <div className={cn('flex w-full justify-center', className)}>
      <div style={{ maxWidth: `${ad.width}px`, width: '100%' }}>
        {label ? (
          <div
            className="mb-2 text-center text-xs"
            style={{ color: '#F4B942' }}
          >
            Advertisement
          </div>
        ) : null}
        <iframe
          src={`/ads/${ad.id}.html`}
          width={ad.width}
          height={ad.height}
          loading={loading}
          scrolling="no"
          title={ad.title}
          className={cn('block max-w-full border-0', frameClassName)}
          style={{ backgroundColor: '#080607' }}
        />
      </div>
    </div>
  );
}

export function AdsterraTopBanner() {
  const ad = getAdsterraSlot('banner-320x50');

  if (!ad.enabled) {
    return null;
  }

  return (
    <div
      className="border-b py-2"
      style={{ backgroundColor: '#080607', borderColor: '#322123' }}
    >
      <AdsterraAdFrame slot="banner-320x50" loading="eager" />
    </div>
  );
}

export function AdsterraNativeBanner({ className }: { className?: string }) {
  return (
    <AdsterraAdFrame
      slot="native-banner"
      className={cn('py-4', className)}
      label
    />
  );
}

export function AdsterraAdStack({ className }: { className?: string }) {
  const slots: AdsterraSlotId[] = [
    'banner-728x90',
    'banner-300x250',
    'banner-468x60',
  ];
  const enabledSlot = slots.find((slot) => getAdsterraSlot(slot).enabled);

  if (!enabledSlot) {
    return null;
  }

  return (
    <aside className={cn('space-y-8', className)} aria-label="Advertisement">
      <div className="text-center text-xs" style={{ color: '#F4B942' }}>
        Advertisement
      </div>
      <AdsterraAdFrame slot={enabledSlot} />
    </aside>
  );
}

const SIDE_RAIL_CONTAINER_WIDTH = 1280;
const SIDE_RAIL_WIDTH = 160;
const SIDE_RAIL_GAP = 24;
const sideRailOffset = `calc((100vw - ${SIDE_RAIL_CONTAINER_WIDTH}px) / 2 - ${
  SIDE_RAIL_WIDTH + SIDE_RAIL_GAP
}px)`;

export function AdsterraSideRails() {
  const left = getAdsterraSlot('sidebar-160x600');
  const right = getAdsterraSlot('sidebar-160x300');

  if (!left.enabled && !right.enabled) {
    return null;
  }

  return (
    <aside
      className="pointer-events-none hidden [@media(min-width:1700px)]:block"
      aria-hidden
    >
      {left.enabled ? (
        <div
          className="pointer-events-auto fixed top-[88px] z-20 w-40"
          style={{ left: sideRailOffset }}
        >
          <AdsterraAdFrame slot="sidebar-160x600" />
        </div>
      ) : null}
      {right.enabled ? (
        <div
          className="pointer-events-auto fixed top-[88px] z-20 w-40"
          style={{ right: sideRailOffset }}
        >
          <AdsterraAdFrame slot="sidebar-160x300" />
        </div>
      ) : null}
    </aside>
  );
}
