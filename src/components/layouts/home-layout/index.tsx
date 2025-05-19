import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/home-layout/AppSidebar";
import { SiteHeader } from "@/components/layouts/home-layout/SiteHeader";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
