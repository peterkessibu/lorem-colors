// components/Footer.js

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Instagram, Github, Palette, Linkedin, X } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
    text: null,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/peteressibu",
    icon: Linkedin,
    hoverBg: "hover:text-blue-700",
    text: null,
  },
  {
    name: "GitHub",
    href: "https://www.github.com/peterkessibu",
    icon: Github,
    hoverBg: "hover:bg-gray-800",
    text: "Hello",
  },
];

const footerSections = [
  {
    title: "Solutions",
    links: [{ name: "Color Gen", href: "/color-gen" }],
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

  const handleLinkClick = (name) => {
    setModalContent(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  // Dynamic routes
  const isColorPalettePage = pathname === "/genAI-Color-Palette";
  const isColorBox = pathname === "/color-gen";

  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {!isColorPalettePage && !isColorBox && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Logo and Social Links Section */}
            <div className="flex flex-col items-start space-y-4">
              {/* Logo Section */}
              <div className="flex justify-start">
                <Link href="/" className="flex items-center">
                  <Palette className="h-14 w-14" />
                </Link>
              </div>

              {/* Social Links Section */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`flex items-center px-4 py-2 bg-gray-200 rounded-lg shadow-md transition-colors duration-300 ${social.hoverBg}`}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon && (
                      <social.icon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                    )}
                    {social.text && (
                      <span className="ml-2 text-gray-700">{social.text}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {footerSections.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col items-start w-full px-4"
                >
                  <h3 className="text-sm font-semibold text-left text-gray-700 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        {section.title === "Info" ? (
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

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="text-base text-gray-400 text-center">
            &copy; {currentYear} Lorem Colors.
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent}>
        {modalContent === "Blog" && (
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