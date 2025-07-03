// components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tag, UserCircle, ClipboardList } from 'lucide-react';

const categories = [
  'Vehicles', 'Fashion', 'Property Rentals', 'Apparel', 'Classifieds', 'Electronics', 'Entertainment', 'Family',
  'Free Stuff', 'Garden & Outdoor', 'Hobbies', 'Home Goods', 'Home Improvement', 'Home Sales',
  'Musical Instruments', 'Office Supplies', 'Pet Supplies', 'Sporting Goods', 'Toys & Games',
  'Buy and sell groups', 'Other'
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full space-y-6">
      <div className="rounded-lg border bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Create new listing</h3>
        <div className="flex flex-col space-y-2 text-sm">
          <Link
            href="/create"
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100',
              pathname === '/create' && 'bg-gray-100 text-blue-600 font-medium'
            )}
          >
            <Tag className="w-4 h-4" /> Choose listing type
          </Link>
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100',
              pathname === '/your-listings' && 'bg-gray-100 text-blue-600 font-medium'
            )}
          >
            <ClipboardList className="w-4 h-4" /> Your listings
          </Link>
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100',
              pathname === '/help' && 'bg-gray-100 text-blue-600 font-medium'
            )}
          >
            <UserCircle className="w-4 h-4" /> Seller help
          </Link>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
        <div className="flex flex-col space-y-1 text-sm">
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/ /g, '-');
            return (
              <Link
                key={cat}
                href={`/category/${slug}`}
                className={cn(
                  'rounded-md px-3 py-2 hover:bg-gray-100',
                  pathname === `/category/${slug}` && 'bg-blue-100 text-blue-700 font-medium'
                )}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
