import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tamani App - Plateforme Académique',
  description: 'L\'application qui centralise la vie étudiante et transforme l\'école en média inspirant.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
