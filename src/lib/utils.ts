import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', options || { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatTime(time: string): string {
  return time;
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'À l\'instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;

  return formatDate(d, { day: 'numeric', month: 'short' });
}

export function getDayName(dayOfWeek: number): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return days[dayOfWeek];
}

export function getCurrentDayOfWeek(): number {
  return new Date().getDay();
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getGradeColor(grade: number): string {
  if (grade >= 16) return 'text-green-600';
  if (grade >= 14) return 'text-blue-600';
  if (grade >= 12) return 'text-yellow-600';
  if (grade >= 10) return 'text-orange-600';
  return 'text-red-600';
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'present':
    case 'paid':
    case 'published':
    case 'graded':
    case 'submitted':
      return 'badge-success';
    case 'pending':
    case 'draft':
      return 'badge-warning';
    case 'absent':
    case 'late':
    case 'overdue':
    case 'rejected':
      return 'badge-danger';
    case 'excused':
      return 'badge-primary';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    present: 'Présent',
    absent: 'Absent',
    late: 'En retard',
    excused: 'Excusé',
    pending: 'En attente',
    submitted: 'Rendu',
    graded: 'Noté',
    paid: 'Payé',
    overdue: 'En retard',
    cancelled: 'Annulé',
    published: 'Publié',
    draft: 'Brouillon',
    rejected: 'Rejeté',
  };
  return labels[status] || status;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
