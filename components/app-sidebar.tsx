"use client";

import { BanknoteArrowUp, LayoutDashboard, Newspaper, UserStar } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain projects={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
