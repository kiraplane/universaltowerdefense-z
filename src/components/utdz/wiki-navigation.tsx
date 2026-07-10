'use client';

import { Badge } from '@/components/ui/badge';
import { activeCodes } from '@/data/utdz/codes';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  Download,
  Gem,
  Layers3,
  RadioTower,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface WikiNavLink {
  href: string;
  label: string;
}

interface WikiNavGroup {
  title: string;
  icon: typeof BookOpen;
  links: WikiNavLink[];
  activePrefixes?: string[];
}

const wikiNavGroups: WikiNavGroup[] = [
  {
    title: 'Start Here',
    icon: Compass,
    links: [
      { href: '/', label: 'Home' },
      { href: '/updates/update-4', label: 'Update 4.0' },
      { href: '/guides/beginner-guide', label: 'Beginner Guide' },
      { href: '/download', label: 'Official Roblox' },
    ],
  },
  {
    title: 'Rewards & Events',
    icon: RadioTower,
    links: [
      { href: '/codes', label: 'Active Codes' },
      { href: '/guides/summer-event', label: 'Summer Event' },
      { href: '/guides/spider-extraction', label: 'Spider Extraction' },
      { href: '/guides/crime-fighting', label: 'Crime Fighting' },
    ],
  },
  {
    title: 'Units & Teams',
    icon: Users,
    links: [
      { href: '/tier-list', label: 'Tier List' },
      { href: '/units', label: 'Units Database' },
      { href: '/best-team', label: 'Best Team' },
      { href: '/guides/update-4-new-units', label: 'Update 4 New Units' },
      { href: '/guides/best-units-to-build-first', label: 'Build First' },
    ],
    activePrefixes: ['/units'],
  },
  {
    title: 'Build Systems',
    icon: Sparkles,
    links: [
      { href: '/traits', label: 'Traits' },
      { href: '/relics', label: 'Relics' },
      { href: '/guides/reroll-strategy', label: 'Reroll Strategy' },
      { href: '/guides/update-4-synchros', label: 'Synchro Guide' },
      { href: '/guides/builds-guide', label: 'Build Guide' },
    ],
  },
  {
    title: 'Progression',
    icon: Swords,
    links: [
      { href: '/guides/story-mode', label: 'Story Mode' },
      { href: '/guides/meta-guide', label: 'Meta Guide' },
      { href: '/guides/merciless-god', label: 'Merciless God' },
      { href: '/updates/universal-fest-p2', label: 'Universal Fest Archive' },
    ],
  },
  {
    title: 'Guides & Identity',
    icon: BookOpen,
    links: [
      { href: '/guides', label: 'All Guides' },
      { href: '/guides/update-4-overview', label: 'Update 4 Start Guide' },
      { href: '/guides/utdx-to-utdz', label: 'UTDX to UTDZ' },
      { href: '/guides/discord-community-guide', label: 'Discord & Community' },
    ],
    activePrefixes: ['/guides'],
  },
];

const iconMap = {
  '/updates/update-4': Layers3,
  '/codes': RadioTower,
  '/tier-list': Trophy,
  '/units': Users,
  '/best-team': Swords,
  '/traits': Sparkles,
  '/relics': Gem,
  '/guides': BookOpen,
  '/download': Download,
};

function isCurrentPath(currentPath: string | undefined, href: string) {
  return Boolean(currentPath && currentPath === href);
}

function isGroupCurrentPath(
  currentPath: string | undefined,
  group: WikiNavGroup
) {
  if (!currentPath) return false;
  return (
    group.links.some((link) => isCurrentPath(currentPath, link.href)) ||
    Boolean(
      group.activePrefixes?.some(
        (prefix) =>
          currentPath === prefix || currentPath.startsWith(`${prefix}/`)
      )
    )
  );
}

