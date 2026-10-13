import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CONFIG } from '@/lib/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${CONFIG.brand.domain}`),
  title: {
    default: CONFIG.meta.title,
    template: '%s · ZestanSoft',
  },
  description: CONFIG.meta.description,
  keywords: ['telegram bot', 'treezestan', 'zestansoft', 'downloader', 'ai chat', 'bot indonesia'],
  authors: [{ name: 'ZestanSoft' }],
  openGraph: {
    title: CONFIG.meta.title,
    description: CONFIG.meta.description,
    url: `https://${CONFIG.brand.domain}`,
    siteName: 'ZestanSoft',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.meta.title,
    description: CONFIG.meta.description,
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.ico', apple: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
