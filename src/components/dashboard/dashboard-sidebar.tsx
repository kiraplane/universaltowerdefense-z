'use client';

import { SidebarMain } from '@/components/dashboard/sidebar-main';
import { SidebarUser } from '@/components/dashboard/sidebar-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useSidebarLinks } from '@/config/sidebar-config';
import { LocaleLink } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import type { User } from '@/lib/auth-types';
import { Routes } from '@/routes';
import { useTranslations } from 'next-intl';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { Logo } from '../layout/logo';
import { UpgradeCard } from './upgrade-card';

/**
 * Dashboard sidebar
 */
export function DashboardSidebar({
  initialUser = null,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  initialUser?: User | null;
}) {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const currentUser = initialUser
    ? ({
        ...initialUser,
        ...session?.user,
        role: session?.user?.role ?? initialUser.role,
      } as User)
    : (session?.user as User | undefined);
  const { state } = useSidebar();
  // console.log('sidebar currentUser:', currentUser);

  const sidebarLinks = useSidebarLinks();
  const filteredSidebarLinks = sidebarLinks
    .map((link) => ({
      ...link,
      items: link.items?.filter((item) => {
        if (item.authorizeOnly) {
          return item.authorizeOnly.includes(currentUser?.role || '');
        }
        return true;
      }),
    }))
    .filter((link) => {
      if (link.authorizeOnly) {
        return link.authorizeOnly.includes(currentUser?.role || '');
      }

      if (link.items) {
        return link.items.length > 0;
      }

      return true;
    });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <LocaleLink href={Routes.Root}>
                <Logo className="size-5" />
                <span className="truncate font-semibold text-base">
                  {t('Metadata.name')}
                </span>
              </LocaleLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {!isPending && mounted && <SidebarMain items={filteredSidebarLinks} />}
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-4">
        {/* Only show UI components when not in loading state */}
        {!isPending && mounted && (
          <>
            {/* show upgrade card if user is not a member, and sidebar is not collapsed */}
            {currentUser && state !== 'collapsed' && <UpgradeCard />}

            {/* show user profile if user is logged in */}
            {currentUser && <SidebarUser user={currentUser} />}
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
