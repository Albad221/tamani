'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Plus,
  FileText,
  Users,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import {
  homework,
  submissions,
  getHomeworkByClass,
  getSubmissionsByStudent,
  getSubjectById,
  getUserById,
  getClassById,
} from '@/lib/mock-data';
import { formatDate, getStatusLabel, cn } from '@/lib/utils';

export default function HomeworkPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  if (!user) return null;

  if (user.role === 'student') {
    return <StudentHomeworkView userId={user.id} classId={user.classId} filter={filter} onFilterChange={setFilter} />;
  }

  return <TeacherHomeworkView teacherId={user.id} />;
}

function StudentHomeworkView({
  userId,
  classId,
  filter,
  onFilterChange
}: {
  userId: string;
  classId?: string;
  filter: string;
  onFilterChange: (f: 'all' | 'pending' | 'submitted' | 'graded') => void;
}) {
  const allHomework = classId ? getHomeworkByClass(classId) : [];
  const userSubmissions = getSubmissionsByStudent(userId);

  const homeworkWithStatus = allHomework.map(hw => {
    const submission = userSubmissions.find(s => s.homeworkId === hw.id);
    return {
      ...hw,
      submission,
      status: submission?.status || 'pending',
    };
  });

  const filteredHomework = filter === 'all'
    ? homeworkWithStatus
    : homeworkWithStatus.filter(hw => hw.status === filter);

  const sortedHomework = [...filteredHomework].sort((a, b) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const stats = {
    pending: homeworkWithStatus.filter(h => h.status === 'pending').length,
    submitted: homeworkWithStatus.filter(h => h.status === 'submitted').length,
    graded: homeworkWithStatus.filter(h => h.status === 'graded').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Mes devoirs</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card
          className={cn('p-4 cursor-pointer', filter === 'pending' && 'ring-2 ring-yellow-500')}
          hover
          onClick={() => onFilterChange(filter === 'pending' ? 'all' : 'pending')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
              <p className="text-sm text-slate-500">À rendre</p>
            </div>
          </div>
        </Card>

        <Card
          className={cn('p-4 cursor-pointer', filter === 'submitted' && 'ring-2 ring-blue-500')}
          hover
          onClick={() => onFilterChange(filter === 'submitted' ? 'all' : 'submitted')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.submitted}</p>
              <p className="text-sm text-slate-500">Rendus</p>
            </div>
          </div>
        </Card>

        <Card
          className={cn('p-4 cursor-pointer', filter === 'graded' && 'ring-2 ring-green-500')}
          hover
          onClick={() => onFilterChange(filter === 'graded' ? 'all' : 'graded')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.graded}</p>
              <p className="text-sm text-slate-500">Notés</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {sortedHomework.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={24} />}
            title="Aucun devoir"
            description="Vous n'avez pas de devoirs pour le moment."
          />
        ) : (
          sortedHomework.map(hw => {
            const subject = getSubjectById(hw.subjectId);
            const teacher = getUserById(hw.teacherId);
            const dueDate = new Date(hw.dueDate);
            const isOverdue = dueDate < new Date() && hw.status === 'pending';
            const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

            return (
              <Link key={hw.id} href={`/dashboard/homework/${hw.id}`}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-1 h-full min-h-[60px] rounded-full hidden sm:block"
                        style={{ backgroundColor: subject?.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{hw.title}</h3>
                          {hw.type === 'group' && (
                            <Badge variant="primary">
                              <Users size={12} className="mr-1" /> Groupe
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mb-2">{subject?.name} • {teacher?.firstName} {teacher?.lastName}</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{hw.description}</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2">
                      <Badge
                        variant={
                          hw.status === 'graded' ? 'success' :
                          hw.status === 'submitted' ? 'primary' :
                          isOverdue ? 'danger' : 'warning'
                        }
                      >
                        {isOverdue ? 'En retard' : getStatusLabel(hw.status)}
                      </Badge>
                      <p className={cn(
                        'text-sm font-medium',
                        isOverdue ? 'text-red-600' :
                        daysUntilDue <= 3 ? 'text-yellow-600' : 'text-slate-500'
                      )}>
                        {isOverdue ? 'Échéance dépassée' :
                         daysUntilDue === 0 ? 'Aujourd\'hui' :
                         daysUntilDue === 1 ? 'Demain' :
                         `Dans ${daysUntilDue} jours`}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDate(hw.dueDate, { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
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

function TeacherHomeworkView({ teacherId }: { teacherId: string }) {
  const teacherHomework = homework.filter(h => h.teacherId === teacherId);

  // Get pending submissions count for each homework
  const homeworkWithStats = teacherHomework.map(hw => {
    const hwSubmissions = submissions.filter(s => s.homeworkId === hw.id);
    const classInfo = getClassById(hw.classId);
    const expectedCount = classInfo?.studentIds.length || 0;
    const submittedCount = hwSubmissions.filter(s => s.status !== 'pending').length;
    const toGradeCount = hwSubmissions.filter(s => s.status === 'submitted').length;

    return {
      ...hw,
      expectedCount,
      submittedCount,
      toGradeCount,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Devoirs assignés</h1>
        <Button>
          <Plus size={18} className="mr-2" />
          Nouveau devoir
        </Button>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {homeworkWithStats.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={24} />}
            title="Aucun devoir"
            description="Vous n'avez pas encore créé de devoirs."
            action={<Button>Créer un devoir</Button>}
          />
        ) : (
          homeworkWithStats.map(hw => {
            const subject = getSubjectById(hw.subjectId);
            const classInfo = getClassById(hw.classId);

            return (
              <Card key={hw.id} className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-1 h-full min-h-[60px] rounded-full hidden sm:block"
                      style={{ backgroundColor: subject?.color }}
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">{hw.title}</h3>
                      <p className="text-sm text-slate-500">
                        {subject?.name} • {classInfo?.name}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Échéance : {formatDate(hw.dueDate, { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {hw.submittedCount}/{hw.expectedCount}
                      </p>
                      <p className="text-xs text-slate-500">Rendus</p>
                    </div>

                    {hw.toGradeCount > 0 && (
                      <Badge variant="warning">
                        {hw.toGradeCount} à corriger
                      </Badge>
                    )}

                    <Link href={`/dashboard/homework/${hw.id}/submissions`}>
                      <Button variant="secondary" size="sm">
                        Voir les copies
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
