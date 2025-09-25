import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'HealthCompass Navigator',
  description: 'Your guide to finding the right medical specialist.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Toaster />
        <elevenlabs-convai agent-id="agent_6101k604gey3e8qrh4zzptf0gz02"></elevenlabs-convai>
        <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></Script>
      </body>
    </html>
  );
}
