'use client';

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { isMember } from "@/lib/tier";

interface NavbarClientProps {
  dynamicPages: Array<{ title: string; slug: string }>;
  logoUrl?: string | null;
}

const DEFAULT_LOGO = '/assets/images/tc_logo.png';

export default function NavbarClient({ dynamicPages, logoUrl }: NavbarClientProps) {
  const logo = logoUrl || DEFAULT_LOGO;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Get membership type from user metadata
  const membershipType = user?.publicMetadata?.membershipType as string | undefined;
  const isMemberUser = isMember(user?.id, membershipType);

  // Navigation links for members
  const memberLinks = isMemberUser ? [
    { label: 'Live Classes', href: '/teacher-collective/calls' },
    { label: 'On-Demand Library', href: '/video-library' },
    { label: 'Teacher Directory', href: '/directory' },
  ] : [];

  return (
    <>
      <nav className="fixed w-full py-4 z-40 bg-(--color-primary)">
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
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-(--color-primary) z-[60] shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
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
    </>
  );
}
