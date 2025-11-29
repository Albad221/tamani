'use client';

import Link from 'next/link';
import {
  Calendar,
  Users,
  ClipboardList,
  UserCheck,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { User } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  courses,
  classes,
  homework,
  submissions,
  attendance,
  getConversationsByUser,
  getUserById,
  getSubjectById,
  getClassById,
} from '@/lib/mock-data';
import { formatDate, getDayName, getCurrentDayOfWeek } from '@/lib/utils';

interface TeacherDashboardProps {
  user: User;
}

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  const today = getCurrentDayOfWeek();
  const teacherCourses = courses.filter(c => c.teacherId === user.id);
  const todayCourses = teacherCourses.filter(c => c.dayOfWeek === (today === 0 ? 1 : today));
  const teacherClasses = classes.filter(c =>
    teacherCourses.some(course => course.classId === c.id)
  );
  const teacherHomework = homework.filter(h => h.teacherId === user.id);
  const pendingSubmissions = submissions.filter(s =>
    s.status === 'submitted' && teacherHomework.some(h => h.id === s.homeworkId)
  );
  const conversations = getConversationsByUser(user.id);

  // Today's attendance for teacher's classes
  const todayStr = new Date().toISOString().split('T')[0];
  const classStudentIds = teacherClasses.flatMap(c => c.studentIds);
  const todayAttendance = attendance.filter(a =>
    a.date === todayStr && classStudentIds.includes(a.studentId)
  );
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bonjour, {user.firstName} !
        </h1>
        <p className="text-slate-500">
          {getDayName(today === 0 ? 1 : today)}, {formatDate(new Date())}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Calendar size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Cours aujourd&apos;hui</p>
              <p className="text-xl font-bold text-slate-900">{todayCourses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClipboardList size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">À corriger</p>
              <p className="text-xl font-bold text-slate-900">{pendingSubmissions.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Absents aujourd&apos;hui</p>
              <p className="text-xl font-bold text-slate-900">{absentToday}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Classes</p>
              <p className="text-xl font-bold text-slate-900">{teacherClasses.length}</p>
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
              Mes cours aujourd&apos;hui
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
                  const classInfo = getClassById(course.classId);
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
                          {classInfo?.name} • {course.room}
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/attendance?class=${course.classId}`}
                        className="text-sm text-primary-600 hover:underline"
                      >
                        Faire l&apos;appel
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submissions to Grade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList size={20} className="text-yellow-500" />
              Copies à corriger
            </CardTitle>
            <Link href="/dashboard/homework" className="text-sm text-primary-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {pendingSubmissions.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Aucune copie en attente</p>
            ) : (
              <div className="space-y-3">
                {pendingSubmissions.slice(0, 5).map((sub) => {
                  const hw = homework.find(h => h.id === sub.homeworkId);
                  const student = getUserById(sub.studentId);
                  const subject = hw ? getSubjectById(hw.subjectId) : null;
                  return (
                    <Link
                      key={sub.id}
                      href={`/dashboard/homework/${hw?.id}/submissions`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Avatar
                        src={student?.avatar}
                        firstName={student?.firstName || ''}
                        lastName={student?.lastName || ''}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {student?.firstName} {student?.lastName}
                        </p>
                        <p className="text-sm text-slate-500 truncate">{hw?.title}</p>
                      </div>
                      <Badge variant="warning">À corriger</Badge>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-green-500" />
              Mes classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-900">{cls.name}</p>
                    <p className="text-sm text-slate-500">{cls.studentIds.length} étudiants</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/attendance?class=${cls.id}`}
                      className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg"
                      title="Appel"
                    >
                      <UserCheck size={18} />
                    </Link>
                    <Link
                      href={`/dashboard/grades?class=${cls.id}`}
                      className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg"
                      title="Notes"
                    >
                      <ClipboardList size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} className="text-purple-500" />
              Messages récents
            </CardTitle>
            <Link href="/dashboard/messages" className="text-sm text-primary-600 hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {conversations.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Aucun message</p>
            ) : (
              <div className="space-y-3">
                {conversations.slice(0, 4).map((conv) => {
                  const otherParticipantId = conv.participantIds.find(id => id !== user.id);
                  const otherParticipant = otherParticipantId ? getUserById(otherParticipantId) : null;
                  return (
                    <Link
                      key={conv.id}
                      href={`/dashboard/messages/${conv.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Avatar
                        src={otherParticipant?.avatar}
                        firstName={otherParticipant?.firstName || '?'}
                        lastName={otherParticipant?.lastName || ''}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900">
                          {conv.type === 'group' ? conv.title : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {formatDate(conv.lastMessageAt, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
