'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, User, BookOpen, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAs } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Email ou mot de passe incorrect');
    }
    setIsLoading(false);
  };

  const handleQuickLogin = (role: 'student' | 'teacher' | 'admin') => {
    loginAs(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-primary-500 text-white p-3 rounded-xl">
            <GraduationCap size={32} />
          </div>
          <span className="text-3xl font-bold text-slate-900">
            Tamani<span className="text-primary-500">App</span>
          </span>
        </div>

        <Card className="p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Bienvenue
          </h1>
          <p className="text-slate-500 text-center mb-8">
            Connectez-vous pour accéder à votre espace
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />
            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Se connecter
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Quick Login for Demo */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center mb-4">
              Connexion rapide (démo)
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleQuickLogin('student')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <span className="text-xs font-medium text-slate-700">Élève</span>
              </button>
              <button
                onClick={() => handleQuickLogin('teacher')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen size={20} className="text-green-600" />
                </div>
                <span className="text-xs font-medium text-slate-700">Professeur</span>
              </button>
              <button
                onClick={() => handleQuickLogin('admin')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <span className="text-xs font-medium text-slate-700">Admin</span>
              </button>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          © 2024 Tamani School. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
