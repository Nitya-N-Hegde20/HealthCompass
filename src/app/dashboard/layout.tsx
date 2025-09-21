import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, User } from 'lucide-react';
import { LogoutButton } from '@/components/dashboard/logout-button';
import { HeartPulse } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
               <Link href="/" className="flex items-center space-x-2">
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="font-bold">HealthCompass</span>
              </Link>
            </div>
            <SidebarContent className="p-2 flex-1">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard"><LayoutDashboard /> Dashboard</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/profile"><User /> Profile</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2 mt-auto border-t">
              <LogoutButton />
            </SidebarFooter>
          </div>
        </Sidebar>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/40">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
