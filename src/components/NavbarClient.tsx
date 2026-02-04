'use client';

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

interface NavbarClientProps {
  dynamicPages: Array<{ title: string; slug: string }>;
}

export default function NavbarClient({ dynamicPages }: NavbarClientProps) {
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
  const isTeacher = membershipType === 'teacher';
  const isPractitioner = membershipType === 'practitioner';
  const isMember = isTeacher || isPractitioner;

  // Navigation links for teachers
  const teacherLinks = [
    { label: 'Resources', href: '/teacher-collective/resources' },
    { label: 'Community Calls', href: '/teacher-collective/calls' },
    { label: 'Directory', href: '/directory' },
  ];

  // Navigation links for practitioners
  const practitionerLinks = [
    { label: 'Video Library', href: '/video-library' },
    { label: 'Live Classes', href: '/live-classes' },
    { label: 'Find a Teacher', href: '/directory' },
  ];

  // Get the appropriate links based on membership
  const memberLinks = isTeacher ? teacherLinks : isPractitioner ? practitionerLinks : [];

  return (
    <>
      <nav className="fixed w-full py-4 z-50 bg-(--color-primary)/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center h-20">
          <Link href="/" className="shrink-0 flex items-center" onClick={closeMenu}>
            <Image
              src="/assets/images/logo.png"
              alt="Flow in Faith Logo"
              width={180}
              height={54}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {/* Dynamic Sanity Pages (shown to everyone) */}
              {dynamicPages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="font-bold text-white hover:text-(--color-roti) transition-colors whitespace-nowrap">
                    {page.title}
                  </Link>
                </li>
              ))}
              {/* Member-specific links (only shown when signed in with membership) */}
              {isMember && memberLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-bold text-white hover:text-(--color-roti) transition-colors whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 ml-4">
              <SignedOut>
                <Link href="/sign-in" className="text-white hover:text-(--color-roti) font-bold transition-colors whitespace-nowrap">
                  Member Login
                </Link>
                <Link href="/apply" className="px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold hover:bg-white hover:text-(--color-roti) transition-all text-sm whitespace-nowrap shadow-lg border-2 border-transparent hover:border-(--color-roti)">
                  Join Now
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="text-white hover:text-(--color-roti) font-bold transition-colors">Dashboard</Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-11 h-11 border-2 border-white/20 hover:border-(--color-roti) transition-all"
                    }
                  }}
                />
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
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-[#413356] z-[60] shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col pt-8 px-6 pb-8">
            <ul className="flex flex-col gap-6 list-none m-0 p-0">
              {/* Dynamic Sanity Pages (shown to everyone) */}
              {dynamicPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                    onClick={closeMenu}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
              {/* Member-specific links */}
              {isMember && memberLinks.map((link) => (
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
                <div className="flex flex-col gap-4">
                  <Link
                    href="/sign-in"
                    className="block w-full px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-(--color-primary) transition-all text-center"
                    onClick={closeMenu}
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/apply"
                    className="block w-full px-8 py-4 bg-(--color-roti) text-white rounded-full font-bold hover:bg-white hover:text-(--color-roti) transition-all text-center shadow-lg border-2 border-transparent hover:border-(--color-roti)"
                    onClick={closeMenu}
                  >
                    Join Now
                  </Link>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-col gap-4 mt-4">
                  <Link
                    href="/dashboard"
                    className="block w-full px-8 py-4 bg-(--color-roti) text-white rounded-full font-bold hover:bg-white hover:text-(--color-roti) transition-all text-center shadow-lg border-2 border-transparent hover:border-(--color-roti)"
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
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
