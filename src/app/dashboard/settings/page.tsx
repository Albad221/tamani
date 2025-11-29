'use client';

import { useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  LogOut,
  Camera,
  Save,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User as UserType } from '@/types';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'preferences';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Sécurité', icon: <Lock size={18} /> },
    { id: 'preferences', label: 'Préférences', icon: <Palette size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-2 h-fit">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <hr className="my-2" />
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && <ProfileSettings user={user} />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'preferences' && <PreferencesSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ user }: { user: UserType }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
  });

  const handleSave = () => {
    alert('Profil mis à jour !');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar
              src={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
              size="xl"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <p className="font-medium text-slate-900">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-slate-500 capitalize">{user.role}</p>
            <Button variant="secondary" size="sm" className="mt-2">
              Changer la photo
            </Button>
          </div>
        </div>

        <hr />

        {/* Form */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <Input
            label="Nom"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Enregistrer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailGrades: true,
    emailHomework: true,
    emailMessages: false,
    pushGrades: true,
    pushHomework: true,
    pushMessages: true,
    pushMedia: true,
  });

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={cn(
        'w-11 h-6 rounded-full transition-colors relative',
        checked ? 'bg-primary-500' : 'bg-slate-300'
      )}
    >
      <span
        className={cn(
          'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-slate-900 mb-4">Notifications Push</h3>
          <div className="space-y-4">
            {[
              { key: 'pushGrades', label: 'Nouvelles notes', desc: 'Recevoir une notification pour chaque nouvelle note' },
              { key: 'pushHomework', label: 'Devoirs', desc: 'Rappels pour les devoirs à rendre' },
              { key: 'pushMessages', label: 'Messages', desc: 'Nouveaux messages reçus' },
              { key: 'pushMedia', label: 'Contenu média', desc: 'Nouveaux contenus et commentaires' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <Toggle
                  checked={settings[item.key as keyof typeof settings]}
                  onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                />
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div>
          <h3 className="font-medium text-slate-900 mb-4">Notifications Email</h3>
          <div className="space-y-4">
            {[
              { key: 'emailGrades', label: 'Résumé des notes', desc: 'Récapitulatif hebdomadaire des notes' },
              { key: 'emailHomework', label: 'Rappels devoirs', desc: 'Email de rappel avant les échéances' },
              { key: 'emailMessages', label: 'Messages non lus', desc: 'Digest des messages non lus' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <Toggle
                  checked={settings[item.key as keyof typeof settings]}
                  onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sécurité du compte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-slate-900 mb-4">Changer le mot de passe</h3>
          <div className="space-y-4 max-w-md">
            <Input label="Mot de passe actuel" type="password" />
            <Input label="Nouveau mot de passe" type="password" />
            <Input label="Confirmer le mot de passe" type="password" />
            <Button>Mettre à jour le mot de passe</Button>
          </div>
        </div>

        <hr />

        <div>
          <h3 className="font-medium text-slate-900 mb-4">Sessions actives</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
              <div>
                <p className="font-medium text-slate-700">Chrome sur MacOS</p>
                <p className="text-sm text-slate-500">Abidjan, CI • Dernière activité: maintenant</p>
              </div>
              <span className="text-xs text-green-600 font-medium">Session actuelle</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
              <div>
                <p className="font-medium text-slate-700">Safari sur iPhone</p>
                <p className="text-sm text-slate-500">Abidjan, CI • Dernière activité: il y a 2h</p>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600">
                Déconnecter
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PreferencesSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences d&apos;affichage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-slate-900 mb-4">Langue</h3>
          <select className="w-full max-w-xs px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <hr />

        <div>
          <h3 className="font-medium text-slate-900 mb-4">Thème</h3>
          <div className="flex gap-4">
            {['Clair', 'Sombre', 'Système'].map(theme => (
              <button
                key={theme}
                className={cn(
                  'px-6 py-3 rounded-lg border-2 transition-colors',
                  theme === 'Clair'
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                {theme}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-2">Le thème sombre sera disponible prochainement.</p>
        </div>
      </CardContent>
    </Card>
  );
}
