'use client';

import Link from 'next/link';
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  PlaySquare,
  FileText,
} from 'lucide-react';
import { User } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  users,
  classes,
  mediaContent,
  invoices,
  attendance,
} from '@/lib/mock-data';
import { formatDate, getDayName, getCurrentDayOfWeek } from '@/lib/utils';

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const today = getCurrentDayOfWeek();

  const studentCount = users.filter(u => u.role === 'student').length;
  const teacherCount = users.filter(u => u.role === 'teacher').length;
  const activeClasses = classes.length;

  const pendingContent = mediaContent.filter(m => m.status === 'pending');
  const overdueInvoices = invoices.filter(i => i.status === 'overdue');

  // Calculate attendance rate
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date.startsWith('2024-11'));
  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = todayAttendance.length > 0
    ? Math.round((presentCount / todayAttendance.length) * 100)
    : 0;

  // Revenue stats
  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingRevenue = invoices
    .filter(i => i.status === 'pending' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Tableau de bord administrateur
        </h1>
        <p className="text-slate-500">
          {getDayName(today === 0 ? 1 : today)}, {formatDate(new Date())}
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Élèves</p>
              <p className="text-xl font-bold text-slate-900">{studentCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Professeurs</p>
              <p className="text-xl font-bold text-slate-900">{teacherCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Classes</p>
              <p className="text-xl font-bold text-slate-900">{activeClasses}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Taux présence</p>
              <p className="text-xl font-bold text-slate-900">{attendanceRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              Alertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueInvoices.length > 0 && (
                <Link
                  href="/dashboard/payments"
                  className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <CreditCard size={20} className="text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">
                      {overdueInvoices.length} paiement{overdueInvoices.length > 1 ? 's' : ''} en retard
                    </p>
                    <p className="text-sm text-red-600">
                      {(pendingRevenue / 1000).toFixed(0)}k FCFA en attente
                    </p>
                  </div>
                  <Badge variant="danger">Urgent</Badge>
                </Link>
              )}

              {pendingContent.length > 0 && (
                <Link
                  href="/dashboard/media?status=pending"
                  className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-100 hover:bg-yellow-100 transition-colors"
                >
                  <PlaySquare size={20} className="text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">
                      {pendingContent.length} contenu{pendingContent.length > 1 ? 's' : ''} en attente de validation
                    </p>
                    <p className="text-sm text-yellow-600">
                      À modérer
                    </p>
                  </div>
                  <Badge variant="warning">En attente</Badge>
                </Link>
              )}

              {overdueInvoices.length === 0 && pendingContent.length === 0 && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                  <CheckCircle size={24} className="text-green-600" />
                  <p className="font-medium text-green-800">Tout est en ordre !</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/dashboard/admin/users"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Users size={18} className="text-slate-600" />
                <span className="text-sm font-medium">Gérer les utilisateurs</span>
              </Link>
              <Link
                href="/dashboard/payments"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <CreditCard size={18} className="text-slate-600" />
                <span className="text-sm font-medium">Voir les paiements</span>
              </Link>
              <Link
                href="/dashboard/media?status=pending"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <PlaySquare size={18} className="text-slate-600" />
                <span className="text-sm font-medium">Modérer le contenu</span>
              </Link>
              <Link
                href="/dashboard/admin/analytics"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <TrendingUp size={18} className="text-slate-600" />
                <span className="text-sm font-medium">Voir les analytics</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard size={20} className="text-green-500" />
              Finances
            </CardTitle>
            <Link href="/dashboard/payments" className="text-sm text-primary-600 hover:underline">
              Voir détails
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-50">
                <p className="text-sm text-green-600 mb-1">Encaissé</p>
                <p className="text-2xl font-bold text-green-700">
                  {(totalRevenue / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-green-600">FCFA</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50">
                <p className="text-sm text-yellow-600 mb-1">En attente</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {(pendingRevenue / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-yellow-600">FCFA</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Taux de recouvrement</span>
                <span className="font-medium">
                  {Math.round((totalRevenue / (totalRevenue + pendingRevenue)) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(totalRevenue / (totalRevenue + pendingRevenue)) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} className="text-blue-500" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Nouveau contenu publié</p>
                  <p className="text-xs text-slate-500">La semaine des Arts - Il y a 2h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Paiement reçu</p>
                  <p className="text-xs text-slate-500">Amina Koné - 250,000 FCFA - Il y a 5h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Contenu en attente</p>
                  <p className="text-xs text-slate-500">Nouveau podcast soumis - Il y a 1j</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Nouvel utilisateur</p>
                  <p className="text-xs text-slate-500">Ibrahim Traoré inscrit - Il y a 2j</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
