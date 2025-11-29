'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  homework,
  submissions,
  getSubjectById,
  getUserById,
  getClassById,
} from '@/lib/mock-data';
import { formatDate, getStatusLabel, cn } from '@/lib/utils';

export default function HomeworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hw = homework.find(h => h.id === params.id);

  if (!hw || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Devoir non trouvé</p>
        <Button variant="secondary" className="mt-4" onClick={() => router.back()}>
          Retour
        </Button>
      </div>
    );
  }

  const subject = getSubjectById(hw.subjectId);
  const teacher = getUserById(hw.teacherId);
  const classInfo = getClassById(hw.classId);

  const userSubmission = submissions.find(
    s => s.homeworkId === hw.id && s.studentId === user.id
  );

  const dueDate = new Date(hw.dueDate);
  const isOverdue = dueDate < new Date() && (!userSubmission || userSubmission.status === 'pending');
  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Devoir soumis avec succès !');
      router.push('/dashboard/homework');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{hw.title}</h1>
          <p className="text-slate-500">{subject?.name}</p>
        </div>
        <Badge
          variant={
            userSubmission?.status === 'graded' ? 'success' :
            userSubmission?.status === 'submitted' ? 'primary' :
            isOverdue ? 'danger' : 'warning'
          }
        >
          {isOverdue && (!userSubmission || userSubmission.status === 'pending')
            ? 'En retard'
            : getStatusLabel(userSubmission?.status || 'pending')
          }
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consignes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-wrap">{hw.description}</p>

              {hw.attachments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-900 mb-3">Fichiers joints</h4>
                  <div className="space-y-2">
                    {hw.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      >
                        <FileText size={18} className="text-slate-500" />
                        <span className="text-sm text-slate-700">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submission Section */}
          {user.role === 'student' && (
            <Card>
              <CardHeader>
                <CardTitle>Ma soumission</CardTitle>
              </CardHeader>
              <CardContent>
                {userSubmission?.status === 'submitted' || userSubmission?.status === 'graded' ? (
                  <div>
                    <div className="flex items-center gap-2 text-green-600 mb-4">
                      <CheckCircle size={20} />
                      <span className="font-medium">Devoir rendu</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                      Soumis le {formatDate(userSubmission.submittedAt || '', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {userSubmission.files.length > 0 && (
                      <div className="space-y-2">
                        {userSubmission.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
                          >
                            <FileText size={18} className="text-slate-500" />
                            <span className="text-sm text-slate-700">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {userSubmission.status === 'graded' && (
                      <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-green-800">Note obtenue</span>
                          <span className="text-2xl font-bold text-green-700">
                            {userSubmission.score}/{hw.maxScore}
                          </span>
                        </div>
                        {userSubmission.feedback && (
                          <p className="text-sm text-green-700">{userSubmission.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {isOverdue && (
                      <div className="flex items-center gap-2 text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
                        <AlertCircle size={20} />
                        <span className="text-sm">La date limite est dépassée</span>
                      </div>
                    )}

                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary-500 hover:bg-primary-50/50 transition-colors cursor-pointer">
                      <Upload size={32} className="mx-auto text-slate-400 mb-4" />
                      <p className="text-slate-600 mb-2">
                        Glissez vos fichiers ici ou cliquez pour parcourir
                      </p>
                      <p className="text-sm text-slate-400">
                        PDF, Word, images (max 10MB)
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Commentaire (optionnel)
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows={4}
                        placeholder="Ajoutez un commentaire pour le professeur..."
                      />
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                      disabled={isOverdue}
                    >
                      Soumettre le devoir
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-medium text-slate-900 mb-4">Informations</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <User size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Professeur</p>
                  <p className="text-sm font-medium text-slate-900">
                    {teacher?.firstName} {teacher?.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Calendar size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date limite</p>
                  <p className={cn(
                    'text-sm font-medium',
                    isOverdue ? 'text-red-600' : 'text-slate-900'
                  )}>
                    {formatDate(hw.dueDate, { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Clock size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Temps restant</p>
                  <p className={cn(
                    'text-sm font-medium',
                    isOverdue ? 'text-red-600' :
                    daysUntilDue <= 3 ? 'text-yellow-600' : 'text-slate-900'
                  )}>
                    {isOverdue ? 'Échéance dépassée' :
                     daysUntilDue === 0 ? 'Aujourd\'hui' :
                     daysUntilDue === 1 ? 'Demain' :
                     `${daysUntilDue} jours`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: subject?.color }}
                />
                <div>
                  <p className="text-xs text-slate-500">Matière</p>
                  <p className="text-sm font-medium text-slate-900">{subject?.name}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Barème</p>
                <p className="text-lg font-bold text-slate-900">/{hw.maxScore} points</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
