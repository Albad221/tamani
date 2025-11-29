'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Heart,
  ThumbsUp,
  Lightbulb,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  Tag,
  Play,
  Pause,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  mediaContent,
  categories,
  getReactionsByContent,
  getCommentsByContent,
  getUserById,
  getSubjectById,
} from '@/lib/mock-data';
import { formatDate, formatRelativeTime, cn } from '@/lib/utils';

export default function MediaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [newComment, setNewComment] = useState('');
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const content = mediaContent.find(m => m.id === params.id);

  if (!content || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Contenu non trouvé</p>
        <Button variant="secondary" className="mt-4" onClick={() => router.back()}>
          Retour
        </Button>
      </div>
    );
  }

  const author = getUserById(content.authorId);
  const category = categories.find(c => c.id === content.categoryId);
  const subject = content.subjectId ? getSubjectById(content.subjectId) : null;
  const reactions = getReactionsByContent(content.id);
  const comments = getCommentsByContent(content.id);

  const reactionCounts = {
    like: reactions.filter(r => r.type === 'like').length,
    useful: reactions.filter(r => r.type === 'useful').length,
    inspiring: reactions.filter(r => r.type === 'inspiring').length,
  };

  const handleReaction = (type: string) => {
    setUserReaction(userReaction === type ? null : type);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    alert('Commentaire ajouté: ' + newComment);
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="capitalize">{content.type}</Badge>
            {category && <Badge variant="default">{category.name}</Badge>}
            {subject && (
              <Badge
                variant="default"
                style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
              >
                {subject.name}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{content.title}</h1>
        </div>
      </div>

      {/* Media Preview */}
      <Card padding="none" className="overflow-hidden">
        {content.type === 'video' ? (
          <div className="relative aspect-video bg-slate-900">
            <Image
              src={content.thumbnailUrl}
              alt={content.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors">
                <Play size={32} className="text-slate-900 ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
        ) : content.type === 'podcast' ? (
          <div className="relative h-64 bg-gradient-to-br from-purple-600 to-primary-600">
            <Image
              src={content.thumbnailUrl}
              alt={content.title}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <button className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm transition-colors mb-4">
                <Play size={32} className="ml-1" fill="currentColor" />
              </button>
              <p className="text-sm opacity-80">Durée: 15:32</p>
            </div>
          </div>
        ) : (
          <div className="relative h-64">
            <Image
              src={content.thumbnailUrl}
              alt={content.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </Card>

      {/* Content Info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Author & Stats */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={author?.avatar}
                  firstName={author?.firstName || ''}
                  lastName={author?.lastName || ''}
                  size="lg"
                />
                <div>
                  <p className="font-semibold text-slate-900">
                    {author?.firstName} {author?.lastName}
                  </p>
                  <p className="text-sm text-slate-500 capitalize">{author?.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Eye size={16} /> {content.viewCount} vues
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {content.publishedAt ? formatDate(content.publishedAt, { day: 'numeric', month: 'long' }) : 'Non publié'}
                </span>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-wrap">{content.description}</p>

              {content.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Tag size={16} className="text-slate-400" />
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map(tag => (
                      <Badge key={tag} variant="default">#{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reactions */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReaction('like')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                    userReaction === 'like'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  <Heart size={18} fill={userReaction === 'like' ? 'currentColor' : 'none'} />
                  <span className="text-sm font-medium">{reactionCounts.like + (userReaction === 'like' ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => handleReaction('useful')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                    userReaction === 'useful'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  <ThumbsUp size={18} fill={userReaction === 'useful' ? 'currentColor' : 'none'} />
                  <span className="text-sm font-medium">{reactionCounts.useful + (userReaction === 'useful' ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => handleReaction('inspiring')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                    userReaction === 'inspiring'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  <Lightbulb size={18} fill={userReaction === 'inspiring' ? 'currentColor' : 'none'} />
                  <span className="text-sm font-medium">{reactionCounts.inspiring + (userReaction === 'inspiring' ? 1 : 0)}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                  <Bookmark size={18} />
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle size={20} />
                Commentaires ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* New Comment */}
              <div className="flex gap-3 mb-6">
                <Avatar
                  src={user.avatar}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  size="md"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" onClick={handleComment} disabled={!newComment.trim()}>
                      Publier
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">Aucun commentaire pour le moment. Soyez le premier !</p>
                ) : (
                  comments.map(comment => {
                    const commenter = getUserById(comment.userId);
                    return (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar
                          src={commenter?.avatar}
                          firstName={commenter?.firstName || ''}
                          lastName={commenter?.lastName || ''}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-slate-900">
                              {commenter?.firstName} {commenter?.lastName}
                            </span>
                            <span className="text-xs text-slate-400">
                              {formatRelativeTime(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-slate-700">{comment.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-medium text-slate-900 mb-4">Informations</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span className="font-medium text-slate-900 capitalize">{content.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Catégorie</span>
                <span className="font-medium text-slate-900">{category?.name}</span>
              </div>
              {subject && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Matière</span>
                  <span className="font-medium text-slate-900">{subject.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Statut</span>
                <Badge variant={content.status === 'published' ? 'success' : 'warning'} className="capitalize">
                  {content.status === 'published' ? 'Publié' : content.status}
                </Badge>
              </div>
            </div>
          </Card>

          {content.coAuthorIds.length > 0 && (
            <Card className="p-4">
              <h3 className="font-medium text-slate-900 mb-4">Co-auteurs</h3>
              <div className="space-y-3">
                {content.coAuthorIds.map(id => {
                  const coAuthor = getUserById(id);
                  if (!coAuthor) return null;
                  return (
                    <div key={id} className="flex items-center gap-3">
                      <Avatar
                        src={coAuthor.avatar}
                        firstName={coAuthor.firstName}
                        lastName={coAuthor.lastName}
                        size="sm"
                      />
                      <span className="text-sm text-slate-700">
                        {coAuthor.firstName} {coAuthor.lastName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
