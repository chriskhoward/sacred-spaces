'use client';

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <nav className="fixed w-full py-4 z-50 bg-(--color-primary)/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="shrink-0 flex items-center" onClick={closeMenu}>
          <Image
            src="/assets/images/logo.png"
            alt="Sacred Spaces Logo"
            width={180}
            height={54}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            <li>
              <Link href="/" className="font-bold text-white hover:text-(--color-roti) transition-colors whitespace-nowrap">Home</Link>
            </li>
            <li>
              <Link href="/teacher-collective" className="font-bold text-white hover:text-(--color-roti) transition-colors whitespace-nowrap">Teacher Collective</Link>
            </li>
            <li>
              <Link href="/directory" className="font-bold text-white hover:text-(--color-roti) transition-colors whitespace-nowrap">Directory</Link>
            </li>
            <li>
              <Link href="/about" className="font-bold text-white hover:text-(--color-roti) transition-colors whitespace-nowrap">About</Link>
            </li>
          </ul>
          <div className="flex items-center ml-4">
            <SignedOut>
              <Link href="/sign-in" className="px-8 py-3 bg-(--color-sidecar) text-(--color-bronzetone) rounded-full font-bold hover:bg-(--color-roti) hover:text-white transition-all text-sm whitespace-nowrap shadow-lg">
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-white hover:text-(--color-roti) font-bold transition-colors">Dashboard</Link>
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
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`}
          ></span>
        </button>
      </div>
    </nav>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="lg:hidden fixed top-20 left-0 right-0 bg-[#413356] z-[60] shadow-lg">
        <div className="flex flex-col pt-8 px-6 pb-8">
          <ul className="flex flex-col gap-6 list-none m-0 p-0">
            <li>
              <Link 
                href="/" 
                className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/teacher-collective" 
                className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                onClick={closeMenu}
              >
                Teacher Collective
              </Link>
            </li>
            <li>
              <Link 
                href="/directory" 
                className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                onClick={closeMenu}
              >
                Directory
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
          </ul>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <SignedOut>
              <Link 
                href="/sign-in" 
                className="block w-full px-8 py-4 bg-(--color-sidecar) text-(--color-bronzetone) rounded-full font-bold hover:bg-(--color-roti) hover:text-white transition-all text-center shadow-lg"
                onClick={closeMenu}
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/dashboard" 
                  className="text-white hover:text-(--color-roti) font-bold transition-colors text-xl py-2 block text-center"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <div className="flex justify-center">
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
