'use client';

import { useAuthStore } from '@/store/auth-store';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { TeacherDashboard } from '@/components/dashboard/teacher-dashboard';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard user={user} />;
    case 'teacher':
      return <TeacherDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    default:
      return null;
  }
}
