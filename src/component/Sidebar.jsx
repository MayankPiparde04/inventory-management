import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navLinks = [
        { label: "Statistics", path: "/" },
        { label: "Add Item", path: "/additem" },
        { label: "Remove Item", path: "/removeitem" },
        { label: "Return Item", path: "/returnitem" },
        { label: "Category List", path: "/categorylist" },
        { label: "Add New Category", path: "/addnewcategory" },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-52 z-10 bg-white text-gray-900 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } lg:translate-x-0 lg:static shadow-lg`}
            >
                {/* Sidebar Header */}
                <div className="p-4 text-xl font-bold border-b border-gray-200 flex items-center justify-between">
                    <span>Dashboard</span>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-900 text-2xl focus:outline-none lg:hidden"
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
                                `block px-4 py-2 rounded-l-lg ${isActive
                                    ? "bg-gray-300 font-semibold text-blue-900 ml-2"
                                    : "text-gray-950 hover:bg-gray-200 hover:text-indigo-700"
                                }`
                            }
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
                className={`fixed top-4 left-4 text-gray-900 text-2xl ${isSidebarOpen ? "hidden" : ""}`}
                aria-label="Open Sidebar"
            >
                &#9776;
            </button>

        </div>
    );
};

export default Sidebar;
