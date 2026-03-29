'use client';

import { MainLayout } from '@/components/MainLayout';
import { LocaleProvider } from '@/lib/context/LocaleContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <MainLayout>{children}</MainLayout>
    </LocaleProvider>
  );
}
