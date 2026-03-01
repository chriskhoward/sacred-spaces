'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState, useEffect, useRef } from 'react'
import type { SummitNavLink } from '@/sanity/lib/summit'

interface SummitNavProps {
  navLinks: SummitNavLink[]
  basePath: string // '/summit' or '/summit/2025'
  summitTitle: string
  communityLink?: string
  logoUrl?: string
}

export default function SummitNav({
  navLinks,
  basePath,
  summitTitle,
  communityLink,
  logoUrl,
}: SummitNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }
      if (isMenuOpen) {
        lastScrollY.current = currentScrollY
        return
      }
      const delta = currentScrollY - lastScrollY.current
      if (delta > 10) setIsVisible(false)
      else if (delta < -10) setIsVisible(true)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="bg-(--color-primary) py-4">
        <div className="container mx-auto px-4 flex justify-between items-center h-20">
          {/* Logo / Summit Title */}
          <Link
            href={`${basePath}/start-here`}
            className="shrink-0 flex items-center gap-3"
            onClick={closeMenu}
          >
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={summitTitle}
                width={200}
                height={200}
                className="h-16 w-16 object-contain"
                unoptimized={logoUrl.startsWith('http')}
              />
            )}
            <span className="text-white font-bold text-lg hidden sm:inline">
              {summitTitle}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={`${basePath}${link.path}`}
                className="text-white hover:text-(--color-roti) transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
            {communityLink && (
              <a
                href={communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-(--color-roti) transition-colors font-medium text-sm"
              >
                Community
              </a>
            )}
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity text-sm whitespace-nowrap shadow-md"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      'w-11 h-11 border-2 border-white/20 hover:border-(--color-roti) transition-all',
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}
            />
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-(--color-primary) shadow-lg max-h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="flex flex-col pt-8 px-6 pb-8">
            <ul className="flex flex-col gap-6 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={`${basePath}${link.path}`}
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {communityLink && (
                <li>
                  <a
                    href={communityLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-xl py-2 block"
                    onClick={closeMenu}
                  >
                    Community
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-8 pt-8 border-t border-white/20">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block w-full px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity text-center shadow-md"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-11 h-11 border-2 border-white/20 hover:border-(--color-roti) transition-all',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
