import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navLinks = [
        { label: "Statistics", path: "/" },
        { label: "Inventory", path: "/inventory" },
        { label: "Sales", path: "/sales" },
        { label: "Return", path: "/return" },
        { label: "Map", path: "/map" },
        { label: "Purchase", path: "/purchase" },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-56 z-20 bg-white text-gray-800 shadow-lg transition-transform duration-300 border-r border-gray-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 lg:static`}
            >
                {/* Sidebar Header */}
                <div className="p-6 text-2xl font-semibold border-b border-gray-300 flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">Dashboard</span>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-800 text-3xl focus:outline-none lg:hidden"
                        aria-label="Close Sidebar"
                    >
                        &times;
                    </button>
                </div>
                {/* Navigation Links */}
                <nav className="mt-4 space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.path}
                            className={({ isActive }) =>
                                `block px-6 py-3 rounded-l-md ${isActive
                                    ? " ml-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 font-semibold text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                                } transition-all duration-300 ease-in-out`}
                            onClick={toggleSidebar} // Close sidebar on mobile
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-4 left-4 text-gray-800 text-3xl ${isSidebarOpen ? "hidden" : ""}`}
                aria-label="Open Sidebar"
            >
                &#9776;
            </button>
        </div>
    );
};

export default Sidebar;
