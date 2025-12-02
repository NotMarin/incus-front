"use client";

import { BanknoteArrowUp, LayoutDashboard, LogOut, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSidebarHeader } from "./sidebar-header";

const data = {
  navMain: [
    {
      name: "Inicio",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Noticias",
      url: "/news",
      icon: Newspaper,
    },
    {
      name: "Ventas Y Productos",
      url: "/sales-products",
      icon: BanknoteArrowUp,
    },
  ],
};

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
    router.refresh();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain projects={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Cerrar sesión">
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
