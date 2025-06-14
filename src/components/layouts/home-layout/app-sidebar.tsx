import * as React from "react";
import {
  BarChartIcon,
  ClipboardListIcon,
  FileArchiveIcon,
  FileIcon,
  FileTextIcon,
  HomeIcon,
  KanbanIcon,
  ListIcon,
  PackageIcon,
  SettingsIcon,
  TrashIcon,
  UsersIcon,
  Building2Icon,
  BuildingIcon,
  CreditCardIcon,
  FileStackIcon,
} from "lucide-react";

import { NavMain } from "@/components/layouts/home-layout/nav-main";
import { NavSecondary } from "@/components/layouts/home-layout/nav-secondary";
import { NavUser } from "@/components/layouts/home-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    // Primary
    {
      title: "Home",
      url: "/home",
      icon: HomeIcon,
    },
    {
      title: "Taskboard",
      url: "/home/taskboard",
      icon: KanbanIcon,
    },
    {
      title: "Reports",
      url: "/home/reports",
      icon: BarChartIcon,
    },
    {
      title: "Archived Tasks",
      url: "/home/archived",
      icon: FileArchiveIcon,
    },
    {
      title: "Trashed Tasks",
      url: "/home/trashed",
      icon: TrashIcon,
    },
  ],
  navMasters: [
    {
      title: "Parent Companies",
      url: "/home/parent-companies",
      icon: BuildingIcon,
    },
    {
      title: "Customers",
      url: "/home/customers",
      icon: Building2Icon,
    },
    {
      title: "Dropdowns",
      url: "/home/dropdowns",
      icon: ListIcon,
    },
    {
      title: "Inventories",
      url: "/home/inventories",
      icon: PackageIcon,
    },
    {
      title: "Invoices",
      url: "/home/invoices",
      icon: CreditCardIcon,
    },
    {
      title: "Documents",
      url: "/home/documents",
      icon: FileStackIcon,
    },
  ],
  navSettings: [
    {
      title: "Users",
      url: "/home/users",
      icon: UsersIcon,
    },
    {
      title: "Templates",
      url: "/home/templates",
      icon: FileTextIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
  documents: [
    {
      name: "Recent Documents",
      url: "/home/documents",
      icon: FileIcon,
    },
    {
      name: "Reports",
      url: "/home/reports",
      icon: ClipboardListIcon,
    },
    {
      name: "Templates",
      url: "/home/templates",
      icon: FileTextIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="border-r border-indigo-200 dark:border-indigo-900/40"
    >
      <SidebarHeader className="border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-[45px] cursor-pointer"
            >
              <Link to="/home">
                <Avatar>
                  <AvatarImage
                    className="border-2 border-indigo-200 dark:border-indigo-900/40 rounded-full ring-4 ring-indigo-200 dark:ring-indigo-900/40"
                    src="/shiva-enterprise-logo.png"
                  />
                  <AvatarFallback>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 tracking-wide mt-0.5 whitespace-nowrap">
                      company-logo
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-extrabold text-[16px]">SHIVA ENTERPRISES</p>
                  <span className="text-[14px] font-extrabold text-indigo-600 dark:text-indigo-300 tracking-wide mt-0.5 whitespace-nowrap">
                    #taskify
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-gray-900">
        <NavMain items={data.navMain} />
        <NavMain items={data.navMasters} title="Masters" />
        <NavSecondary items={data.navSettings} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-indigo-100 dark:border-indigo-900/40 dark:bg-gray-900">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