function WikiNavLinkItem({
  currentPath,
  href,
  label,
}: {
  currentPath?: string;
  href: string;
  label: string;
}) {
  const isActive = isCurrentPath(currentPath, href);
  const Icon = iconMap[href as keyof typeof iconMap] ?? ArrowRight;
  return (
    <LocaleLink
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group flex min-w-0 items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm leading-5 transition',
        isActive
          ? 'border-[#E23A2E] bg-[#E23A2E] font-semibold text-white'
          : 'border-white/10 bg-[#171112] text-[#D8CCC7] hover:border-[#E23A2E]/60 hover:bg-[#241718] hover:text-white'
      )}
    >
      <span className="inline-flex min-w-0 items-center gap-2">
        <Icon className="size-4 shrink-0" />
        <span className="min-w-0 whitespace-normal break-words text-left">
          {label}
        </span>
      </span>
      <ArrowRight
        className={cn(
          'size-4 shrink-0',
          isActive ? 'text-white' : 'text-[#F4B942]'
        )}
      />
    </LocaleLink>
  );
}

function CodesSidebarCard() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#171112] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display font-bold text-lg text-white">
          Codes Status
        </h2>
        <Badge className="bg-[#F4B942] text-[#1B0A08]">
          {activeCodes.length} active
        </Badge>
      </div>
      <p className="text-[#B8AAA5] text-xs leading-5">
        Update 4 codes checked July 10. Copy punctuation exactly in a current
        server.
      </p>
      <LocaleLink
        href="/codes"
        className="mt-4 flex items-center justify-center gap-2 border-white/10 border-t pt-3 font-medium text-[#F4EDE4] text-sm hover:text-[#F4B942]"
      >
        Copy current codes
        <ArrowRight className="size-4" />
      </LocaleLink>
    </div>
  );
}

export function UtdzMobileMenu({ currentPath }: { currentPath?: string }) {
  return (
    <details className="mx-4 mb-6 rounded-lg border border-white/10 bg-[#120D0E] p-4 shadow-sm lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <Compass className="size-5 text-[#F4B942]" />
          UTDZ Wiki Menu
        </span>
        <ChevronDown className="size-5" />
      </summary>
      <div className="mt-4 grid gap-4">
        {wikiNavGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title}>
              <h2 className="mb-2 flex items-center gap-2 font-semibold text-[#B8AAA5] text-xs uppercase">
                <Icon className="size-4" />
                {group.title}
              </h2>
              <div className="grid gap-2">
                {group.links.map((link) => (
                  <WikiNavLinkItem
                    key={link.href}
                    currentPath={currentPath}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}

export function UtdzRouteSidebar({ currentPath }: { currentPath?: string }) {
  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-[276px] shrink-0 self-start overflow-y-auto rounded-lg border border-white/10 bg-[#100B0C] p-4 shadow-xl shadow-black/20 lg:block">
      <div className="mb-4 rounded-lg bg-gradient-to-br from-[#3A1111] to-[#160B0C] p-4 text-white">
        <p className="font-semibold text-[#F4B942] text-xs uppercase">
          Universal Tower Defense Z
        </p>
        <h2 className="mt-1 font-display font-black text-xl">
          Wiki Route Board
        </h2>
        <p className="mt-2 text-[#D8CCC7] text-xs leading-5">
          Update 4, codes, units, builds, events, and progression.
        </p>
      </div>
      <div className="space-y-3">
        {wikiNavGroups.map((group) => {
          const Icon = group.icon;
          const isOpen = isGroupCurrentPath(currentPath, group);
          return (
            <details key={group.title} open={isOpen} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-2 font-semibold text-[#D8CCC7] text-sm hover:bg-[#241718] [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-[#F4B942]" />
                  {group.title}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-white/10 text-[#B8AAA5]"
                  >
                    {group.links.length}
                  </Badge>
                  <ChevronDown className="size-4 transition group-open:rotate-180" />
                </span>
              </summary>
              <div className="mt-2 grid gap-2">
                {group.links.map((link) => (
                  <WikiNavLinkItem
                    key={link.href}
                    currentPath={currentPath}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </div>
            </details>
          );
        })}
      </div>
      <div className="mt-4">
        <CodesSidebarCard />
      </div>
    </aside>
  );
}

export function UtdzPageShell({ children }: { children: ReactNode }) {
  const currentPath = useLocalePathname();

  if (currentPath === '/') return <>{children}</>;

  return (
    <>
      <UtdzMobileMenu currentPath={currentPath} />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_276px]">
        <div className="min-w-0">{children}</div>
        <UtdzRouteSidebar currentPath={currentPath} />
      </div>
    </>
  );
}
