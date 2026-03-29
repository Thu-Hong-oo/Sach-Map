'use client';

import { useLocaleContext } from '@/lib/context/LocaleContext';

export default function ReportPage() {
  const { messages } = useLocaleContext();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{messages.pages.report.title}</h1>
      <p className="text-muted-foreground">{messages.pages.report.description}</p>
    </div>
  );
}
