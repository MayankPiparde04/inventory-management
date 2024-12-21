import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Statistics from "./pages/Statistics";
import RemoveItem from "./pages/RemoveItem";
import AddItem from "./pages/AddItem";
import ReturnItem from "./pages/ReturnItem";
import AddNewCategory from "./pages/AddNewCategory";
import CategoryList from "./pages/CategoryList";
import Sidebar from "./component/Sidebar";

// Shared Layout Component
const Layout = () => (
  <div className="flex">
    {/* Sidebar */}
    <Sidebar />
    {/* Main Content */}
    <div className="flex-1 md:ml-14 ml-14 lg:m-0 h-screen overflow-auto">
      <Outlet />
    </div>
  </div>
);

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Statistics /> },
      { path: "/additem", element: <AddItem /> },
      { path: "/removeitem", element: <RemoveItem /> },
      { path: "/returnitem", element: <ReturnItem /> },
      { path: "/categorylist", element: <CategoryList /> },
      { path: "/addnewcategory", element: <AddNewCategory /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
