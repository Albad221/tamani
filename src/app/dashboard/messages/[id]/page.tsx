'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  Users,
  Phone,
  Video,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  conversations,
  getMessagesByConversation,
  getUserById,
} from '@/lib/mock-data';
import { formatRelativeTime, formatDate, cn } from '@/lib/utils';

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === params.id);
  const messages = conversation ? getMessagesByConversation(conversation.id) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Conversation non trouvée</p>
        <Button variant="secondary" className="mt-4" onClick={() => router.back()}>
          Retour
        </Button>
      </div>
    );
  }

  let displayName = '';
  let avatarUrl = '';
  let otherUser = null;

  if (conversation.type === 'group') {
    displayName = conversation.title || 'Groupe';
  } else {
    const otherParticipantId = conversation.participantIds.find(id => id !== user.id);
    otherUser = otherParticipantId ? getUserById(otherParticipantId) : null;
    displayName = otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Inconnu';
    avatarUrl = otherUser?.avatar || '';
  }

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    alert('Message envoyé: ' + newMessage);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group messages by date
  const messagesByDate = messages.reduce((acc, msg) => {
    const date = new Date(msg.sentAt).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {} as Record<string, typeof messages>);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
      {/* Header */}
      <Card className="p-4 rounded-b-none border-b-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft size={18} />
            </Button>
            {conversation.type === 'group' ? (
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Users size={20} className="text-primary-600" />
              </div>
            ) : (
              <Avatar
                src={avatarUrl}
                firstName={otherUser?.firstName || '?'}
                lastName={otherUser?.lastName || ''}
                size="md"
              />
            )}
            <div>
              <p className="font-semibold text-slate-900">{displayName}</p>
              {otherUser && (
                <p className="text-xs text-slate-500 capitalize">{otherUser.role}</p>
              )}
              {conversation.type === 'group' && (
                <p className="text-xs text-slate-500">
                  {conversation.participantIds.length} participants
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Phone size={18} />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Video size={18} />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-6">
        {Object.entries(messagesByDate).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex items-center justify-center mb-4">
              <span className="px-3 py-1 bg-white rounded-full text-xs text-slate-500 shadow-sm">
                {new Date(date).toDateString() === new Date().toDateString()
                  ? "Aujourd'hui"
                  : formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="space-y-3">
              {dateMessages.map(msg => {
                const sender = getUserById(msg.senderId);
                const isOwnMessage = msg.senderId === user.id;

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-3',
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {!isOwnMessage && (
                      <Avatar
                        src={sender?.avatar}
                        firstName={sender?.firstName || '?'}
                        lastName={sender?.lastName || ''}
                        size="sm"
                      />
                    )}
                    <div className={cn(
                      'max-w-[70%]',
                      isOwnMessage ? 'items-end' : 'items-start'
                    )}>
                      {!isOwnMessage && conversation.type === 'group' && (
                        <p className="text-xs text-slate-500 mb-1 ml-1">
                          {sender?.firstName}
                        </p>
                      )}
                      <div className={cn(
                        'px-4 py-2.5 rounded-2xl',
                        isOwnMessage
                          ? 'bg-primary-500 text-white rounded-br-sm'
                          : 'bg-white text-slate-800 shadow-sm rounded-bl-sm'
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <p className={cn(
                        'text-xs mt-1 px-1',
                        isOwnMessage ? 'text-right text-slate-400' : 'text-slate-400'
                      )}>
                        {formatDate(msg.sentAt, { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <Card className="p-4 rounded-t-none border-t-0">
        <div className="flex items-end gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
            <Paperclip size={20} />
          </button>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre message..."
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={1}
            />
          </div>
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
