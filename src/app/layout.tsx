import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from '@/components/layouts/providers';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Sesuaikan dengan kebutuhan
});

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
      <body className={poppins.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
