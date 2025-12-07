import { ReactNode } from 'react';
import { Sidebar } from './sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-4 pb-16 md:ml-60 md:p-8 md:pb-16">
        {children}
      </main>

      {/* Fixed Footer Branding */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-10 items-center justify-center border-t border-neutral-100 bg-white/80 backdrop-blur-sm md:left-60">
        <p className="text-xs text-neutral-400">
          Powered by{' '}
          <a
            href="https://mastrovia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-500 transition-colors hover:text-emerald-600"
          >
            mastrovia.com
          </a>
        </p>
      </div>
    </div>
  );
}
