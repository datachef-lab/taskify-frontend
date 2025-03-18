import * as React from "react";

import { NavMain } from "@/components/globals/NavMain";

import { NavUser } from "@/components/globals/NavUser";
import { TeamSwitcher } from "@/components/globals/TeamSwitcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import {
  GalleryVerticalEnd,
  ListChecks,
  Home,
  PlusCircle,
  Users,
  Building,
  Activity,
  BarChart3,
  Settings,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Taskify!",
      logo: GalleryVerticalEnd,
      plan: "#development",
    },
  ],
  navMain: [
    {
      title: "Task Summary",
      url: "/home/task-summary",
      icon: ListChecks,
    },
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Create Task",
      url: "/home/create-task",
      icon: PlusCircle,
    },
    {
      title: "Customers",
      url: "/home/customers",
      icon: Users,
    },
    {
      title: "Parent Companies",
      url: "/home/parent-companies",
      icon: Building,
    },
    {
      title: "Activities Log",
      url: "/home/activities",
      icon: Activity,
    },
    {
      title: "Reports",
      url: "/home/reports",
      icon: BarChart3,
    },
    {
      title: "Setting",
      url: "/home/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="px-0 flex justify-center">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
