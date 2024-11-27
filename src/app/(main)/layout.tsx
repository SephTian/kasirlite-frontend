import { AppSidebar } from '@/components/layouts/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
//import Providers from '@/components/layouts/Providers';

export const metadata: Metadata = {
  title: 'KasirLite',
  description: 'Generated by create next app',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <nav className="fixed bg-white w-full flex justify-between items-center h-[50px] px-3 shadow-md border-b-2 border-customOrange z-10">
          <SidebarTrigger />
        </nav>
        <div className="p-4 mt-[50px]">{children}</div>
      </main>
    </SidebarProvider>
  );
}
