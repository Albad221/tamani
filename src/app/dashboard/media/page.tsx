'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlaySquare,
  Mic,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Search,
  Filter,
  Plus,
  Heart,
  ThumbsUp,
  Lightbulb,
  MessageCircle,
  Eye,
  Star,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { EmptyState } from '@/components/ui/empty-state';
import {
  mediaContent,
  categories,
  getPublishedMedia,
  getMediaByAuthor,
  getReactionsByContent,
  getCommentsByContent,
  getUserById,
  getSubjectById,
} from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';

type ContentType = 'all' | 'podcast' | 'video' | 'article' | 'infographic' | 'summary';

export default function MediaPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ContentType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [view, setView] = useState<'feed' | 'my'>('feed');

  if (!user) return null;

  // Get content based on view
  const allContent = view === 'my'
    ? getMediaByAuthor(user.id)
    : getPublishedMedia();

  // Filter content
  const filteredContent = allContent.filter(content => {
    const matchesSearch = !searchQuery ||
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || content.type === selectedType;

    const matchesCategory = selectedCategory === 'all' || content.categoryId === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort by featured first, then by date
  const sortedContent = [...filteredContent].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'podcast': return <Mic size={16} />;
      case 'video': return <PlaySquare size={16} />;
      case 'article': return <FileText size={16} />;
      case 'infographic': return <ImageIcon size={16} />;
      case 'summary': return <BookOpen size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Média Tamani</h1>
        <div className="flex gap-2">
          <Button
            variant={view === 'feed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('feed')}
          >
            Feed
          </Button>
          <Button
            variant={view === 'my' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('my')}
          >
            Mes créations
          </Button>
          <Link href="/dashboard/media/create">
            <Button>
              <Plus size={18} className="mr-2" />
              Créer
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Content */}
      {view === 'feed' && sortedContent.filter(c => c.featured).length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Star size={20} className="text-yellow-500" />
            À la une
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sortedContent.filter(c => c.featured).slice(0, 2).map(content => (
              <FeaturedCard key={content.id} content={content} />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher du contenu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'podcast', 'video', 'article', 'infographic', 'summary'] as ContentType[]).map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type !== 'all' && getTypeIcon(type)}
                <span className="ml-1 capitalize">
                  {type === 'all' ? 'Tous' : type}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mt-4">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            Toutes catégories
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Content Feed */}
      {sortedContent.length === 0 ? (
        <EmptyState
          icon={<PlaySquare size={24} />}
          title={view === 'my' ? "Aucune création" : "Aucun contenu"}
          description={view === 'my'
            ? "Vous n'avez pas encore créé de contenu."
            : "Aucun contenu ne correspond à vos critères."}
          action={view === 'my' && (
            <Link href="/dashboard/media/create">
              <Button>Créer du contenu</Button>
            </Link>
          )}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContent.filter(c => !c.featured || view === 'my').map(content => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ content }: { content: typeof mediaContent[0] }) {
  const author = getUserById(content.authorId);
  const category = categories.find(c => c.id === content.categoryId);
  const reactions = getReactionsByContent(content.id);
  const comments = getCommentsByContent(content.id);

  return (
    <Link href={`/dashboard/media/${content.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        <div className="relative h-48">
          <Image
            src={content.thumbnailUrl}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge variant="primary" className="backdrop-blur-sm">
              <Star size={12} className="mr-1" /> Featured
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="backdrop-blur-sm capitalize">
              {content.type}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-bold text-lg line-clamp-2">{content.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Avatar
                src={author?.avatar}
                firstName={author?.firstName || ''}
                lastName={author?.lastName || ''}
                size="sm"
              />
              <span className="text-sm opacity-90">
                {author?.firstName} {author?.lastName}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Heart size={14} /> {reactions.length}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={14} /> {comments.length}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} /> {content.viewCount}
              </span>
            </div>
            {category && (
              <Badge variant="default">{category.name}</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ContentCard({ content }: { content: typeof mediaContent[0] }) {
  const author = getUserById(content.authorId);
  const category = categories.find(c => c.id === content.categoryId);
  const reactions = getReactionsByContent(content.id);
  const comments = getCommentsByContent(content.id);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'podcast': return <Mic size={14} />;
      case 'video': return <PlaySquare size={14} />;
      case 'article': return <FileText size={14} />;
      case 'infographic': return <ImageIcon size={14} />;
      case 'summary': return <BookOpen size={14} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <Link href={`/dashboard/media/${content.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
        <div className="relative h-40">
          <Image
            src={content.thumbnailUrl}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="backdrop-blur-sm capitalize flex items-center gap-1">
              {getTypeIcon(content.type)}
              {content.type}
            </Badge>
          </div>
          {content.status === 'pending' && (
            <div className="absolute top-2 left-2">
              <Badge variant="warning">En attente</Badge>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{content.title}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{content.description}</p>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <Avatar
                src={author?.avatar}
                firstName={author?.firstName || ''}
                lastName={author?.lastName || ''}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {author?.firstName} {author?.lastName}
                </p>
                <p className="text-xs text-slate-400">
                  {content.publishedAt ? formatRelativeTime(content.publishedAt) : 'Brouillon'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Heart size={12} /> {reactions.length}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={12} /> {comments.length}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {content.viewCount}
                </span>
              </div>
              {category && (
                <span className="text-primary-600">{category.name}</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
