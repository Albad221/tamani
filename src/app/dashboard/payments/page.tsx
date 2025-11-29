'use client';

import {
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Calendar,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getInvoicesByStudent, invoices as allInvoices, getUserById } from '@/lib/mock-data';
import { formatDate, getStatusLabel, cn } from '@/lib/utils';

export default function PaymentsPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  if (user.role === 'student') {
    return <StudentPaymentsView userId={user.id} />;
  }

  return <AdminPaymentsView />;
}

function StudentPaymentsView({ userId }: { userId: string }) {
  const invoices = getInvoicesByStudent(userId);

  const totalPaid = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices
    .filter(i => i.status === 'pending' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const sortedInvoices = [...invoices].sort((a, b) =>
    new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Paiements & Scolarité</h1>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total payé</p>
              <p className="text-2xl font-bold text-green-600">
                {(totalPaid / 1000).toFixed(0)}k FCFA
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(totalPending / 1000).toFixed(0)}k FCFA
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Prochaine échéance</p>
              <p className="text-lg font-bold text-slate-900">
                {invoices.filter(i => i.status === 'pending')[0]
                  ? formatDate(invoices.filter(i => i.status === 'pending')[0].dueDate, { day: 'numeric', month: 'short' })
                  : '-'
                }
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedInvoices.map(invoice => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'p-2 rounded-lg',
                    invoice.status === 'paid' && 'bg-green-100',
                    invoice.status === 'pending' && 'bg-yellow-100',
                    invoice.status === 'overdue' && 'bg-red-100',
                  )}>
                    {invoice.status === 'paid' && <CheckCircle size={20} className="text-green-600" />}
                    {invoice.status === 'pending' && <Clock size={20} className="text-yellow-600" />}
                    {invoice.status === 'overdue' && <AlertCircle size={20} className="text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{invoice.description}</p>
                    <p className="text-sm text-slate-500">
                      Échéance: {formatDate(invoice.dueDate, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">
                      {(invoice.amount / 1000).toFixed(0)}k FCFA
                    </p>
                    <Badge
                      variant={
                        invoice.status === 'paid' ? 'success' :
                        invoice.status === 'pending' ? 'warning' : 'danger'
                      }
                    >
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </div>
                  {invoice.status === 'paid' && invoice.receiptUrl && (
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminPaymentsView() {
  // Group by status
  const paidInvoices = allInvoices.filter(i => i.status === 'paid');
  const pendingInvoices = allInvoices.filter(i => i.status === 'pending');
  const overdueInvoices = allInvoices.filter(i => i.status === 'overdue');

  const totalPaid = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = overdueInvoices.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Gestion des paiements</h1>

      {/* Summary */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-500 mb-1">Total encaissé</p>
          <p className="text-2xl font-bold text-green-600">{(totalPaid / 1000).toFixed(0)}k</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500 mb-1">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">{(totalPending / 1000).toFixed(0)}k</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500 mb-1">En retard</p>
          <p className="text-2xl font-bold text-red-600">{(totalOverdue / 1000).toFixed(0)}k</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500 mb-1">Taux recouvrement</p>
          <p className="text-2xl font-bold text-slate-900">
            {Math.round((totalPaid / (totalPaid + totalPending + totalOverdue)) * 100)}%
          </p>
        </Card>
      </div>

      {/* Overdue Invoices */}
      {overdueInvoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle size={20} />
              Paiements en retard ({overdueInvoices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueInvoices.map(invoice => {
                const student = getUserById(invoice.studentId);
                return (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {student?.firstName} {student?.lastName}
                      </p>
                      <p className="text-sm text-slate-500">{invoice.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-red-600">{(invoice.amount / 1000).toFixed(0)}k FCFA</p>
                        <p className="text-xs text-slate-500">
                          Depuis {formatDate(invoice.dueDate, { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <Button variant="danger" size="sm">Relancer</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Toutes les factures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Étudiant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Échéance</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Montant</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Statut</th>
                </tr>
              </thead>
              <tbody>
                {allInvoices.map(invoice => {
                  const student = getUserById(invoice.studentId);
                  return (
                    <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        {student?.firstName} {student?.lastName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{invoice.description}</td>
                      <td className="py-3 px-4 text-slate-600">
                        {formatDate(invoice.dueDate, { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {(invoice.amount / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant={
                            invoice.status === 'paid' ? 'success' :
                            invoice.status === 'pending' ? 'warning' : 'danger'
                          }
                        >
                          {getStatusLabel(invoice.status)}
                        </Badge>
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
