"use client";

import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavSIdebarInset from "@/components/sidebar-inset";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/signup";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavSIdebarInset />
        <main className="flex flex-1 flex-col overflow-hidden px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
