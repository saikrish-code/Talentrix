import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Talentrix',
    default: 'Talentrix — AI-Powered Recruitment Platform',
  },
  description:
    'Enterprise-grade AI recruitment platform for talent acquisition, candidate management, and intelligent hiring workflows.',
  keywords: ['recruitment', 'ATS', 'AI', 'hiring', 'talent acquisition', 'HR'],
  authors: [{ name: 'Talentrix' }],
  openGraph: {
    type: 'website',
    title: 'Talentrix — AI-Powered Recruitment Platform',
    description: 'Enterprise-grade AI recruitment platform',
    siteName: 'Talentrix',
  },
  robots: { index: false }, // private enterprise app
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
