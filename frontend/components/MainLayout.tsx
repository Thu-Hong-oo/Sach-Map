'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Users, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MainLayoutProps = {
  children?: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/map', label: 'Map', icon: Map },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col" >
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 py-6">
        <div className="mx-auto max-w-sm">
          {children}
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-lg bg-[#6B8E23] hover:bg-[#5a7620] text-white flex items-center justify-center"
          aria-label="Report Now"
          title="Report Now"
        >
          <Camera className="h-8 w-8" />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
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
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
