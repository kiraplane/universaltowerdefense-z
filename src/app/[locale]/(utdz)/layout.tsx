import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { UtdzPageShell } from '@/components/utdz/wiki-navigation';
import type { ReactNode } from 'react';

export default function UtdzLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#080607]">
      <Navbar scroll={true} />
      <main className="flex-1">
        <UtdzPageShell>{children}</UtdzPageShell>
      </main>
      <Footer />
    </div>
  );
}
