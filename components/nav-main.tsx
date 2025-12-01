"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    {
      return pathname === url;
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Gestión de productos</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              className={cn(
                isActive(item.url) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "",
                "[&>svg]:size-5"
              )}
            >
              <a href={item.url}>
                {item.icon && <item.icon size={24} />}
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
