'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  courses,
  getCoursesByDay,
  getSubjectById,
  getUserById,
  getClassById,
} from '@/lib/mock-data';
import { getDayName, cn } from '@/lib/utils';

const DAYS = [1, 2, 3, 4, 5]; // Monday to Friday
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export default function SchedulePage() {
  const { user } = useAuthStore();
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay() || 1);
  const [view, setView] = useState<'week' | 'day'>('week');

  if (!user) return null;

  // Get courses based on user role
  const userCourses = user.role === 'student' && user.classId
    ? courses.filter(c => c.classId === user.classId)
    : user.role === 'teacher'
      ? courses.filter(c => c.teacherId === user.id)
      : courses;

  const dayCourses = userCourses.filter(c => c.dayOfWeek === selectedDay);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Emploi du temps</h1>
        <div className="flex gap-2">
          <Button
            variant={view === 'week' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('week')}
          >
            Semaine
          </Button>
          <Button
            variant={view === 'day' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('day')}
          >
            Jour
          </Button>
        </div>
      </div>

      {view === 'week' ? (
        <WeekView courses={userCourses} userRole={user.role} />
      ) : (
        <DayView
          courses={dayCourses}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          userRole={user.role}
        />
      )}
    </div>
  );
}

function WeekView({ courses, userRole }: { courses: typeof import('@/lib/mock-data').courses; userRole: string }) {
  return (
    <Card padding="none" className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 border-b border-slate-200">
          <div className="p-4 bg-slate-50 border-r border-slate-200">
            <span className="text-sm font-medium text-slate-500">Horaire</span>
          </div>
          {DAYS.map(day => (
            <div key={day} className="p-4 bg-slate-50 border-r border-slate-200 last:border-r-0">
              <span className="text-sm font-medium text-slate-900">{getDayName(day)}</span>
            </div>
          ))}
        </div>

        {/* Time slots */}
        {HOURS.map((hour, idx) => (
          <div key={hour} className="grid grid-cols-6 border-b border-slate-100 last:border-b-0">
            <div className="p-2 text-xs text-slate-500 border-r border-slate-100 bg-slate-50">
              {hour}
            </div>
            {DAYS.map(day => {
              const dayCourses = courses.filter(c => c.dayOfWeek === day);
              const courseAtHour = dayCourses.find(c => {
                const startHour = parseInt(c.startTime.split(':')[0]);
                const currentHour = parseInt(hour.split(':')[0]);
                return currentHour >= startHour && currentHour < startHour + 2;
              });

              if (courseAtHour && parseInt(courseAtHour.startTime.split(':')[0]) === parseInt(hour.split(':')[0])) {
                const subject = getSubjectById(courseAtHour.subjectId);
                const teacher = getUserById(courseAtHour.teacherId);
                const classInfo = getClassById(courseAtHour.classId);

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="p-2 border-r border-slate-100 last:border-r-0 row-span-2"
                    style={{ gridRow: `span 2` }}
                  >
                    <div
                      className="h-full p-2 rounded-lg text-white text-xs"
                      style={{ backgroundColor: courseAtHour.color }}
                    >
                      <p className="font-semibold truncate">{subject?.name}</p>
                      <p className="opacity-90 truncate">
                        {userRole === 'student' ? `${teacher?.firstName} ${teacher?.lastName}` : classInfo?.name}
                      </p>
                      <p className="opacity-80 truncate">{courseAtHour.room}</p>
                    </div>
                  </div>
                );
              }

              // Skip cell if course is ongoing from previous hour
              const ongoingCourse = dayCourses.find(c => {
                const startHour = parseInt(c.startTime.split(':')[0]);
                const currentHour = parseInt(hour.split(':')[0]);
                return currentHour > startHour && currentHour < startHour + 2;
              });

              if (ongoingCourse) return null;

              return (
                <div
                  key={`${day}-${hour}`}
                  className="p-2 border-r border-slate-100 last:border-r-0 min-h-[60px]"
                />
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}

function DayView({
  courses,
  selectedDay,
  onDayChange,
  userRole
}: {
  courses: typeof import('@/lib/mock-data').courses;
  selectedDay: number;
  onDayChange: (day: number) => void;
  userRole: string;
}) {
  const sortedCourses = [...courses].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <div className="space-y-4">
      {/* Day Navigation */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDayChange(selectedDay === 1 ? 5 : selectedDay - 1)}
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex gap-2">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => onDayChange(day)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedDay === day
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {getDayName(day).slice(0, 3)}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDayChange(selectedDay === 5 ? 1 : selectedDay + 1)}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </Card>

      {/* Course List */}
      <div className="space-y-3">
        {sortedCourses.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-500">Pas de cours ce jour</p>
          </Card>
        ) : (
          sortedCourses.map(course => {
            const subject = getSubjectById(course.subjectId);
            const teacher = getUserById(course.teacherId);
            const classInfo = getClassById(course.classId);

            return (
              <Card
                key={course.id}
                className="p-4 border-l-4 hover:shadow-md transition-shadow"
                style={{ borderLeftColor: course.color }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="text-center min-w-[60px]">
                      <p className="text-lg font-bold text-slate-900">{course.startTime}</p>
                      <p className="text-sm text-slate-500">{course.endTime}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{subject?.name}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {userRole === 'student'
                            ? `${teacher?.firstName} ${teacher?.lastName}`
                            : classInfo?.name
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {course.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          2h00
                        </span>
                      </div>
                    </div>
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
