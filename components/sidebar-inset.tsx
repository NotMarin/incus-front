"use client";

import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

function NavSIdebarInset() {
  const pathname = usePathname();

  const titleActive = () => {
    switch (pathname) {
      case "/dashboard":
        return "Inicio";
      case "/news":
        return "Noticias";
      case "/sales":
        return "Ventas";
      case "/administration":
        return "Administración";
      default:
        return null;
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-xl font-medium">{titleActive()}</h1>
      </div>
    </header>
  );
}

export default NavSIdebarInset;
