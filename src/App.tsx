import { ThemeProvider } from "@/providers/ThemeProvider";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { ActiveThemeProvider } from "./providers/ActiveTheme";
import { Toaster } from "@/components/ui/sonner";
import {
  ArchivedTasksPage,
  CustomerPage,
  CustomersPage,
  DocumentsPage,
  DropdownsPage,
  HomeLayout,
  HomePage,
  InventoriesPage,
  InvoicesPage,
  ParentCompaniesPage,
  ReportsPage,
  RootPage,
  TaskboardPage,
  TaskPage,
  TemplatesPage,
  TrashedTasksPage,
  UsersPage,
} from "@/pages";
import TaskTemplatePage from "./pages/TaskTemplatePage";
import FnTemplatePage from "./pages/FnTemplatePage";
import FieldTemplatePage from "./pages/FieldTemplatePage";

const router = createBrowserRouter([
  { path: "/", element: <RootPage /> },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      // Primary
      { path: "", element: <HomePage /> },
      {
        path: "taskboard",
        element: <Outlet />,
        children: [
          { path: "", element: <TaskboardPage /> },
          { path: ":taskboardId", element: <TaskPage /> },
        ],
      },
      { path: "reports", element: <ReportsPage /> },
      { path: "archived", element: <ArchivedTasksPage /> },
      { path: "trashed", element: <TrashedTasksPage /> },

      // Masters
      { path: "parent-companies", element: <ParentCompaniesPage /> },
      {
        path: "customers",
        element: <Outlet />,
        children: [
          { path: "", element: <CustomersPage /> },
          { path: ":customerId", element: <CustomerPage /> },
        ],
      },
      { path: "dropdowns", element: <DropdownsPage /> },
      { path: "inventories", element: <InventoriesPage /> },
      { path: "invoices", element: <InvoicesPage /> },
      { path: "documents", element: <DocumentsPage /> },

      // Settings
      { path: "users", element: <UsersPage /> },
      {
        path: "templates",
        element: <Outlet />,
        children: [
          { path: "", element: <TemplatesPage /> },
          {
            path: ":taskTemplateId",
            element: <Outlet />,
            children: [
              { path: "", element: <TaskTemplatePage /> },
              {
                path: ":fnTemplateId",
                element: <Outlet />,
                children: [
                  { path: "", element: <FnTemplatePage /> },
                  { path: ":fieldTemplateId", element: <FieldTemplatePage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ActiveThemeProvider initialTheme="default">
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </ActiveThemeProvider>
    </ThemeProvider>
  );
}
