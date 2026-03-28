'use client';

import { useState } from 'react';
import { Home, Map, Users, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TabType = 'home' | 'map' | 'community' | 'profile';

export function MainLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Welcome to SACH MAP</h1>
            <p className="text-muted-foreground">Track and report environmental cleanups in your community.</p>
          </div>
        );
      case 'map':
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Map View</h1>
            <p className="text-muted-foreground">Explore cleanup zones and impact areas on the map.</p>
          </div>
        );
      case 'community':
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Community</h1>
            <p className="text-muted-foreground">Connect with other community members and volunteers.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">View your personal stats and achievements.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 py-6">
        <div className="mx-auto max-w-sm">
          {renderContent()}
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
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
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
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
