"use client";

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

const itemStyles = "py-2 px-4 hover:bg-gray-800 rounded-lg";
const menuItems = ["Overview", "Customers", "Products", "Settings"];

const data = [
  { month: "Jan", total: 4500 },
  { month: "Feb", total: 3000 },
  { month: "Mar", total: 4000 },
  { month: "Apr", total: 5000 },
  { month: "May", total: 3000 },
  { month: "Jun", total: 2800 },
];

const salesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "/avatars/01.png",
    fallback: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "/avatars/02.png",
    fallback: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "/avatars/03.png",
    fallback: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "/avatars/04.png",
    fallback: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "/avatars/05.png",
    fallback: "SD",
  },
];

const cardData = [
  {
    title: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    icon: <DollarSign className="h-4 w-4 text-gray-500" />,
  },
  {
    title: "Active Now",
    value: "+573",
    description: "+201 since last hour",
    icon: <Users className="h-4 w-4 text-gray-500" />,
  },
];

const isDark = (color) => {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
};

export default function Dashboard({ colors }) {
  const textColor = isDark(colors.Accent) ? "text-white" : "text-black";
  const emailColor = isDark(colors.Accent) ? "text-gray-300" : "text-gray-700";
  const borderColor = isDark(colors.Accent) ? "border-gray-300" : "border-gray-700";

  return (
    <div className="min-h-screen max-w-full p-6 flex-1" style={{ backgroundColor: colors.Background, color: colors.Text }}>
      <header className="border-b" style={{ borderColor: colors.Border }}>
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-row">
              <div className="h-6 w-6 bg-white rounded-full mr-2"></div>
              <span>Atilla Koch</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <button className="block md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-col md:flex-row hidden md:flex" style={{ backgroundColor: colors.Background, color: colors.Text }}>
            {menuItems.map((item, index) => (
              <p key={index} className={itemStyles}>{item}</p>
            ))}
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-6">
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
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="rounded-xl"
                style={{ backgroundColor: colors.Accent, borderColor: borderColor, color: textColor }}
              >
                <div className="flex flex-row items-center justify-between space-y-0 p-4">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </div>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs" style={{ color: emailColor }}>{card.description}</p>
                </CardContent>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7 lg:col-span-4" style={{ backgroundColor: colors.Accent, borderColor: borderColor, color: textColor }}>
              <div className="p-4">
                <CardTitle>Overview</CardTitle>
              </div>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
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
                    <Bar dataKey="total" fill={colors.Secondary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-7 lg:col-span-3" style={{ backgroundColor: colors.Accent, borderColor: borderColor, color: textColor }}>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <div className="text-sm" style={{ color: emailColor }}>
                  You made 265 sales this month.
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {salesData.map((sale, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={sale.avatar} alt="Avatar" />
                        <AvatarFallback>{sale.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-[12px] font-medium leading-none" style={{ color: textColor }}>
                          {sale.name}
                        </p>
                        <p className="text-[12px]" style={{ color: emailColor }}>
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