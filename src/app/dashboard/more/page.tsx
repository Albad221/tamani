'use client';

import Link from 'next/link';
import {
  ClipboardList,
  UserCheck,
  MessageSquare,
  FileText,
  Bell,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { getUnreadNotifications } from '@/lib/mock-data';

export default function MorePage() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const unreadCount = getUnreadNotifications(user.id).length;

  const menuItems = [
    { label: 'Devoirs', href: '/dashboard/homework', icon: <ClipboardList size={20} /> },
    { label: 'Absences', href: '/dashboard/attendance', icon: <UserCheck size={20} /> },
    { label: 'Messages', href: '/dashboard/messages', icon: <MessageSquare size={20} /> },
    { label: 'Documents', href: '/dashboard/documents', icon: <FileText size={20} /> },
    { label: 'Notifications', href: '/dashboard/notifications', icon: <Bell size={20} />, badge: unreadCount },
    ...(user.role === 'student' || user.role === 'admin' ? [{ label: 'Paiements', href: '/dashboard/payments', icon: <CreditCard size={20} /> }] : []),
    { label: 'Paramètres', href: '/dashboard/settings', icon: <Settings size={20} /> },
    { label: 'Aide', href: '#', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* User Card */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Avatar
            src={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            size="xl"
          />
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-500 capitalize">{user.role}</p>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <Card padding="none">
        {menuItems.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-500">{item.icon}</span>
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && item.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-danger text-white text-xs flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={18} className="text-slate-400" />
            </div>
          </Link>
        ))}
      </Card>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
      >
        <LogOut size={20} />
        Déconnexion
      </button>

      {/* Version */}
      <p className="text-center text-sm text-slate-400">
        Tamani App v1.0.0
      </p>
    </div>
  );
}
