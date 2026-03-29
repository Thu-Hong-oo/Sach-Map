'use client';

import { useLocaleContext } from '@/lib/context/LocaleContext';

export default function MapPage() {
  const { messages } = useLocaleContext();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{messages.pages.map.title}</h1>
      <p className="text-muted-foreground">{messages.pages.map.description}</p>
    </div>
  );
}
