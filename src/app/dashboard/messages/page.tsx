'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  Plus,
  Users,
  User,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { EmptyState } from '@/components/ui/empty-state';
import {
  getConversationsByUser,
  getMessagesByConversation,
  getUserById,
} from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  const conversations = getConversationsByUser(user.id);
  const sortedConversations = [...conversations].sort((a, b) =>
    new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );

  const filteredConversations = sortedConversations.filter(conv => {
    if (!searchQuery) return true;

    if (conv.type === 'group' && conv.title) {
      return conv.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    const otherParticipantId = conv.participantIds.find(id => id !== user.id);
    const otherParticipant = otherParticipantId ? getUserById(otherParticipantId) : null;
    if (otherParticipant) {
      const fullName = `${otherParticipant.firstName} ${otherParticipant.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    }

    return false;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <Button>
          <Plus size={18} className="mr-2" />
          Nouvelle conversation
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher une conversation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {filteredConversations.length === 0 ? (
          <EmptyState
            icon={<MessageSquare size={24} />}
            title="Aucune conversation"
            description={searchQuery ? "Aucune conversation ne correspond à votre recherche." : "Commencez une nouvelle conversation."}
            action={!searchQuery && <Button>Nouveau message</Button>}
          />
        ) : (
          filteredConversations.map(conv => {
            const messages = getMessagesByConversation(conv.id);
            const lastMessage = messages[messages.length - 1];
            const unreadCount = messages.filter(m =>
              m.senderId !== user.id && !m.readBy.includes(user.id)
            ).length;

            let displayName = '';
            let avatarUrl = '';
            let otherUser = null;

            if (conv.type === 'group') {
              displayName = conv.title || 'Groupe';
            } else {
              const otherParticipantId = conv.participantIds.find(id => id !== user.id);
              otherUser = otherParticipantId ? getUserById(otherParticipantId) : null;
              displayName = otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Inconnu';
              avatarUrl = otherUser?.avatar || '';
            }

            return (
              <Link key={conv.id} href={`/dashboard/messages/${conv.id}`}>
                <Card
                  className={cn(
                    'p-4 hover:bg-slate-50 transition-colors cursor-pointer',
                    unreadCount > 0 && 'bg-primary-50/50 border-primary-200'
                  )}
                >
                  <div className="flex items-center gap-4">
                    {conv.type === 'group' ? (
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <Users size={24} className="text-primary-600" />
                      </div>
                    ) : (
                      <Avatar
                        src={avatarUrl}
                        firstName={otherUser?.firstName || '?'}
                        lastName={otherUser?.lastName || ''}
                        size="lg"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={cn(
                          'font-medium text-slate-900 truncate',
                          unreadCount > 0 && 'font-semibold'
                        )}>
                          {displayName}
                        </p>
                        <span className="text-xs text-slate-500 flex-shrink-0">
                          {formatRelativeTime(conv.lastMessageAt)}
                        </span>
                      </div>
                      {lastMessage && (
                        <p className={cn(
                          'text-sm truncate mt-1',
                          unreadCount > 0 ? 'text-slate-700 font-medium' : 'text-slate-500'
                        )}>
                          {lastMessage.senderId === user.id && 'Vous: '}
                          {lastMessage.content}
                        </p>
                      )}
                    </div>

                    {unreadCount > 0 && (
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
