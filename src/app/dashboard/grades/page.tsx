'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  getGradesByStudent,
  grades as allGrades,
  subjects,
  getSubjectById,
  getUserById,
  calculateAverage,
  classes,
} from '@/lib/mock-data';
import { formatDate, getGradeColor, cn } from '@/lib/utils';

export default function GradesPage() {
  const { user } = useAuthStore();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  if (!user) return null;

  if (user.role === 'student') {
    return <StudentGradesView userId={user.id} selectedSubject={selectedSubject} onSubjectChange={setSelectedSubject} />;
  }

  if (user.role === 'teacher') {
    return <TeacherGradesView teacherId={user.id} />;
  }

  return <AdminGradesView />;
}

function StudentGradesView({
  userId,
  selectedSubject,
  onSubjectChange
}: {
  userId: string;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}) {
  const grades = getGradesByStudent(userId);
  const filteredGrades = selectedSubject === 'all'
    ? grades
    : grades.filter(g => g.subjectId === selectedSubject);

  const generalAverage = calculateAverage(grades);

  // Calculate averages by subject
  const subjectAverages = subjects.map(subject => {
    const subjectGrades = grades.filter(g => g.subjectId === subject.id);
    return {
      subject,
      average: calculateAverage(subjectGrades),
      count: subjectGrades.length,
    };
  }).filter(s => s.count > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Mes notes</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-500">Moyenne générale</p>
            <p className={cn('text-2xl font-bold', getGradeColor(generalAverage))}>
              {generalAverage.toFixed(2)}/20
            </p>
          </div>
        </div>
      </div>

      {/* Subject Averages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjectAverages.map(({ subject, average, count }) => (
          <Card
            key={subject.id}
            className={cn(
              'p-4 cursor-pointer transition-all',
              selectedSubject === subject.id && 'ring-2 ring-primary-500'
            )}
            hover
            onClick={() => onSubjectChange(selectedSubject === subject.id ? 'all' : subject.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{subject.name}</p>
                <p className="text-xs text-slate-500">{count} note{count > 1 ? 's' : ''}</p>
              </div>
              <p className={cn('text-lg font-bold', getGradeColor(average))}>
                {average.toFixed(1)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Grades List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedSubject === 'all' ? 'Toutes les notes' : `Notes - ${getSubjectById(selectedSubject)?.name}`}
          </CardTitle>
          {selectedSubject !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => onSubjectChange('all')}>
              Voir tout
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredGrades.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Aucune note</p>
            ) : (
              filteredGrades.map(grade => {
                const subject = getSubjectById(grade.subjectId);
                return (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-1 h-12 rounded-full"
                        style={{ backgroundColor: subject?.color }}
                      />
                      <div>
                        <p className="font-medium text-slate-900">{grade.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-slate-500">{subject?.name}</p>
                          <span className="text-slate-300">•</span>
                          <p className="text-sm text-slate-500">
                            {formatDate(grade.date, { day: 'numeric', month: 'short' })}
                          </p>
                          <Badge variant="default" className="capitalize">
                            {grade.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn('text-2xl font-bold', getGradeColor(grade.value))}>
                        {grade.value}
                      </p>
                      <p className="text-sm text-slate-500">/ 20</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TeacherGradesView({ teacherId }: { teacherId: string }) {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const teacherGrades = allGrades.filter(g => g.teacherId === teacherId);

  // Get classes taught by teacher
  const teacherClasses = classes.filter(cls =>
    teacherGrades.some(g => {
      const student = getUserById(g.studentId);
      return student?.classId === cls.id;
    })
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Gestion des notes</h1>
        <Button>Nouvelle évaluation</Button>
      </div>

      {/* Class Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedClass === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedClass('all')}
        >
          Toutes les classes
        </Button>
        {teacherClasses.map(cls => (
          <Button
            key={cls.id}
            variant={selectedClass === cls.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedClass(cls.id)}
          >
            {cls.name}
          </Button>
        ))}
      </div>

      {/* Recent Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Notes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Élève</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Évaluation</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Matière</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Note</th>
                </tr>
              </thead>
              <tbody>
                {teacherGrades.slice(0, 10).map(grade => {
                  const student = getUserById(grade.studentId);
                  const subject = getSubjectById(grade.subjectId);
                  return (
                    <tr key={grade.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-900">
                          {student?.firstName} {student?.lastName}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-700">{grade.title}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: subject?.color }}
                          />
                          <span className="text-slate-600">{subject?.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {formatDate(grade.date, { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn('font-bold', getGradeColor(grade.value))}>
                          {grade.value}/20
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminGradesView() {
  // Calculate overall statistics
  const avgBySubject = subjects.map(subject => {
    const subjectGrades = allGrades.filter(g => g.subjectId === subject.id);
    const avg = subjectGrades.length > 0
      ? subjectGrades.reduce((sum, g) => sum + g.value, 0) / subjectGrades.length
      : 0;
    return { subject, average: avg, count: subjectGrades.length };
  }).filter(s => s.count > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Statistiques des notes</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Moyennes par matière</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {avgBySubject.map(({ subject, average, count }) => (
                <div key={subject.id} className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: subject.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{subject.name}</span>
                      <span className={cn('text-sm font-bold', getGradeColor(average))}>
                        {average.toFixed(1)}/20
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(average / 20) * 100}%`,
                          backgroundColor: subject.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{count} notes</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution des notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Excellent (16-20)', min: 16, max: 20, color: 'bg-green-500' },
                { label: 'Bien (14-16)', min: 14, max: 16, color: 'bg-blue-500' },
                { label: 'Assez bien (12-14)', min: 12, max: 14, color: 'bg-yellow-500' },
                { label: 'Passable (10-12)', min: 10, max: 12, color: 'bg-orange-500' },
                { label: 'Insuffisant (0-10)', min: 0, max: 10, color: 'bg-red-500' },
              ].map(range => {
                const count = allGrades.filter(g =>
                  g.value >= range.min && g.value < (range.max === 20 ? 21 : range.max)
                ).length;
                const percentage = allGrades.length > 0 ? (count / allGrades.length) * 100 : 0;

                return (
                  <div key={range.label} className="flex items-center gap-3">
                    <div className={cn('w-3 h-3 rounded-full', range.color)} />
                    <span className="text-sm text-slate-600 w-32">{range.label}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', range.color)}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
