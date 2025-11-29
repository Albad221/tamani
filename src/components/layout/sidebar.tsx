'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  ClipboardList,
  UserCheck,
  MessageSquare,
  FileText,
  PlaySquare,
  Bell,
  Settings,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { Avatar } from '@/components/ui/avatar';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: ('student' | 'teacher' | 'admin')[];
}

const navItems: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Emploi du temps', href: '/dashboard/schedule', icon: <Calendar size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Notes', href: '/dashboard/grades', icon: <GraduationCap size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Devoirs', href: '/dashboard/homework', icon: <ClipboardList size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Absences', href: '/dashboard/attendance', icon: <UserCheck size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Messages', href: '/dashboard/messages', icon: <MessageSquare size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Documents', href: '/dashboard/documents', icon: <FileText size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Média', href: '/dashboard/media', icon: <PlaySquare size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Notifications', href: '/dashboard/notifications', icon: <Bell size={20} />, roles: ['student', 'teacher', 'admin'] },
  { label: 'Paiements', href: '/dashboard/payments', icon: <CreditCard size={20} />, roles: ['student', 'admin'] },
  { label: 'Utilisateurs', href: '/dashboard/admin/users', icon: <Users size={20} />, roles: ['admin'] },
  { label: 'Analytics', href: '/dashboard/admin/analytics', icon: <BarChart3 size={20} />, roles: ['admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-200">
        <div className="bg-primary-500 text-white p-2 rounded-lg">
          <GraduationCap size={24} />
        </div>
        <span className="text-xl font-bold text-slate-900">
          Tamani<span className="text-primary-500">App</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar
            src={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/settings"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Settings size={16} />
            Paramètres
          </Link>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
