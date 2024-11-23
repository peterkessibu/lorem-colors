//components/Footer.js

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { Instagram, Github, Palette, Linkedin, X } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "#",
    icon: Github,
  },
];

const footerSections = [
  {
    title: "Solutions",
    links: [{ name: "Color Box", href: "/color-box" }],
  },
  {
    title: "Info",
    links: [
      { name: "Blog", href: "#" },
      { name: "API Status", href: "#" },
    ],
  },
];

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  //Modal Window
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const router = useRouter(); 

  const handleLinkClick = (name) => {
    setModalContent(name);
    setIsModalOpen(true);
  };

  // Navigate back to the previous page
  const handleBackClick = () => {
    router.back(); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  //Dynamic routes
  const isColorPalettePage = pathname === "/color-palette";
  const isColorBox = pathname === "/color-box";

  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {!isColorPalettePage && !isColorBox && (
          <div className="xl:grid lg:grid-cols-5 lg:gap-4">
            <div className="space-y-8 xl:col-span-1 md:mr-4">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/" className="flex items-center">
                  <Palette className="h-16 w-16" />
                </Link>
              </div>
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon && (
                      <social.icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-start lg:justify-items-start xl:col-span-4">
              {footerSections.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col items-start lg:items-start w-full px-4"
                >
                  <h3 className="text-sm font-semibold text-left text-gray-700 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        {link.isBackButton ? (
                          <button
                            onClick={handleBackClick}
                            className="text-base text-gray-500 hover:text-gray-900 focus:outline-none"
                          >
                            {link.name}
                          </button>
                        ) : section.title === "Support" ? (
                          <button
                            onClick={() => handleLinkClick(link.name)}
                            className="text-base text-gray-500 hover:text-gray-900 focus:outline-none"
                          >
                            {link.name}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-base text-gray-500 hover:text-gray-900"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*Copyright Footer*/}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="text-base text-gray-400 text-center">
            &copy; {currentYear} Lorem Colors, Inc. All rights reserved.
          </div>
        </div>
      </div>

      {/*Trigger Modal Window*/}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent}>
        {modalContent === "Documentation" && (
          <p>
            Visit our{" "}
            <Link
              href="https://medium.com/@peter.essibu/creating-appealing-and-cohesive-color-palettes-is-a-fundamental-aspect-of-modern-web-design-e956be3734e9"
              className="text-blue-900 underline"
            >
              Blog
            </Link>{" "}
            to learn more.
          </p>
        )}
        {modalContent === "API Status" && <p className="font-bold">Active</p>}
      </Modal>
    </footer>
  );
}
