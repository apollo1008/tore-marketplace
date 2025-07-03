import './globals.css';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'A Facebook-style Marketplace built with Next.js, Supabase, and Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-slate-50 text-gray-900', inter.className)}>
        <Header />
        <main className="flex max-w-7xl mx-auto px-4 sm:px-6 mt-6">
          <div className="hidden sm:block w-64 pr-6">
            <Sidebar />
          </div>
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
