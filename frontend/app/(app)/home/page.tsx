'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/layout/Search';
import { ReportList } from '@/components/features/report/ReportList';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FILTER_TABS = [
  { id: 'all', label: 'All Reports' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'zones', label: 'Clean Zones' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<(typeof FILTER_TABS)[number]['id']>('all');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pb-24">
        <SearchBar />

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
                {tab.label}
              </Button>
            );
          })}
        </div>

        <div className="px-4 grid grid-cols-2 gap-3 mb-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Clean Zones</p>
              <p className="text-2xl font-bold">124</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Alerts</p>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
          <Badge variant="secondary">{activeTab}</Badge>
        </div>

        <div className="px-4">
          <ReportList />
        </div>
      </div>
    </div>
  );
}
