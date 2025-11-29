'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, Menu, X, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { getUnreadNotifications } from '@/lib/mock-data';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuthStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  if (!user) return null;

  const unreadCount = getUnreadNotifications(user.id).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-primary-500 text-white p-1.5 rounded-lg">
              <GraduationCap size={20} />
            </div>
            <span className="text-lg font-bold text-slate-900">Tamani</span>
          </div>
        </div>

        {/* Title (Desktop) */}
        <h1 className="hidden lg:block text-xl font-semibold text-slate-900">
          {title || 'Tableau de bord'}
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <Search size={20} />
          </button>

          {/* Search bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent text-sm focus:outline-none w-48"
            />
          </div>

          {/* Notifications */}
          <Link
            href="/dashboard/notifications"
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-xs flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User avatar (Desktop) */}
          <Link href="/dashboard/settings" className="hidden lg:block">
            <Avatar
              src={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
              size="md"
            />
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      {showSearch && (
        <div className="lg:hidden px-4 pb-4">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent text-sm focus:outline-none flex-1"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {showMobileMenu && (
        <MobileMenuOverlay onClose={() => setShowMobileMenu(false)} />
      )}
    </header>
  );
}

function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const menuItems = [
    { label: 'Tableau de bord', href: '/dashboard' },
    { label: 'Emploi du temps', href: '/dashboard/schedule' },
    { label: 'Notes', href: '/dashboard/grades' },
    { label: 'Devoirs', href: '/dashboard/homework' },
    { label: 'Absences', href: '/dashboard/attendance' },
    { label: 'Messages', href: '/dashboard/messages' },
    { label: 'Documents', href: '/dashboard/documents' },
    { label: 'Média', href: '/dashboard/media' },
    { label: 'Notifications', href: '/dashboard/notifications' },
    ...(user.role === 'student' || user.role === 'admin' ? [{ label: 'Paiements', href: '/dashboard/payments' }] : []),
    ...(user.role === 'admin' ? [{ label: 'Administration', href: '/dashboard/admin/users' }] : []),
    { label: 'Paramètres', href: '/dashboard/settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Avatar
              src={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
              size="lg"
            />
            <div>
              <p className="font-medium text-slate-900">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-slate-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
        <nav className="p-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { logout(); onClose(); }}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg mt-2"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </div>
  );
}
