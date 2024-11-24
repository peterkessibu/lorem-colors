// components/MockupWindow.js

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Download, Users, Menu, DollarSign } from "lucide-react";
import Image from "next/image";

const isDark = (color) => {
  if (
    typeof color !== "string" ||
    !color.startsWith("#") ||
    color.length !== 7
  ) {
    console.warn(
      `Invalid color format received: "${color}". Expected a string like "#FFFFFF". Defaulting to light color.`,
    );
    return false;
  }

  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance < 128;
};

export default function Dashboard({ colors }) {
  const {
    secondary = "#000000",
    accent = "#FFFFFF",
    background = "#FFFFFF",
    text = "#000000",
  } = colors || {};

  const textColor = isDark(accent) ? "#FFFFFF" : "#000000";
  const emailColor = isDark(accent) ? "#D1D5DB" : "#4B5563";
  const borderColor = isDark(accent) ? "#D1D5DB" : "#374151";

  return (
    <div
      className="min-h-screen max-w-full p-6 flex-1 border"
      style={{ backgroundColor: background, color: text }}
    >
      {/* Header Section */}
      <header style={{ borderColor: borderColor, borderBottomWidth: "1px" }}>
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-row">
              {/* User Avatar with dynamic background color */}
              <div>
                <Image
                  src="/user1.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="font-bold text-xl ml-2">Atilla Koch</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <button className="block md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div
            className="hidden md:flex space-x-4"
            style={{ backgroundColor: background, color: text }}
          >
            {["Overview", "Customers", "Products", "Settings"].map(
              (item, index) => (
                <p
                  key={index}
                  className="py-2 px-4 hover:bg-gray-800 hover:text-white rounded-lg"
                >
                  {item}
                </p>
              ),
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between flex-row">
          <h1 className="text-lg md:text-xl font-bold">Dashboard</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              style={{
                backgroundColor: "#1F2937",
                borderColor: "#1F2937",
                color: "#FFFFFF",
              }}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="hidden md:block">
                Jan 20, 2023 - Feb 04, 2023
              </span>
            </Button>
            <Button
              size="sm"
              className="flex items-center"
              style={{
                backgroundColor: "#1F2937",
                color: "#FFFFFF",
              }}
            >
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
              className="rounded-xl border p-4"
              style={{
                backgroundColor: accent,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">+12,234.93</div>
                <p className="text-xs" style={{ color: emailColor }}>
                  +19% from last month.
                </p>
              </div>
            </div>

            {/* Active Now Card */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: accent,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">+573 Users</div>
                <p className="text-xs" style={{ color: emailColor }}>
                  +201 since last hour
                </p>
              </div>
            </div>
          </div>

          {/* Overview and Recent Sales */}
          <div className="grid gap-4 md:grid-cols-7 justify-center">
            {/* Overview Chart */}
            <Card
              className="col-span-2 lg:col-span-4 mx-4 md:mx-0"
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
                  <BarChart
                    data={[
                      { month: "Jan", total: 4500 },
                      { month: "Feb", total: 3000 },
                      { month: "Mar", total: 4000 },
                      { month: "Apr", total: 5000 },
                      { month: "May", total: 3000 },
                      { month: "Jun", total: 2800 },
                    ]}
                  >
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
              className="col-span-2 lg:col-span-3 mx-4 md:mx-0"
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
                      avatar: "/user2.png",
                      fallback: "OM",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "Jackson Lee",
                      email: "jackson.lee@email.com",
                      amount: "+$39.00",
                      avatar: "/user3.png",
                      fallback: "JL",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "Isabella Nguyen",
                      email: "isabella.nguyen@email.com",
                      amount: "+$299.00",
                      avatar: "/user4.png",
                      fallback: "IN",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "William Kim",
                      email: "will@email.com",
                      amount: "+$99.00",
                      avatar: "/user5.png",
                      fallback: "WK",
                      colorName: "sales_name",
                      colorEmail: "sales_email",
                    },
                    {
                      name: "Sofia Davis",
                      email: "sofia.davis@email.com",
                      amount: "+$39.00",
                      avatar: "/user6.png",
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
                          style={{
                            color: colors ? colors[sale.colorName] : textColor,
                          }}
                        >
                          {sale.name}
                        </p>
                        <p
                          className="text-[12px]"
                          style={{
                            color: colors
                              ? colors[sale.colorEmail]
                              : emailColor,
                          }}
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
