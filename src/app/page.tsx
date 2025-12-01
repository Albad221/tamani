'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  LayoutDashboard,
  Clapperboard,
  BarChart3,
  Check,
  ArrowRight,
  Play,
  Menu,
  X,
  Mic,
  Video,
  Download,
  PlayCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-primary-500 text-white p-2 rounded-lg">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Tamani<span className="text-primary-500">App</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#fonctionnalites" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">
                Fonctionnalités
              </a>
              <a href="#philosophie" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">
                Notre Vision
              </a>
              <a href="#avantages" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">
                Avantages
              </a>
              <Link
                href="/login"
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary-500/20"
              >
                Espace Étudiant
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-primary-500 p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 absolute w-full">
            <div className="flex flex-col space-y-4">
              <a href="#fonctionnalites" className="text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Fonctionnalités
              </a>
              <a href="#philosophie" className="text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Notre Vision
              </a>
              <a href="#avantages" className="text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Avantages
              </a>
              <Link
                href="/login"
                className="bg-primary-500 text-white px-5 py-2 rounded-lg font-medium w-full text-center"
              >
                Espace Étudiant
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/50 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/50 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 font-medium text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              La nouvelle expérience étudiante à Abidjan
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6 font-display">
              Plus qu&apos;une application,<br />
              <span className="bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent">
                un moteur de progrès.
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Centralisez votre vie étudiante et transformez votre quotidien.
              Une seule app pour le planning, les résultats et la création de contenu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold shadow-xl shadow-primary-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Accéder à l&apos;app
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center gap-2">
                <PlayCircle size={20} />
                Voir la démo
              </button>
            </div>
          </div>

          {/* Mockup Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="bg-slate-900 rounded-2xl shadow-2xl p-2 md:p-4 border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Dashboard Card */}
                <div className="bg-white rounded-lg p-4 overflow-hidden hidden md:block">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800">Mon Planning</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">En cours</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary-50 border-l-4 border-primary-500 rounded text-sm">
                      <div className="font-semibold text-slate-800">Mathématiques</div>
                      <div className="text-slate-500 text-xs">08:00 - 10:00 • Salle 204</div>
                    </div>
                    <div className="p-3 bg-slate-50 border-l-4 border-slate-300 rounded text-sm opacity-60">
                      <div className="font-semibold text-slate-800">Histoire-Géo</div>
                      <div className="text-slate-500 text-xs">10:15 - 12:15 • Salle B12</div>
                    </div>
                  </div>
                </div>

                {/* Main Media Feed Mock */}
                <div className="md:col-span-2 bg-slate-800 rounded-lg overflow-hidden relative h-64 md:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&h=600&fit=crop"
                    alt="Étudiants Tamani"
                    fill
                    className="object-cover opacity-70"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                    <span className="bg-primary-500 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                      Vie Étudiante
                    </span>
                    <h3 className="text-xl font-bold">La semaine des Arts</h3>
                    <p className="text-slate-300 text-sm mt-1">Reportage • Par le Club Journal • 5 min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 -top-6 bg-white p-3 rounded-lg shadow-xl border border-slate-100 animate-bounce hidden md:block">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                  <Check size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Présence validée</p>
                  <p className="text-sm font-bold text-slate-800">Cours de 08:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section id="fonctionnalites" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-display">
              Une architecture en trois piliers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tout a été pensé pour simplifier les usages réels des étudiants et de l&apos;administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Vie étudiante centralisée</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Une expérience fluide et intuitive. Retrouvez vos plannings, notes, absences et scolarité en un seul clic.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Notifications temps réel
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Gestion des devoirs
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clapperboard size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Média interne exclusif</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Des formats d&apos;apprentissage vivants. Podcasts, capsules vidéos et fiches créés par et pour les étudiants.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Culture partagée
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Infographies & Cours filmés
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pilotage pédagogique</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Une amélioration continue pilotée par la data. Quiz, A/B testing et feedback instantané.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Culture du feedback
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Engagement mesurable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophie" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
                Les étudiants sont des{' '}
                <span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                  apprenants
                </span>{' '}
                qui sont aussi des{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  acteurs
                </span>
                .
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Exprimez-vous ! Avec Tamani App, publiez, partagez, échangez entre étudiants.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Mic size={32} className="text-cyan-400 mb-3" />
                  <h4 className="font-bold text-lg mb-1">Podcasts</h4>
                  <p className="text-sm text-slate-400">Retours d&apos;expérience et interviews.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Video size={32} className="text-primary-400 mb-3" />
                  <h4 className="font-bold text-lg mb-1">Capsules</h4>
                  <p className="text-sm text-slate-400">Exposés filmés et partagés.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
                <Image
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1000&h=700&fit=crop"
                  alt="Étudiants créateurs"
                  width={600}
                  height={400}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-bold">Amina K.</p>
                      <p className="text-slate-300">Étudiante en MBA 1</p>
                    </div>
                  </div>
                  <p className="italic text-lg">
                    &ldquo;J&apos;ai publié mon projet de fin d&apos;année sur l&apos;app. Les retours ont été incroyables.&rdquo;
                  </p>
                </div>

                {/* Play button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/50 cursor-pointer hover:scale-110 transition-transform">
                  <Play size={32} className="text-white" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="avantages" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              Une expérience qui rehausse les standards
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Pour les étudiants', desc: 'Motivation, confiance et esprit d\'équipe. Une approche "apprendre en faisant".', color: 'primary' },
              { title: 'Pour la carrière', desc: 'Création de portfolios concrets et lisibles pour les recruteurs et MBA.', color: 'cyan' },
              { title: 'Pour la pédagogie', desc: 'Plus de clarté et d\'agilité. Des cours perçus comme utiles et actuels.', color: 'purple' },
              { title: 'Pour l\'attractivité', desc: 'Une identité singulière d\'école innovante qui séduit et fidélise.', color: 'pink' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-${item.color}-500`}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                <div className={`flex items-center text-${item.color}-600 text-sm font-semibold cursor-pointer hover:underline`}>
                  Voir les détails <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <GraduationCap size={24} className="text-primary-500" />
                <span className="text-xl font-bold">TamaniApp</span>
              </div>
              <p className="text-sm max-w-xs">
                L&apos;application qui centralise la vie étudiante et transforme l&apos;école en média inspirant.
                Abidjan, Côte d&apos;Ivoire.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
                <li><a href="#fonctionnalites" className="hover:text-primary-400 transition-colors">Fonctionnalités</a></li>
                <li><Link href="/login" className="hover:text-primary-400 transition-colors">Connexion</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>contact@tamani-school.ci</li>
                <li>+225 07 00 00 00 00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© 2024 Tamani School. Tous droits réservés.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Mentions Légales</a>
              <a href="#" className="hover:text-white">Politique de Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
