'use client';

import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Users,
  Filter,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  attendance,
  courses,
  getAttendanceByStudent,
  getCoursesByDay,
  getSubjectById,
  getUserById,
  getClassById,
  classes,
} from '@/lib/mock-data';
import { formatDate, getDayName, getStatusLabel, cn } from '@/lib/utils';

export default function AttendancePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  if (user.role === 'student') {
    return <StudentAttendanceView userId={user.id} />;
  }

  return <TeacherAttendanceView teacherId={user.id} />;
}

function StudentAttendanceView({ userId }: { userId: string }) {
  const userAttendance = getAttendanceByStudent(userId);

  // Calculate stats
  const stats = {
    present: userAttendance.filter(a => a.status === 'present').length,
    absent: userAttendance.filter(a => a.status === 'absent').length,
    late: userAttendance.filter(a => a.status === 'late').length,
    excused: userAttendance.filter(a => a.status === 'excused').length,
  };
  const total = stats.present + stats.absent + stats.late + stats.excused;
  const attendanceRate = total > 0 ? Math.round(((stats.present + stats.excused) / total) * 100) : 100;

  const sortedAttendance = [...userAttendance].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mes absences</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 lg:col-span-1">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">{attendanceRate}%</p>
            <p className="text-sm text-slate-500">Taux de présence</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{stats.present}</p>
              <p className="text-sm text-slate-500">Présent</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{stats.absent}</p>
              <p className="text-sm text-slate-500">Absent</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{stats.late}</p>
              <p className="text-sm text-slate-500">En retard</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertTriangle size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{stats.excused}</p>
              <p className="text-sm text-slate-500">Excusé</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedAttendance.length === 0 ? (
            <p className="text-slate-500 text-center py-4">Aucun enregistrement</p>
          ) : (
            <div className="space-y-3">
              {sortedAttendance.map(record => {
                const course = courses.find(c => c.id === record.courseId);
                const subject = course ? getSubjectById(course.subjectId) : null;

                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        record.status === 'present' && 'bg-green-100',
                        record.status === 'absent' && 'bg-red-100',
                        record.status === 'late' && 'bg-yellow-100',
                        record.status === 'excused' && 'bg-blue-100',
                      )}>
                        {record.status === 'present' && <CheckCircle size={20} className="text-green-600" />}
                        {record.status === 'absent' && <XCircle size={20} className="text-red-600" />}
                        {record.status === 'late' && <Clock size={20} className="text-yellow-600" />}
                        {record.status === 'excused' && <AlertTriangle size={20} className="text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{subject?.name || 'Cours'}</p>
                        <p className="text-sm text-slate-500">
                          {formatDate(record.date, { weekday: 'long', day: 'numeric', month: 'long' })}
                          {record.minutesLate && ` • ${record.minutesLate} min de retard`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          record.status === 'present' ? 'success' :
                          record.status === 'absent' ? 'danger' :
                          record.status === 'late' ? 'warning' : 'primary'
                        }
                      >
                        {getStatusLabel(record.status)}
                      </Badge>
                      {record.justification && (
                        <p className="text-xs text-slate-500 mt-1">{record.justification}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TeacherAttendanceView({ teacherId }: { teacherId: string }) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Get teacher's classes
  const teacherCourses = courses.filter(c => c.teacherId === teacherId);
  const teacherClassIds = [...new Set(teacherCourses.map(c => c.classId))];
  const teacherClasses = classes.filter(c => teacherClassIds.includes(c.id));

  const selectedClassInfo = selectedClass ? getClassById(selectedClass) : null;
  const classStudents = selectedClassInfo
    ? selectedClassInfo.studentIds.map(id => getUserById(id)).filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Appel</h1>
      </div>

      {/* Class Selection */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Sélectionner une classe</h3>
        <div className="flex flex-wrap gap-2">
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
      </Card>

      {/* Roll Call */}
      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              {selectedClassInfo?.name} - {formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classStudents.map(student => {
                if (!student) return null;
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={student.avatar}
                        firstName={student.firstName}
                        lastName={student.lastName}
                        size="md"
                      />
                      <p className="font-medium text-slate-900">
                        {student.firstName} {student.lastName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                        <CheckCircle size={20} />
                      </button>
                      <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                        <XCircle size={20} />
                      </button>
                      <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors">
                        <Clock size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <Button>Valider l&apos;appel</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
