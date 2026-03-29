'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import enMessages from '@/messages/en.json';
import viMessages from '@/messages/vi.json';

export type Locale = 'vi' | 'en';

type LocaleContextType = {
  locale: Locale;
  messages: typeof enMessages | typeof viMessages;
  changeLocale: (nextLocale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
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

  // Always provide context, but mark when hydrated
  return (
    <LocaleContext.Provider value={{ locale, messages, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within LocaleProvider');
  }
  return context;
}
