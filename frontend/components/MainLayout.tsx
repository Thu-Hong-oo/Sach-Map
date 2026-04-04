'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Users, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocaleContext } from '@/lib/context/LocaleContext';

type MainLayoutProps = {
  children?: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const { locale, messages, changeLocale } = useLocaleContext();
  const isMapRoute = pathname === '/map' || pathname.startsWith('/map/');
  const isLandingOrAuth = pathname === '/' || pathname === '/login' || pathname === '/signup' || pathname.startsWith('/(auth)');
  const showNavigation = !isLandingOrAuth;

  const navItems = [
    { href: '/home', key: 'home', icon: Home },
    { href: '/map', key: 'map', icon: Map },
    { href: '/community', key: 'community', icon: Users },
    { href: '/profile', key: 'profile', icon: User },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto px-4 py-6 ${showNavigation ? 'pb-[calc(5.25rem+env(safe-area-inset-bottom))]' : ''}`}>
        <div className="mx-auto h-full w-full max-w-sm">
          {showNavigation && <div className="mb-4 flex justify-end gap-2">
            <Button
              size="sm"
              variant={locale === 'vi' ? 'default' : 'outline'}
              className={locale === 'vi' ? 'bg-[#6B8E23] hover:bg-[#5a7620]' : ''}
              onClick={() => changeLocale('vi')}
            >
              VI
            </Button>
            <Button
              size="sm"
              variant={locale === 'en' ? 'default' : 'outline'}
              className={locale === 'en' ? 'bg-[#6B8E23] hover:bg-[#5a7620]' : ''}
              onClick={() => changeLocale('en')}
            >
              EN
            </Button>
          </div>}
          {children}
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      {showNavigation && !isMapRoute && (
        <div className="fixed left-1/2 -translate-x-1/2 z-40 bottom-[calc(4.75rem+env(safe-area-inset-bottom))]">
        <Button
          size="lg"
            className="h-14 w-14 rounded-full shadow-lg shadow-[#3f5613]/30 bg-[#6B8E23]/80 border-none"
          aria-label={messages.fab.reportNow}
          title={messages.fab.reportNow}
        >
          <Camera className="h-6 w-6" />
        </Button>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      {showNavigation && <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-sm">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 py-3 px-2 flex flex-col items-center justify-center gap-1 transition-colors ${
                    isActive
                      ? 'text-[#6B8E23]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label={messages.nav[item.key as keyof typeof messages.nav]}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs font-medium">{messages.nav[item.key as keyof typeof messages.nav]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>}
    </div>
  );
}
