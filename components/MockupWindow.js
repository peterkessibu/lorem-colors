import React, { useState } from "react";
import { Menu, Settings, Bell, Calendar, Home, X } from "lucide-react";

const MockupWindow = ({ colors }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <div>Dashboard Content</div>;
            case 'settings':
                return <div>Settings Content</div>;
            case 'notifications':
                return <div>Notifications Content</div>;
            case 'calendar':
                return <div>Calendar Content</div>;
            default:
                return <div>Dashboard Content</div>;
        }
    };

    return (
        <div
            className="flex flex-col h-full border overflow-hidden"
            style={{ backgroundColor: colors.Background }}
        >
            {/* Header */}
            <div
                className="w-full p-4 flex items-center justify-between"
                style={{ backgroundColor: colors.Primary }}
            >
                <h2 className="text-lg font-bold" style={{ color: colors.Text }}>
                    SaaS Application
                </h2>
                <button
                    className="lg:hidden"
                    onClick={toggleSidebar}
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                    {isSidebarOpen ? (
                        <X className="w-6 h-6" style={{ color: colors.Text }} />
                    ) : (
                        <Menu className="w-6 h-6" style={{ color: colors.Text }} />
                    )}
                </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Sidebar */}
                <div
                    className={`absolute lg:relative w-64 h-full p-4 overflow-y-auto transition-transform duration-300 ease-in-out z-30 lg:z-auto lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    style={{ backgroundColor: colors.Secondary }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            className="text-lg font-bold"
                            style={{ color: colors.SidebarText }}
                        >
                            Menu
                        </h2>
                        <button
                            className="lg:hidden"
                            onClick={toggleSidebar}
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" style={{ color: colors.SidebarText }} />
                        </button>
                    </div>
                    <ul>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText, backgroundColor: colors.Accent }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.SidebarHover)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.Accent)
                                }
                                onClick={() => setCurrentView('dashboard')}
                            >
                                <Home className="w-6 h-6 mr-2" />
                                Dashboard
                            </div>
                        </li>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText, backgroundColor: colors.Accent }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.SidebarHover)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.Accent)
                                }
                                onClick={() => setCurrentView('settings')}
                            >
                                <Settings className="w-6 h-6 mr-2" />
                                Settings
                            </div>
                        </li>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText, backgroundColor: colors.Accent }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.SidebarHover)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.Accent)
                                }
                                onClick={() => setCurrentView('notifications')}
                            >
                                <Bell className="w-6 h-6 mr-2" />
                                Notifications
                            </div>
                        </li>
                        <li className="mb-2">
                            <div
                                className="flex items-center p-2 w-full cursor-pointer hover:bg-opacity-75 transition"
                                style={{ color: colors.SidebarText, backgroundColor: colors.Accent }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.SidebarHover)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = colors.Accent)
                                }
                                onClick={() => setCurrentView('calendar')}
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
                    {renderContent()}
                </div>
            </div>

            {/* Footer */}
            <div className="w-full p-4 items-center justify-center" style={{ backgroundColor: colors.Primary }}>
                <p style={{ color: colors.FooterText }}>
                    © 2024 SaaS Application. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default MockupWindow;