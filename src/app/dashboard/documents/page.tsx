'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  FolderOpen,
  Star,
  Upload,
  BookOpen,
  FileSpreadsheet,
  File,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import {
  documents,
  subjects,
  getSubjectById,
  getUserById,
} from '@/lib/mock-data';
import { formatDate, cn } from '@/lib/utils';

type DocType = 'all' | 'course' | 'exercise' | 'resource' | 'official';

export default function DocumentsPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DocType>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  if (!user) return null;

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || doc.type === selectedType;

    const matchesSubject = selectedSubject === 'all' || doc.subjectId === selectedSubject;

    return matchesSearch && matchesType && matchesSubject;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText size={24} className="text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText size={24} className="text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet size={24} className="text-green-500" />;
      default:
        return <File size={24} className="text-slate-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      course: 'Cours',
      exercise: 'Exercices',
      resource: 'Ressource',
      official: 'Officiel',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
        {(user.role === 'teacher' || user.role === 'admin') && (
          <Button>
            <Upload size={18} className="mr-2" />
            Uploader
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'course', 'exercise', 'resource', 'official'] as DocType[]).map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type === 'all' ? 'Tous' : getTypeLabel(type)}
              </Button>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div className="flex gap-2 flex-wrap mt-4">
          <Button
            variant={selectedSubject === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedSubject('all')}
          >
            Toutes matières
          </Button>
          {subjects.map(subject => (
            <Button
              key={subject.id}
              variant={selectedSubject === subject.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedSubject(subject.id)}
            >
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: subject.color }}
              />
              {subject.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Documents Grid */}
      {sortedDocuments.length === 0 ? (
        <EmptyState
          icon={<FolderOpen size={24} />}
          title="Aucun document"
          description="Aucun document ne correspond à vos critères de recherche."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedDocuments.map(doc => {
            const subject = doc.subjectId ? getSubjectById(doc.subjectId) : null;
            const uploader = getUserById(doc.uploadedById);

            return (
              <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-lg">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{doc.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{doc.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="default">{getTypeLabel(doc.type)}</Badge>
                  {subject && (
                    <Badge
                      variant="primary"
                      style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                    >
                      {subject.name}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    <p>{uploader?.firstName} {uploader?.lastName}</p>
                    <p>{formatDate(doc.createdAt, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{doc.downloadCount} téléchargements</span>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Aperçu">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg" title="Télécharger">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
