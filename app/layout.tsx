import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'SDS - Services de Développement Sur-Mesure',
  description: 'Créatrice de solutions web glamour et performantes. Sites vitrines, landing pages, intégrations Web3 et plus encore.',
  keywords: 'développement web, sites vitrines, landing page, Web3, React, Next.js',
  authors: [{ name: 'SDS' }],
  openGraph: {
    title: 'SDS - Services de Développement Sur-Mesure',
    description: 'Créatrice de solutions web glamour et performantes',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-cream text-charcoal font-montserrat">
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}