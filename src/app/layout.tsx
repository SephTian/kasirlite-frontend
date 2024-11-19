import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from '@/components/layouts/Providers';

export const metadata: Metadata = {
  title: 'KasirLite',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
