'use client';

import { Search, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({ onSearch, onFilterClick }: SearchBarProps) {
  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100 space-y-3">
  
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search areas, reports..."
            className="pl-9 pr-4 h-9 text-sm bg-gray-50 border-gray-200"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-gray-600"
          onClick={onFilterClick}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
