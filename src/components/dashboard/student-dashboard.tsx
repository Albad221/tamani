'use client';

import Link from 'next/link';
import {
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  PlaySquare,
} from 'lucide-react';
import { User } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  getCoursesByDay,
  getGradesByStudent,
  getHomeworkByClass,
  getSubmissionsByStudent,
  getConversationsByUser,
  getPublishedMedia,
  getUserById,
  getSubjectById,
  calculateAverage,
  getUnreadNotifications,
} from '@/lib/mock-data';
import { formatDate, getDayName, getGradeColor, getCurrentDayOfWeek } from '@/lib/utils';

interface StudentDashboardProps {
  user: User;
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const today = getCurrentDayOfWeek();
  const todayCourses = user.classId ? getCoursesByDay(user.classId, today === 0 ? 1 : today) : [];
  const grades = getGradesByStudent(user.id);
  const homework = user.classId ? getHomeworkByClass(user.classId) : [];
  const submissions = getSubmissionsByStudent(user.id);
  const conversations = getConversationsByUser(user.id);
  const media = getPublishedMedia().slice(0, 3);
  const unreadNotifications = getUnreadNotifications(user.id);

  const generalAverage = calculateAverage(grades);
  const pendingHomework = homework.filter(h => {
    const sub = submissions.find(s => s.homeworkId === h.id);
    return !sub || sub.status === 'pending';
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Bonjour, {user.firstName} !
          </h1>
          <p className="text-slate-500">
            {getDayName(today === 0 ? 1 : today)}, {formatDate(new Date())}
          </p>
        </div>
        {unreadNotifications.length > 0 && (
          <Link href="/dashboard/notifications">
            <Badge variant="danger" className="cursor-pointer">
              {unreadNotifications.length} nouvelle{unreadNotifications.length > 1 ? 's' : ''} notification{unreadNotifications.length > 1 ? 's' : ''}
            </Badge>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Moyenne générale</p>
              <p className={`text-xl font-bold ${getGradeColor(generalAverage)}`}>
                {generalAverage.toFixed(2)}/20
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BookOpen size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Devoirs en cours</p>
              <p className="text-xl font-bold text-slate-900">{pendingHomework.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Cours aujourd&apos;hui</p>
              <p className="text-xl font-bold text-slate-900">{todayCourses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Conversations</p>
              <p className="text-xl font-bold text-slate-900">{conversations.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} className="text-primary-500" />
              Emploi du temps - Aujourd&apos;hui
            </CardTitle>
            <Link href="/dashboard/schedule" className="text-sm text-primary-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {todayCourses.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Pas de cours aujourd&apos;hui</p>
            ) : (
              <div className="space-y-3">
                {todayCourses.map((course) => {
                  const subject = getSubjectById(course.subjectId);
                  const teacher = getUserById(course.teacherId);
                  return (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border-l-4"
                      style={{ borderColor: course.color }}
                    >
                      <div className="flex-shrink-0 text-center">
                        <p className="text-sm font-semibold text-slate-900">{course.startTime}</p>
                        <p className="text-xs text-slate-500">{course.endTime}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900">{subject?.name}</p>
                        <p className="text-sm text-slate-500">
                          {teacher?.firstName} {teacher?.lastName} • {course.room}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Homework */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} className="text-yellow-500" />
              Devoirs à rendre
            </CardTitle>
            <Link href="/dashboard/homework" className="text-sm text-primary-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {pendingHomework.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Aucun devoir en attente</p>
            ) : (
              <div className="space-y-3">
                {pendingHomework.slice(0, 4).map((hw) => {
                  const subject = getSubjectById(hw.subjectId);
                  const dueDate = new Date(hw.dueDate);
                  const isUrgent = dueDate.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;
                  return (
                    <Link
                      key={hw.id}
                      href={`/dashboard/homework/${hw.id}`}
                      className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-slate-900">{hw.title}</p>
                          <p className="text-sm text-slate-500">{subject?.name}</p>
                        </div>
                        <Badge variant={isUrgent ? 'danger' : 'warning'}>
                          {formatDate(hw.dueDate, { day: 'numeric', month: 'short' })}
                        </Badge>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-green-500" />
              Dernières notes
            </CardTitle>
            <Link href="/dashboard/grades" className="text-sm text-primary-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {grades.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Aucune note pour le moment</p>
            ) : (
              <div className="space-y-3">
                {grades.slice(0, 4).map((grade) => {
                  const subject = getSubjectById(grade.subjectId);
                  return (
                    <div
                      key={grade.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{grade.title}</p>
                        <p className="text-sm text-slate-500">{subject?.name}</p>
                      </div>
                      <p className={`text-lg font-bold ${getGradeColor(grade.value)}`}>
                        {grade.value}/20
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Feed Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlaySquare size={20} className="text-purple-500" />
              Contenu récent
            </CardTitle>
            <Link href="/dashboard/media" className="text-sm text-primary-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {media.map((content) => {
                const author = getUserById(content.authorId);
                return (
                  <Link
                    key={content.id}
                    href={`/dashboard/media/${content.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{content.title}</p>
                      <p className="text-sm text-slate-500">
                        {author?.firstName} {author?.lastName}
                      </p>
                      <Badge variant="primary" className="mt-1 capitalize">
                        {content.type}
                      </Badge>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
