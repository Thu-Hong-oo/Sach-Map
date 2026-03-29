'use client';

import { useEffect, useMemo, useState } from 'react';
import enMessages from '@/messages/en.json';
import viMessages from '@/messages/vi.json';

export type Locale = 'vi' | 'en';

export function useLocaleMessages() {
  const [locale, setLocale] = useState<Locale>('vi');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('locale');
    if (savedLocale === 'vi' || savedLocale === 'en') {
      setLocale(savedLocale);
    } else {
      const browserLocale = navigator.language.toLowerCase().startsWith('en') ? 'en' : 'vi';
      setLocale(browserLocale);
    }
    setIsHydrated(true);
  }, []);

  const messages = useMemo(() => (locale === 'en' ? enMessages : viMessages), [locale]);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    window.localStorage.setItem('locale', nextLocale);
  };

  return { locale, messages, changeLocale, isHydrated };
}
