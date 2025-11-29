'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash,
  Mail,
  UserCheck,
  UserX,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { users, classes, getClassById } from '@/lib/mock-data';
import { formatDate, cn } from '@/lib/utils';

type UserFilter = 'all' | 'student' | 'teacher' | 'admin';

export default function UsersPage() {
  const [filter, setFilter] = useState<UserFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter;
    const matchesSearch = !searchQuery ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Gestion des utilisateurs</h1>
        <Button>
          <Plus size={18} className="mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 cursor-pointer" hover onClick={() => setFilter('all')}>
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
        </Card>
        <Card className="p-4 cursor-pointer" hover onClick={() => setFilter('student')}>
          <p className="text-sm text-slate-500">Élèves</p>
          <p className="text-2xl font-bold text-blue-600">{stats.students}</p>
        </Card>
        <Card className="p-4 cursor-pointer" hover onClick={() => setFilter('teacher')}>
          <p className="text-sm text-slate-500">Professeurs</p>
          <p className="text-2xl font-bold text-green-600">{stats.teachers}</p>
        </Card>
        <Card className="p-4 cursor-pointer" hover onClick={() => setFilter('admin')}>
          <p className="text-sm text-slate-500">Admins</p>
          <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'student', 'teacher', 'admin'] as UserFilter[]).map(f => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'Tous' : f === 'student' ? 'Élèves' : f === 'teacher' ? 'Profs' : 'Admins'}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Utilisateur</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Rôle</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Classe</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Dernière connexion</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Statut</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => {
                  const userClass = user.classId ? getClassById(user.classId) : null;
                  return (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.avatar}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            size="sm"
                          />
                          <div>
                            <p className="font-medium text-slate-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            user.role === 'admin' ? 'primary' :
                            user.role === 'teacher' ? 'success' : 'default'
                          }
                          className="capitalize"
                        >
                          {user.role === 'student' ? 'Élève' : user.role === 'teacher' ? 'Prof' : 'Admin'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {userClass?.name || '-'}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-sm">
                        {user.lastLoginAt ? formatDate(user.lastLoginAt, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Jamais'}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={user.isActive ? 'success' : 'danger'}>
                          {user.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Email">
                            <Mail size={16} />
                          </button>
                          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Modifier">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Plus">
                            <MoreVertical size={16} />
                          </button>
                        </div>
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
