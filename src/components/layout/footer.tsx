'use client';

import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { useFooterLinks } from '@/config/footer-config';
import { useSocialLinks } from '@/config/social-config';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type React from 'react';

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const footerLinks = useFooterLinks();
  const socialLinks = useSocialLinks();

  return (
    <footer
      className={cn(
        'border-[#322123] border-t bg-[#080607] text-[#F6FBFF]',
        className
      )}
    >
      <Container className="px-4">
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-6">
          <div className="flex flex-col items-start col-span-full md:col-span-2">
            <div className="space-y-4">
              {/* logo and name */}
              <div className="items-center space-x-2 flex">
                <Logo />
                <span className="font-display text-lg font-bold tracking-wide">
                  {t('Metadata.name')}
                </span>
              </div>

              {/* tagline */}
              <p className="py-2 text-base text-[#B8AAA5] md:pr-12">
                {t('Marketing.footer.tagline')}
              </p>

              {/* social links */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  {socialLinks?.map((link) => (
                    <a
                      key={link.title}
                      href={link.href || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.title}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#322123] text-[#B8C8D8] hover:border-[#67F7D3] hover:bg-[#101827] hover:text-[#F6FBFF]"
                    >
                      <span className="sr-only">{link.title}</span>
                      {link.icon ? link.icon : null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* footer links */}
          {footerLinks?.map((section) => (
            <div
              key={section.title}
              className={cn(
                'items-start',
                section.layout === 'inline'
                  ? 'col-span-full md:col-span-full'
                  : 'col-span-1 md:col-span-1'
              )}
            >
              <span className="font-display text-xs font-bold uppercase tracking-[0.18em]">
                {section.title}
              </span>
              <ul
                className={cn(
                  'mt-4',
                  section.layout === 'inline'
                    ? 'flex flex-wrap items-center gap-4'
                    : 'list-inside space-y-3'
                )}
              >
                {section.items?.map(
                  (item) =>
                    item.href && (
                      <li key={item.title}>
                        {item.isImage ? (
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noreferrer' : undefined}
                            title={item.linkTitle}
                            className="inline-flex"
                          >
                            <img
                              src={item.imageSrc}
                              alt={item.imageAlt || item.title}
                              width={item.imageWidth}
                              height={item.imageHeight}
                              className="h-auto w-auto max-h-[54px] transition-opacity hover:opacity-80"
                            />
                          </a>
                        ) : (
                          <LocaleLink
                            href={item.href || '#'}
                            target={item.external ? '_blank' : undefined}
                            title={item.linkTitle}
                            className={cn(
                              'text-sm text-[#B8AAA5] hover:text-[#F4B942]',
                              section.layout === 'inline' && 'whitespace-nowrap'
                            )}
                          >
                            {item.title}
                          </LocaleLink>
                        )}
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-[#322123] border-t py-8">
        <Container className="px-4 flex items-center justify-between gap-x-4">
          <span className="text-[#B8AAA5] text-sm">
            &copy; {new Date().getFullYear()} {t('Metadata.name')} All Rights
            Reserved.
          </span>

          <span className="text-[#B8AAA5] text-sm">
            Independent guide site. Not affiliated with Roblox or the Universal
            Tower Defense creator group.
          </span>
        </Container>
      </div>
    </footer>
  );
}
