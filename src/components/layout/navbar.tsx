'use client';

import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { NavbarMobile } from '@/components/layout/navbar-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useNavbarLinks } from '@/config/navbar-config';
import { useScroll } from '@/hooks/use-scroll';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './locale-switcher';

interface NavBarProps {
  scroll?: boolean;
}

const customNavigationMenuTriggerStyle = cn(
  navigationMenuTriggerStyle(),
  'relative cursor-pointer bg-transparent text-base text-[#CDBDB7]',
  'hover:bg-white/5 hover:text-[#F4B942]',
  'focus:bg-white/5 focus:text-[#F4B942]',
  'data-active:bg-transparent data-active:font-semibold data-active:text-[#F4B942]',
  'data-[state=open]:bg-white/5 data-[state=open]:text-[#F4B942]'
);

function isCurrentPathActive(pathname: string, href?: string) {
  if (!href) {
    return false;
  }

  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Navbar({ scroll }: NavBarProps) {
  const t = useTranslations();
  const scrolled = useScroll(50);
  const menuLinks = useNavbarLinks();
  const localePathname = useLocalePathname();

  return (
    <section
      className={cn(
        'sticky inset-x-0 top-0 z-40 border-[#322123] border-b py-4 text-white transition-all duration-300',
        scroll
          ? scrolled
            ? 'bg-[#0E090A]/95 backdrop-blur-md supports-backdrop-filter:bg-[#0E090A]/95'
            : 'bg-[#0E090A]/90 backdrop-blur-md'
          : 'bg-[#0E090A]/95 backdrop-blur-md'
      )}
    >
      <Container className="px-4">
        {/* desktop navbar */}
        <nav className="hidden lg:flex">
          {/* logo and name */}
          <div className="flex items-center">
            <LocaleLink href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-display text-lg font-bold tracking-wide text-white">
                {t('Metadata.name')}
              </span>
            </LocaleLink>
          </div>

          {/* menu links */}
          <div className="flex-1 flex items-center justify-center space-x-2">
            <NavigationMenu className="relative">
              <NavigationMenuList className="flex items-center">
                {menuLinks?.map((item, index) =>
                  item.items ? (
                    <NavigationMenuItem key={index} className="relative">
                      <NavigationMenuTrigger
                        data-active={
                          isCurrentPathActive(localePathname, item.href) ||
                          item.items.some((subItem) =>
                            isCurrentPathActive(localePathname, subItem.href)
                          )
                            ? 'true'
                            : undefined
                        }
                        className={customNavigationMenuTriggerStyle}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items?.map((subItem, subIndex) => {
                            const isSubItemActive =
                              subItem.href &&
                              localePathname.startsWith(subItem.href);
                            return (
                              <li key={subIndex}>
                                <NavigationMenuLink asChild>
                                  <LocaleLink
                                    href={subItem.href || '#'}
                                    target={
                                      subItem.external ? '_blank' : undefined
                                    }
                                    rel={
                                      subItem.external
                                        ? 'noopener noreferrer'
                                        : undefined
                                    }
                                    className={cn(
                                      'group flex select-none flex-row items-center gap-4 rounded-md',
                                      'p-2 leading-none no-underline outline-hidden transition-colors',
                                      'hover:bg-primary/10 hover:text-primary',
                                      'focus:bg-primary/10 focus:text-primary',
                                      isSubItemActive &&
                                        'bg-primary/10 text-primary'
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        'flex size-8 shrink-0 items-center justify-center transition-colors',
                                        'bg-transparent text-muted-foreground',
                                        'group-hover:bg-transparent group-hover:text-primary',
                                        'group-focus:bg-transparent group-focus:text-primary',
                                        isSubItemActive &&
                                          'bg-transparent text-primary'
                                      )}
                                    >
                                      {subItem.icon ? subItem.icon : null}
                                    </div>
                                    <div className="flex-1">
                                      <div
                                        className={cn(
                                          'text-sm font-medium text-muted-foreground',
                                          'group-hover:bg-transparent group-hover:text-primary',
                                          'group-focus:bg-transparent group-focus:text-primary',
                                          isSubItemActive &&
                                            'bg-transparent text-primary'
                                        )}
                                      >
                                        {subItem.title}
                                      </div>
                                      {subItem.description && (
                                        <div
                                          className={cn(
                                            'text-sm text-muted-foreground',
                                            'group-hover:bg-transparent group-hover:text-primary/80',
                                            'group-focus:bg-transparent group-focus:text-primary/80',
                                            isSubItemActive &&
                                              'bg-transparent text-primary/80'
                                          )}
                                        >
                                          {subItem.description}
                                        </div>
                                      )}
                                    </div>
                                    {subItem.external && (
                                      <ArrowUpRightIcon
                                        className={cn(
                                          'size-4 shrink-0 text-muted-foreground',
                                          'group-hover:bg-transparent group-hover:text-primary',
                                          'group-focus:bg-transparent group-focus:text-primary',
                                          isSubItemActive &&
                                            'bg-transparent text-primary'
                                        )}
                                      />
                                    )}
                                  </LocaleLink>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        active={
                          item.href
                            ? isCurrentPathActive(localePathname, item.href)
                            : false
                        }
                        className={customNavigationMenuTriggerStyle}
                      >
                        <LocaleLink
                          href={item.href || '#'}
                          target={item.external ? '_blank' : undefined}
                          rel={
                            item.external ? 'noopener noreferrer' : undefined
                          }
                        >
                          {item.title}
                        </LocaleLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-x-4">
            <LocaleSwitcher />
          </div>
        </nav>

        {/* mobile navbar */}
        <NavbarMobile className="lg:hidden" />
      </Container>
    </section>
  );
}
