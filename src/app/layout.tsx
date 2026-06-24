import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Noticias Mundial | Portal Informativo de Fútbol Internacional',
  description:
    'El portal independiente líder de noticias sobre el Mundial de Fútbol, convocatorias de selecciones internacionales, partes médicos, lesiones, resultados en vivo y estadísticas avanzadas.',
  keywords: [
    'Mundial de Fútbol',
    'Copa del Mundo',
    'Resultados en vivo',
    'Estadísticas de jugadores',
    'Lesiones y Convocatorias',
    'Selecciones de Fútbol',
  ],
  authors: [{ name: 'Redacción Noticias Mundial' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
        
        {/* Futuristic glowing grid behind everything */}
        <div className="fixed inset-0 -z-50 bg-[radial-gradient(ellipse_at_top,#10b98108,transparent_50%),radial-gradient(ellipse_at_bottom,#3b82f604,transparent_50%)] pointer-events-none" />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Cookie Consent Banner */}
        <CookieBanner />

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
