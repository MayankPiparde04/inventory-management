import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Statistics from "./pages/Statistics";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Return from "./pages/Return";
import Map from "./pages/Map";
import Sidebar from "./component/Sidebar";
import Purchase from "./pages/Purchase";

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
      { path: "/inventory", element: <Inventory /> },
      { path: "/sales", element: <Sales /> },
      { path: "/return", element: <Return /> },
      { path: "/map", element: <Map /> },
      { path: "/purchase", element: <Purchase /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
