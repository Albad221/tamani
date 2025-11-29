'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCheck,
  GraduationCap,
  BookOpen,
  MessageSquare,
  PlaySquare,
  UserCheck,
  CreditCard,
  Settings,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { getNotificationsByUser } from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';

export default function NotificationsPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!user) return null;

  const allNotifications = getNotificationsByUser(user.id);
  const filteredNotifications = filter === 'unread'
    ? allNotifications.filter(n => !n.read)
    : allNotifications;

  const sortedNotifications = [...filteredNotifications].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const unreadCount = allNotifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'grade': return <GraduationCap size={20} className="text-green-600" />;
      case 'homework': return <BookOpen size={20} className="text-yellow-600" />;
      case 'message': return <MessageSquare size={20} className="text-blue-600" />;
      case 'media': return <PlaySquare size={20} className="text-purple-600" />;
      case 'attendance': return <UserCheck size={20} className="text-red-600" />;
      case 'payment': return <CreditCard size={20} className="text-orange-600" />;
      default: return <Bell size={20} className="text-slate-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'grade': return 'bg-green-100';
      case 'homework': return 'bg-yellow-100';
      case 'message': return 'bg-blue-100';
      case 'media': return 'bg-purple-100';
      case 'attendance': return 'bg-red-100';
      case 'payment': return 'bg-orange-100';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-slate-500">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Toutes
          </Button>
          <Button
            variant={filter === 'unread' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Non lues
            {unreadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </Button>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm">
              <CheckCheck size={18} className="mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          {sortedNotifications.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={<Bell size={24} />}
                title="Aucune notification"
                description={filter === 'unread' ? "Vous n'avez pas de notifications non lues." : "Vous n'avez pas encore de notifications."}
              />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {sortedNotifications.map(notification => (
                <Link
                  key={notification.id}
                  href={notification.link || '#'}
                  className={cn(
                    'flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors',
                    !notification.read && 'bg-primary-50/30'
                  )}
                >
                  <div className={cn('p-2 rounded-lg', getIconBg(notification.type))}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={cn(
                          'text-sm',
                          notification.read ? 'text-slate-700' : 'text-slate-900 font-medium'
                        )}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5">{notification.body}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary-500" />
                        )}
                        <span className="text-xs text-slate-400">
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings Link */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-slate-500" />
            <div>
              <p className="font-medium text-slate-900">Préférences de notifications</p>
              <p className="text-sm text-slate-500">Gérez vos notifications push et email</p>
            </div>
          </div>
          <Link href="/dashboard/settings">
            <Button variant="secondary" size="sm">
              Configurer
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
