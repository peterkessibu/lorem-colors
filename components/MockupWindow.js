// components/MockupWindow.js

import React from "react";
import {
    Menu,
    Settings,
    Bell,
    Calendar,
    Clock,
    User,
    Search,
    Home,
    Edit,
    Shield,
} from "lucide-react";

const MockupWindow = ({ colors }) => {
    return (
        <div
            className="flex flex-col h-full border rounded overflow-hidden"
            style={{ backgroundColor: colors.Background }}
        >
            {/* Header */}
            <div
                className="w-full p-4"
                style={{ backgroundColor: colors.Header }}
            >
                <h2 className="text-lg font-bold" style={{ color: colors.Text }}>
                    SaaS Application
                </h2>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className="w-64 p-4 overflow-y-auto"
                    style={{ backgroundColor: colors.Sidebar }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold" style={{ color: colors.SidebarText }}>
                            Menu
                        </h2>
                        <Menu className="w-6 h-6" style={{ color: colors.SidebarText }} />
                    </div>
                    <ul>
                        <li
                            className="mb-2"
                            style={{ backgroundColor: colors.Secondary }}
                        >
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.SidebarHover}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.Secondary}
                                onClick={() => { }}
                            >
                                <Home className="w-6 h-6 mr-2" />
                                Dashboard
                            </div>
                        </li>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.SidebarHover}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.Secondary}
                                onClick={() => { }}
                            >
                                <Settings className="w-6 h-6 mr-2" />
                                Settings
                            </div>
                        </li>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.SidebarHover}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.Secondary}
                                onClick={() => { }}
                            >
                                <Bell className="w-6 h-6 mr-2" />
                                Notifications
                            </div>
                        </li>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.SidebarHover}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.Secondary}
                                onClick={() => { }}
                            >
                                <Calendar className="w-6 h-6 mr-2" />
                                Calendar
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div
                    className="flex-1 p-4 overflow-y-auto"
                    style={{ backgroundColor: colors.Background }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold" style={{ color: colors.Text }}>
                            Dashboard
                        </h2>
                        <div className="flex items-center">
                            <Clock className="w-6 h-6 mr-4" style={{ color: colors.Text }} />
                            <User className="w-6 h-6 mr-4" style={{ color: colors.Text }} />
                            <Search className="w-6 h-6" style={{ color: colors.Text }} />
                        </div>
                    </div>
                    <div>
                        <h3
                            className="text-lg font-bold mb-2"
                            style={{ color: colors.Text }}
                        >
                            Overview
                        </h3>
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                                <div
                                    className="rounded shadow-md p-4"
                                    style={{ backgroundColor: colors.Accent }}
                                >
                                    <h4
                                        className="text-lg font-bold mb-2"
                                        style={{ color: colors.Text }}
                                    >
                                        Users
                                    </h4>
                                    <p style={{ color: colors.Text }}>100</p>
                                </div>
                            </div>
                            {/* ... Add more cards as needed */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="w-full p-4"
                style={{ backgroundColor: colors.Footer }}
            >
                <p style={{ color: colors.FooterText }}>© 2024 SaaS Application. All rights reserved.</p>
            </div>
        </div>
    );
};

export default MockupWindow;