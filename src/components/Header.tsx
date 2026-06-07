"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE, LOGO_IMAGE } from "@/lib/constants";

const navLinks = [
  { href: "/#home", label: "الرئيسية" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/#portfolio", label: "أعمالنا" },
  { href: "/#about", label: "من نحن" },
  { href: "/#contact", label: "تواصل معنا" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-full px-3 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0 shrink overflow-hidden"
          >
            <Image
              src={LOGO_IMAGE}
              alt={SITE.name}
              width={44}
              height={44}
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover shrink-0 ring-2 ring-purple-100"
              priority
            />
            <span className="text-base sm:text-xl font-bold text-purple-600 truncate">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 shrink-0">
            <Link
              href="/#booking"
              className="hidden lg:inline-flex px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
            >
              احجز الآن
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 -ml-1 rounded-xl text-gray-700 hover:bg-purple-50 transition-colors"
              aria-label="القائمة"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav className="px-3 sm:px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#booking"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl bg-purple-600 text-white font-semibold text-center"
            >
              احجز الآن
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
