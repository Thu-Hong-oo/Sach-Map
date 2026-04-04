'use client';

import { MapboxView } from '@/components/features/map/MapboxView';
import { useLocaleContext } from '@/lib/context/LocaleContext';

export default function MapPage() {
  const { messages } = useLocaleContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-[#d4e3bb] bg-white p-4 shadow-sm">
        <h1 className="text-base font-semibold text-[#2f4312]">{messages.pages.mapExperience.title}</h1>
        <p className="mt-1 text-sm text-[#5b6d3a]">{messages.pages.mapExperience.description}</p>
      </div>

      <MapboxView />
    </div>
  );
}
