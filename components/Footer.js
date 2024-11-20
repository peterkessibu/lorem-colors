
import { useState } from "react";
import Link from "next/link";
import { Instagram, Github, Palette, Linkedin, X } from "lucide-react";

// Define social media links with correct icons
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

// Define footer sections
const footerSections = [
  {
    title: "Solutions",
    links: [
      { name: "Color Palette Generator", href: "#" },
      { name: "Integrations", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "#" },
      { name: "API Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
];

// Modal Component
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

  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid lg:grid-cols-5 lg:gap-4">
          {/* Logo and Description */}
          <div className="space-y-8 xl:col-span-1 md:mr-4">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="flex items-center">
                <Palette className="h-16 w-16" />
              </Link>
            </div>
            {/* Social Media Links */}
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

          {/* Footer Sections */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 space-x-4 xl:mt-0 xl:col-span-4">
            {footerSections.map((section) => (
              <div
                key={section.title}
                className="md:grid md:grid-cols-1 md:gap-8"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        {section.title === "Support" ? (
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
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="text-base text-gray-400 xl:text-center">
            &copy; {currentYear} Lorem Colors, Inc. All rights reserved.
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent}>
        {modalContent === "Documentation" && (
          <p>
            Visit our <Link href="#" className="text-primary">Documentation</Link> to learn more.
          </p>
        )}
        {modalContent === "API Status" && (
          <p>
            Check the current <Link href="#" className="text-primary">API Status</Link>.
          </p>
        )}
      </Modal>
    </footer>
  );
}