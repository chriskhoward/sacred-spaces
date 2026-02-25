'use client';

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import { isMember } from "@/lib/tier";
import type { CSSProperties } from "react";

interface AnnouncementData {
  text: string;
  link?: string;
  bgClass?: string;
  textClass?: string;
  style?: CSSProperties;
}

interface NavbarClientProps {
  dynamicPages: Array<{ title: string; slug: string }>;
  logoUrl?: string | null;
  announcement?: AnnouncementData | null;
}

const DEFAULT_LOGO = '/assets/images/tc_logo.png';

export default function NavbarClient({ dynamicPages, logoUrl, announcement }: NavbarClientProps) {
  const logo = logoUrl || DEFAULT_LOGO;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { user, isLoaded } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Don't hide when mobile menu is open
      if (isMenuOpen) {
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;
      if (delta > 10) {
        setIsVisible(false);
      } else if (delta < -10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Get membership type from user metadata
  const membershipType = user?.publicMetadata?.membershipType as string | undefined;
  const isMemberUser = isMember(user?.id, membershipType);

  // Navigation links for members
  const memberLinks = isMemberUser ? [
    { label: 'Live Classes', href: '/teacher-collective/calls' },
    { label: 'On-Demand Library', href: '/video-library' },
    { label: 'Teacher Directory', href: '/directory' },
  ] : [];

  // Render announcement bar content
  const announcementContent = announcement ? (
    <div
      className={`${announcement.bgClass ?? ''} ${announcement.textClass ?? ''} py-2 px-4 text-center text-sm font-medium`.trim()}
      style={announcement.style}
    >
      {announcement.text}
    </div>
  ) : null;

  const announcementBar = announcement?.link ? (
    <Link href={announcement.link} className="block hover:opacity-90 transition-opacity">
      {announcementContent}
    </Link>
  ) : announcementContent;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Announcement Bar */}
      {announcementBar}

      {/* Main Nav */}
      <nav className="bg-(--color-primary) py-4">
        <div className="container mx-auto px-4 flex justify-between items-center h-20">
          <Link href="/" className="shrink-0 flex items-center" onClick={closeMenu}>
            <Image
              src={logo}
              alt="Flow in Faith Teachers Collective Logo"
              width={200}
              height={200}
              priority
              className="h-16 w-16 object-contain"
              unoptimized={logo.startsWith('http')}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center">
              <SignedOut>
                <Link href="/sign-in" className="px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity text-sm whitespace-nowrap shadow-md">
                  Member Login
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity text-sm whitespace-nowrap shadow-md">
                  Dashboard
                </Link>
                <div className="ml-4">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-11 h-11 border-2 border-white/20 hover:border-(--color-roti) transition-all"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}
            ></span>
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
            ></span>
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-(--color-primary) shadow-lg max-h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="flex flex-col pt-8 px-6 pb-8">
            <ul className="flex flex-col gap-6 list-none m-0 p-0">
              {/* Dynamic Sanity Pages (shown to everyone) */}
              {dynamicPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={page.slug}
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                    onClick={closeMenu}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
              {/* Member-specific links */}
              {isMemberUser && memberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/20">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block w-full px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity text-center shadow-md"
                  onClick={closeMenu}
                >
                  Member Login
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="block w-full px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity text-center shadow-md"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <div className="flex justify-center mt-4">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-11 h-11 border-2 border-white/20 hover:border-(--color-roti) transition-all"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
