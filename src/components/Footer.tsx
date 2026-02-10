'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

export default function Footer() {
  const { isSignedIn } = useUser();

  return (
    <footer className="bg-(--color-primary) text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Logo, Mission, Member Login */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="mb-6">
              <Image
                src="/assets/images/tc_logo.png"
                alt="Flow in Faith Teachers Collective Logo"
                width={200}
                height={200}
                className="w-48 h-48 object-contain"
              />
            </Link>
            <p className="text-white text-sm leading-relaxed mb-6 max-w-sm">
              Flow in Faith is a Christ-centered wellness ecosystem creating culturally safe spaces where faith is lived through body, breath, rest, and community.
            </p>
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="inline-block px-6 py-3 bg-(--color-roti) text-(--color-primary) rounded-full font-bold text-sm hover:opacity-90 transition-opacity text-center"
              >
                Member Login
              </Link>
            )}
          </div>

          {/* Middle Column - Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-bold mb-6">Quick Links</h4>
            <ul className="list-none p-0 m-0 space-y-3">
              <li>
                <Link href="/" className="text-white hover:text-(--color-roti) transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/teacher-collective" className="text-white hover:text-(--color-roti) transition-colors text-sm">
                  Teacher Collective
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-white hover:text-(--color-roti) transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-white hover:text-(--color-roti) transition-colors text-sm">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/video-library" className="text-white hover:text-(--color-roti) transition-colors text-sm">
                  Video Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Connect With Us */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-bold mb-6">Connect With Us</h4>
            <ul className="list-none p-0 m-0 space-y-3 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@flowinfaith.com" className="text-white hover:text-(--color-roti) transition-colors text-sm underline">
                  info@flowinfaith.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:collective@flowinfaith.com" className="text-white hover:text-(--color-roti) transition-colors text-sm underline">
                  collective@flowinfaith.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href="https://www.flowinfaith.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-(--color-roti) transition-colors text-sm underline">
                  www.flowinfaith.com
                </a>
              </li>
            </ul>
            <p className="text-white text-sm mb-4">Follow us on Social Media</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="https://www.facebook.com/itsFlowinFaith/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-(--color-primary) transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/itsflowinfaith/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-(--color-primary) transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ItsFlowinFaith" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-(--color-primary) transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@itsflowinfaith" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-(--color-primary) transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm opacity-70 m-0">Copyright {new Date().getFullYear()}, Flow in Faith Teacher&apos;s Collective. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
