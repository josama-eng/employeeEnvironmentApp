import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import HomePage from "./pages/HomePage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import DepartmentPage from "./pages/DepartmentPage";
import AddEmployee from "./pages/AddEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },
      {
        path: "task/:id",
        element: <TaskDetailsPage />,
      },
      {
        path: "employee/:id",
        element: <EmployeeDetailsPage />,
      },
      {
        path: "/departments",
        element: <DepartmentPage />,
      },
      {
        path: "/addEmployee",
        element: <AddEmployee />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
