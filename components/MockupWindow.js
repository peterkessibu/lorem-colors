import React from 'react';
import { Menu, Settings, Bell, Calendar, Clock, User, Search, Home, Edit, Shield } from 'lucide-react';

const MockupWindow = ({ colors }) => {
    return (
        <div className="flex h-screen flex-col md:flex-row" style={{ backgroundColor: colors.background }}>
            <div className="w-full md:w-64 p-4 md:p-8" style={{ backgroundColor: colors.primary }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold" style={{ color: colors.text }}>SaaS Application</h2>
                    <Menu className="w-6 h-6" style={{ color: colors.text }} />
                </div>
                <ul>
                    <li className="mb-2" style={{ backgroundColor: colors.secondary }}>
                        <div className="flex items-center p-2 w-full" style={{ color: colors.text }}>
                            <Home className="w-6 h-6 mr-2" />
                            Dashboard
                        </div>
                    </li>
                    <li className="mb-2">
                        <div className="flex items-center p-2 w-full" style={{ color: colors.text }}>
                            <Settings className="w-6 h-6 mr-2" />
                            Settings
                        </div>
                    </li>
                    <li className="mb-2">
                        <div className="flex items-center p-2 w-full" style={{ color: colors.text }}>
                            <Bell className="w-6 h-6 mr-2" />
                            Notifications
                        </div>
                    </li>
                    <li className="mb-2">
                        <div className="flex items-center p-2 w-full" style={{ color: colors.text }}>
                            <Calendar className="w-6 h-6 mr-2" />
                            Calendar
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-4 md:p-8 overflow-y-scroll">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold" style={{ color: colors.text }}>Dashboard</h2>
                    <div className="flex items-center">
                        <Clock className="w-6 h-6 mr-4" style={{ color: colors.text }} />
                        <User className="w-6 h-6 mr-4" style={{ color: colors.text }} />
                        <Search className="w-6 h-6" style={{ color: colors.text }} />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Overview</h3>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="rounded shadow-md p-4" style={{ backgroundColor: colors.accent }}>
                                <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Users</h4>
                                <p style={{ color: colors.text }}>100</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="rounded shadow-md p-4" style={{ backgroundColor: colors.accent }}>
                                <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Revenue</h4>
                                <p style={{ color: colors.text }}>$1000</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="rounded shadow-md p-4" style={{ backgroundColor: colors.accent }}>
                                <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Engagement</h4>
                                <p style={{ color: colors.text }}>50%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Settings</h3>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="rounded shadow-md p-4" style={{ backgroundColor: colors.accent }}>
                                <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Account</h4>
                                <Edit className="w-6 h-6" style={{ color: colors.text }} />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="rounded shadow-md p-4" style={{ backgroundColor: colors.accent }}>
                                <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Security</h4>
                                <Shield className="w-6 h-6" style={{ color: colors.text }} />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="rounded shadow-md p-4" style={{ backgroundColor: colors.accent }}>
                                <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Notifications</h4>
                                <Bell className="w-6 h-6" style={{ color: colors.text }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockupWindow;