import { ThemeProvider } from "@/providers/ThemeProvider";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { ActiveThemeProvider } from "./providers/ActiveTheme";
import { Toaster } from "@/components/ui/sonner";
import {
  ArchivedTasksPage,
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
  TemplatesPage,
  TrashedTasksPage,
  UsersPage,
} from "@/pages";
import TaskTemplatePage from "./pages/TaskTemplatePage";
import FnTemplatePage from "./pages/FnTemplatePage";
import FieldTemplatePage from "./pages/FieldTemplatePage";
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: "/", element: <RootPage /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      // Primary
      { path: "", element: <HomePage /> },
      { path: "taskboard", element: <TaskboardPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "archived", element: <ArchivedTasksPage /> },
      { path: "trashed", element: <TrashedTasksPage /> },

      // Masters
      { path: "parent-companies", element: <ParentCompaniesPage /> },
      { path: "customers", element: <CustomersPage /> },
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
