import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  CreateTaskPage,
  CustomersPage,
  FunctionPage,
  HomePage,
  ParentCompaniesPage,
  ProfilePage,
  ReportsPage,
  RootPage,
  SettingsPage,
  TaskPage,
  TaskSummaryPage,
} from "@/pages";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const router = createBrowserRouter([
  { path: "/", element: <RootPage /> },
  {
    path: "/home",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "create-task", element: <CreateTaskPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "parent-companies", element: <ParentCompaniesPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "task-summary", element: <TaskSummaryPage /> },
      {
        path: ":abbreviation",
        element: <Outlet />,
        children: [
          { path: "", element: <TaskPage /> },
          { path: ":functionId", element: <FunctionPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
