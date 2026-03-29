'use client';

import { useLocaleContext } from '@/lib/context/LocaleContext';

export default function ProfilePage() {
  const { messages } = useLocaleContext();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{messages.pages.profile.title}</h1>
      <p className="text-muted-foreground">{messages.pages.profile.description}</p>
    </div>
  );
}
