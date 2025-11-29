'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Upload,
  Mic,
  PlaySquare,
  FileText,
  Image as ImageIcon,
  BookOpen,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { categories, subjects } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type ContentType = 'podcast' | 'video' | 'article' | 'infographic' | 'summary';

export default function CreateMediaPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as ContentType | '',
    categoryId: '',
    subjectId: '',
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');

  if (!user) return null;

  const contentTypes = [
    { id: 'podcast', label: 'Podcast', icon: <Mic size={24} />, description: 'Enregistrement audio' },
    { id: 'video', label: 'Vidéo', icon: <PlaySquare size={24} />, description: 'Exposé filmé, tutoriel' },
    { id: 'article', label: 'Article', icon: <FileText size={24} />, description: 'Texte long format' },
    { id: 'infographic', label: 'Infographie', icon: <ImageIcon size={24} />, description: 'Visuel explicatif' },
    { id: 'summary', label: 'Fiche', icon: <BookOpen size={24} />, description: 'Résumé de cours' },
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const handleSubmit = (asDraft: boolean) => {
    if (!formData.title || !formData.type || !formData.categoryId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(asDraft ? 'Brouillon enregistré !' : 'Contenu soumis pour validation !');
      router.push('/dashboard/media');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Créer du contenu</h1>
      </div>

      {/* Content Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Type de contenu *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {contentTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setFormData({ ...formData, type: type.id as ContentType })}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                  formData.type === type.id
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                )}
              >
                {type.icon}
                <span className="text-sm font-medium">{type.label}</span>
                <span className="text-xs text-slate-400 hidden sm:block">{type.description}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Titre *"
            placeholder="Un titre accrocheur pour votre contenu"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description *
            </label>
            <textarea
              placeholder="Décrivez votre contenu en quelques phrases..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={4}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Catégorie *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Sélectionner...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Matière (optionnel)
              </label>
              <select
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Aucune</option>
                {subjects.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Ajouter un tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button variant="secondary" onClick={handleAddTag}>
                Ajouter
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="primary" className="flex items-center gap-1">
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-500">
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Fichiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50/50 transition-colors cursor-pointer">
            <Upload size={40} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 mb-2">
              Glissez vos fichiers ici ou cliquez pour parcourir
            </p>
            <p className="text-sm text-slate-400">
              {formData.type === 'podcast' && 'MP3, WAV (max 50MB)'}
              {formData.type === 'video' && 'MP4, MOV (max 500MB)'}
              {formData.type === 'article' && 'Écrire directement ou importer un PDF'}
              {formData.type === 'infographic' && 'PNG, JPG, PDF (max 10MB)'}
              {formData.type === 'summary' && 'PDF, Word (max 10MB)'}
              {!formData.type && 'Sélectionnez d\'abord un type de contenu'}
            </p>
          </div>

          {/* Thumbnail */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Image de couverture
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-primary-500 hover:bg-primary-50/50 transition-colors cursor-pointer">
              <ImageIcon size={24} className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">PNG, JPG (min 800x400px)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => handleSubmit(true)} disabled={isSubmitting}>
          Enregistrer en brouillon
        </Button>
        <Button onClick={() => handleSubmit(false)} isLoading={isSubmitting}>
          Soumettre pour validation
        </Button>
      </div>
    </div>
  );
}
