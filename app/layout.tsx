import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EastSecure Cyber Solutions | Leading Cybersecurity in East Africa',
  description: 'Top-tier cybersecurity services for Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. Expert threat intelligence, compliance, and digital protection solutions.',
  keywords: 'cybersecurity Kenya, cybersecurity East Africa, penetration testing, cyber threats, data protection, M-Pesa security',
  openGraph: {
    title: 'EastSecure Cyber Solutions',
    description: 'Safeguarding East Africa\'s Digital Landscape',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}