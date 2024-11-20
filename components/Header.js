import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Palette, Play } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      className="bg-background shadow-sm"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-aut0 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="flex items-center">
              <Palette className="h-10 w-10" />
              <span className="ml-2 text-2xl font-bold text-primary">
                Lorem Colors
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="justify-between space-x-4">
              <Link href="/color-palette">
                <Button variant="destructive" size="lg">
                  Demo
                  <Play className="h-6 w-6 ml-2" />
                </Button>
              </Link>
              <Link href="/color-palette">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
