'use client';

import {
  TrendingUp,
  Users,
  BookOpen,
  PlaySquare,
  Eye,
  MessageSquare,
  Clock,
  Calendar,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  users,
  classes,
  mediaContent,
  attendance,
  grades,
  submissions,
} from '@/lib/mock-data';

export default function AnalyticsPage() {
  // Calculate various metrics
  const studentCount = users.filter(u => u.role === 'student').length;
  const activeStudents = users.filter(u => u.role === 'student' && u.lastLoginAt).length;
  const activeRate = studentCount > 0 ? Math.round((activeStudents / studentCount) * 100) : 0;

  const totalMediaViews = mediaContent.reduce((sum, m) => sum + m.viewCount, 0);
  const publishedContent = mediaContent.filter(m => m.status === 'published').length;

  const presentAttendance = attendance.filter(a => a.status === 'present').length;
  const totalAttendance = attendance.length;
  const attendanceRate = totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0;

  const avgGrade = grades.length > 0
    ? (grades.reduce((sum, g) => sum + g.value, 0) / grades.length).toFixed(1)
    : '0';

  const submittedHomework = submissions.filter(s => s.status === 'submitted' || s.status === 'graded').length;
  const totalSubmissions = submissions.length;
  const submissionRate = totalSubmissions > 0 ? Math.round((submittedHomework / totalSubmissions) * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>

      {/* Main KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Utilisateurs actifs</p>
              <p className="text-2xl font-bold text-slate-900">{activeRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Moyenne générale</p>
              <p className="text-2xl font-bold text-slate-900">{avgGrade}/20</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Taux présence</p>
              <p className="text-2xl font-bold text-slate-900">{attendanceRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PlaySquare size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Vues média</p>
              <p className="text-2xl font-bold text-slate-900">{totalMediaViews}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Engagement Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement quotidien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary-500 rounded-t"
                    style={{ height: `${Math.random() * 60 + 40}%` }}
                  />
                  <span className="text-xs text-slate-500">{day}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mt-4">
              Connexions des utilisateurs cette semaine
            </p>
          </CardContent>
        </Card>

        {/* Content Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <PlaySquare size={20} className="text-purple-500" />
                  <span className="font-medium">Contenus publiés</span>
                </div>
                <span className="text-xl font-bold">{publishedContent}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-blue-500" />
                  <span className="font-medium">Total des vues</span>
                </div>
                <span className="text-xl font-bold">{totalMediaViews}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-green-500" />
                  <span className="font-medium">Commentaires</span>
                </div>
                <span className="text-xl font-bold">12</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-yellow-500" />
                  <span className="font-medium">Moyenne vues/contenu</span>
                </div>
                <span className="text-xl font-bold">
                  {publishedContent > 0 ? Math.round(totalMediaViews / publishedContent) : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Homework Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance devoirs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10B981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${submissionRate * 3.52} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">{submissionRate}%</span>
                </div>
              </div>
              <p className="text-slate-500 mt-4">Taux de rendu des devoirs</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 rounded-lg bg-green-50">
                <p className="text-2xl font-bold text-green-600">{submittedHomework}</p>
                <p className="text-sm text-green-600">Rendus</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-50">
                <p className="text-2xl font-bold text-yellow-600">{totalSubmissions - submittedHomework}</p>
                <p className="text-sm text-yellow-600">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par classe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map(cls => {
                const classGrades = grades.filter(g => {
                  const student = users.find(u => u.id === g.studentId);
                  return student?.classId === cls.id;
                });
                const classAvg = classGrades.length > 0
                  ? classGrades.reduce((sum, g) => sum + g.value, 0) / classGrades.length
                  : 0;

                return (
                  <div key={cls.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{cls.name}</span>
                      <span className="text-sm font-bold text-slate-900">
                        {classAvg.toFixed(1)}/20
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${(classAvg / 20) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {cls.studentIds.length} étudiants • {classGrades.length} notes
                    </p>
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
