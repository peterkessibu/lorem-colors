//components/Header.js

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isColorPalettePage = pathname === "/color-palette";
  const isColorBox = pathname === "/color-box";

  return (
    <motion.header
      className="bg-background"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <Palette className="h-10 w-10 " />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-tr from-red-600 via-purple-600 to-yellow-500 bg-clip-text text-transparent">
                Lorem Colors
              </span>
            </Link>
          </div>

          {/* Conditional Buttons To Make It dynamic*/}
          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            {isColorBox ? (
              // Back Button for Color Box Page
              <Button variant="outline" size="lg" onClick={() => router.back()}>
                Back
              </Button>
            ) : isColorPalettePage ? (
              // Color Box Button for Color Palette Page
              <Link href="/color-box">
                <Button variant="outline" size="lg">
                  Color Gen
                </Button>
              </Link>
            ) : (
              // Get Started Button
              <div className="flex space-x-4">
                <Link href="/color-palette">
                  <Button variant="outline" size="lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
