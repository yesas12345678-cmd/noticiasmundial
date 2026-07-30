import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import WorldCupBackground from '@/components/WorldCupBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Noticias Mundial | El Latido Diario de la Actualidad Global',
  description:
    'El portal independiente líder de información internacional y noticias de actualidad. Cobertura al minuto sobre política, economía, tecnología, cultura y deportes mundiales.',
  keywords: [
    'Noticias mundiales',
    'Actualidad internacional',
    'Información al minuto',
    'Noticias de economía',
    'Tecnología y ciencia',
    'Cultura y entretenimiento',
    'Deportes globales',
  ],
  authors: [{ name: 'Redacción Noticias Mundial' }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: '1VvvgvK2SNfVXg9kZmHo2eCVYGbMOm8f6FNoV5PWbXY',
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
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-purple-300">
        
        {/* World Cup 2026 Concentric Stripes Background */}
        <WorldCupBackground />

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
