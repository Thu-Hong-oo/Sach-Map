'use client';

import Link from 'next/link';
import { Home, Map, Users, User } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <Link href="/" className="p-4 text-gray-600 hover:text-[#6B8E23]">
          <Home size={24} />
        </Link>
        <Link href="/map" className="p-4 text-gray-600 hover:text-[#6B8E23]">
          <Map size={24} />
        </Link>
        <Link href="/community" className="p-4 text-gray-600 hover:text-[#6B8E23]">
          <Users size={24} />
        </Link>
        <Link href="/profile" className="p-4 text-gray-600 hover:text-[#6B8E23]">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
}
