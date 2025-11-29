'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  PlaySquare,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { label: 'Accueil', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Planning', href: '/dashboard/schedule', icon: <Calendar size={20} /> },
  { label: 'Notes', href: '/dashboard/grades', icon: <GraduationCap size={20} /> },
  { label: 'Média', href: '/dashboard/media', icon: <PlaySquare size={20} /> },
  { label: 'Plus', href: '/dashboard/more', icon: <Menu size={20} /> },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <ul className="flex justify-around items-center h-16">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors',
                  isActive ? 'text-primary-600' : 'text-slate-500'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
