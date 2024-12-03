// Description: Layout component for the application.

"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [metadata, setMetadata] = useState({
    title: "Lorem Colors",
    description: "AI powered Color Palette Generator Application",
  });

  useEffect(() => {
    const { pathname } = router;
    switch (pathname) {
      case "/":
        setMetadata({
          title: "Home - Lorem Colors",
          description:
            "Welcome to the AI powered Color Palette Generator Application",
        });
        break;
      case "/genAI-Color-Palette":
        setMetadata({
          title: "GenAI - Color-Palette",
          description: "AI powered Color Palette Generator",
        });
        break;
      case "/color-shades":
        setMetadata({
          title: "Color Shades",
          description: "Color Shades Generator",
        });
        break;
      default:
        setMetadata({
          title: "Lorem Colors",
          description: "AI powered Color Palette Generator Application",
        });
    }
  }, [router]);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
