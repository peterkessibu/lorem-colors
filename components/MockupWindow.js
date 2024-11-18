// components/MockupWindow.js

"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  Download,
  Users,
  Menu,
  DollarSign,
} from "lucide-react";

/**
 * Determines if a color is dark based on its hexadecimal value.
 * @param {string} color - The hex color code (e.g., "#FFFFFF").
 * @returns {boolean} - Returns true if the color is dark, else false.
 */
const isDark = (color) => {
  // Check if 'color' is a valid string starting with '#' and has 7 characters
  if (typeof color !== "string" || !color.startsWith("#") || color.length !== 7) {
    console.warn(
      `Invalid color format received: "${color}". Expected a string like "#FFFFFF". Defaulting to light color.`
    );
    return false; // Default to light if invalid
  }

  // Remove the '#' and parse the hex value
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calculate luminance based on RGB values
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return true if luminance is less than 128 (dark), else false
  return luminance < 128;
};

/**
 * Dashboard component that renders the mockup window with dynamic colors.
 * @param {Object} props - Component props.
 * @param {Object} props.colors - Colors object containing various color codes.
 * @returns {JSX.Element} - Rendered Dashboard component.
 */
export default function Dashboard({ colors }) {
  // Destructure colors with default values to prevent undefined errors
  const {
    secondary = "#000000",
    accent = "#FFFFFF",
    background = "#FFFFFF",
    text = "#000000",
  } = colors || {}; // Fallback to empty object if colors is undefined

  // Determine text and border colors based on Accent color brightness
  const textColor = isDark(accent) ? "text-white" : "text-black";
  const emailColor = isDark(accent) ? "text-gray-300" : "text-gray-700";
  const borderColor = isDark(accent) ? "border-gray-300" : "border-gray-700";

  return (
    <div
      className="min-h-screen max-w-full p-6 flex-1 border-black border"
      style={{ backgroundColor: background, color: text }}
    >
      {/* Header Section */}
      <header className="border-b" style={{ borderColor }}>
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-row">
              {/* User Avatar with dynamic background color */}
              <div
                className="h-6 w-6 rounded-full mr-2"
                style={{ backgroundColor: accent }}
              ></div>
              <span className="font-bold text-xl">Atilla Koch</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <button className="block md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div
            className="flex-col md:flex-row hidden md:flex"
            style={{ backgroundColor: background, color: text }}
          >
            {["Overview", "Customers", "Products", "Settings"].map((item, index) => (
              <p key={index} className="py-2 px-4 hover:bg-gray-800 hover:text-white rounded-lg">
                {item}
              </p>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4 md:p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-900 border-gray-800 text-white"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="hidden md:block">
                Jan 20, 2023 - Feb 04, 2023
              </span>
            </Button>
            <Button size="sm" className="bg-gray-900">
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Download</span>
            </Button>
          </div>
        </div>

        {/* Cards and Charts */}
        <div className="space-y-4">
          {/* Statistical Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Sales Card */}
            <div
              className="rounded-xl border-black border"
              style={{
                backgroundColor: accent,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              <div className="flex flex-row items-center justify-between space-y-0 p-4">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs" style={{ color: emailColor }}>
                  +19% from last month
                </p>
              </CardContent>
            </div>

            {/* Active Now Card */}
            <div
              className="rounded-xl border-black border"
              style={{
                backgroundColor: accent,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              <div className="flex flex-row items-center justify-between space-y-0 p-4">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </div>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs" style={{ color: emailColor }}>
                  +201 since last hour
                </p>
              </CardContent>
            </div>
          </div>

          {/* Overview and Recent Sales */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Overview Chart */}
            <Card
              className="col-span-7 lg:col-span-4"
              style={{
                backgroundColor: accent,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              <div className="p-4">
                <CardTitle>Overview</CardTitle>
              </div>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={[
                    { month: "Jan", total: 4500 },
                    { month: "Feb", total: 3000 },
                    { month: "Mar", total: 4000 },
                    { month: "Apr", total: 5000 },
                    { month: "May", total: 3000 },
                    { month: "Jun", total: 2800 },
                  ]}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke={textColor}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke={textColor}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill={secondary}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card
              className="col-span-7 lg:col-span-3"
              style={{
                backgroundColor: accent,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <div className="text-sm" style={{ color: emailColor }}>
                  You made 265 sales this month.
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Olivia Martin",
                      email: "olivia.martin@email.com",
                      amount: "+$1,999.00",
                      avatar: "/avatars/01.png",
                      fallback: "OM",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "Jackson Lee",
                      email: "jackson.lee@email.com",
                      amount: "+$39.00",
                      avatar: "/avatars/02.png",
                      fallback: "JL",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "Isabella Nguyen",
                      email: "isabella.nguyen@email.com",
                      amount: "+$299.00",
                      avatar: "/avatars/03.png",
                      fallback: "IN",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "William Kim",
                      email: "will@email.com",
                      amount: "+$99.00",
                      avatar: "/avatars/04.png",
                      fallback: "WK",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "Sofia Davis",
                      email: "sofia.davis@email.com",
                      amount: "+$39.00",
                      avatar: "/avatars/05.png",
                      fallback: "SD",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                  ].map((sale, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={sale.avatar} alt="Avatar" />
                        <AvatarFallback>{sale.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p
                          className="text-[12px] font-medium leading-none"
                          style={{ color: colors ? colors[sale.colorName] : textColor }}
                        >
                          {sale.name}
                        </p>
                        <p
                          className="text-[12px]"
                          style={{ color: colors ? colors[sale.colorEmail] : emailColor }}
                        >
                          {sale.email}
                        </p>
                      </div>
                      <div className="ml-auto text-sm">{sale.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}