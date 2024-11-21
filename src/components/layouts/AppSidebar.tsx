import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { MdSpaceDashboard } from 'react-icons/md';
import { MdFastfood } from 'react-icons/md';
import { HiDocumentText } from 'react-icons/hi';
import { PiPencilSimpleLineFill } from 'react-icons/pi';
import { FaUsers } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

// Menu items.
const primary = [
  {
    title: 'Laporan',
    url: '#',
    icon: MdSpaceDashboard,
  },
];

const order = [
  {
    title: 'Pesan',
    url: '#',
    icon: PiPencilSimpleLineFill,
  },
  {
    title: 'Transaksi',
    url: '#',
    icon: HiDocumentText,
  },
];

const setting = [
  {
    title: 'Daftar Makanan',
    url: '#',
    icon: MdFastfood,
  },
  {
    title: 'Daftar Pengguna',
    url: '#',
    icon: FaUsers,
  },
  {
    title: 'Pengaturan',
    url: '#',
    icon: MdSettings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full h-[30px] bg-white rounded-sm flex items-center justify-center">
          <p>KasirLite 1.0</p>
        </div>
      </SidebarHeader>

      {/* Bagian Utama */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bagian Pesanan */}
        <SidebarGroup>
          <SidebarGroupLabel>Pesanan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {order.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bagian pengaturan */}
        <SidebarGroup>
          <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {setting.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
