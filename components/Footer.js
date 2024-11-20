'use client';

import Link from 'next/link';
import {
  Instagram,
  Github,
  Palette,
  Linkedin,
} from 'lucide-react';

// Define social media links with correct icons
const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: Github,
  },
];

// Define footer sections
const footerSections = [
  {
    title: 'Solutions',
    links: [
      { name: 'Color Palette Generator', href: '#' },
      { name: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'API Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              {socialLinks.map((social) => ( // Renamed parameter to 'social'
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon && (
                    <social.icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 space-x-4 xl:mt-0 xl:col-span-4">
            {footerSections.map((section) => (
              <div key={section.title} className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {link.name}
                        </a>
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
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {currentYear} Lorem Colors, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}