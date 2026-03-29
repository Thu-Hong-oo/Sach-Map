'use client';

import { useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/layout/Search';
import { MapView } from '@/components/features/map/MapView';
import { ReportList } from '@/components/features/report/ReportList';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocaleContext } from '@/lib/context/LocaleContext';

const FILTER_TABS = [
  { id: 'all', label: 'All Reports' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'zones', label: 'Clean Zones' },
] as const;

type FilterTabId = (typeof FILTER_TABS)[number]['id'];

export default function HomePage() {
  const { messages } = useLocaleContext();
  const [activeTab, setActiveTab] = useState<FilterTabId>('all');

  const tabLabels = useMemo(
    () => ({
      all: messages.home.tabs.all,
      nearby: messages.home.tabs.nearby,
      zones: messages.home.tabs.zones,
    }),
    [messages]
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pb-24">
        <SearchBar />

        <div className="px-4 pt-3">
          <MapView />
        </div>

        <div className="px-4 py-3 flex gap-2 overflow-x-auto">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className={isActive ? 'bg-[#6B8E23] hover:bg-[#5a7a1e]' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tabLabels[tab.id]}
              </Button>
            );
          })}
        </div>

        <div className="px-4 grid grid-cols-2 gap-3 mb-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{messages.home.stats.cleanZones}</p>
              <p className="text-2xl font-bold">124</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{messages.home.stats.alerts}</p>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{messages.home.recentReports}</h2>
          <Badge variant="secondary">{tabLabels[activeTab]}</Badge>
        </div>

        <div className="px-4">
          <ReportList />
        </div>
      </div>
    </div>
  );
}
