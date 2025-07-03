'use client';

import { Input } from '@/components/ui/input';
import { LayoutGrid, PlusCircle, Search, User } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full border-b bg-white px-4 sm:px-6 py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold text-primary">Marketplace</Link>

        {/* <div className="flex-1 max-w-lg hidden sm:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search listings..."
              className="pl-9 pr-4"
            />
          </div>
        </div> */}

        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="/create/item" title="Create Listing">
            <PlusCircle className="w-5 h-5 hover:text-primary transition" />
          </Link>
          <Link href="/" title="Browse">
            <LayoutGrid className="w-5 h-5 hover:text-primary transition" />
          </Link>
          <Link href="#" title="Profile">
            <User className="w-5 h-5 hover:text-primary transition" />
          </Link>
        </div>
      </div>
    </header>
  );
}
