import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="fixed w-full py-4 z-50 bg-(--color-primary)/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Sacred Spaces Logo"
            width={180}
            height={54}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>
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
      </div>
    </nav>
  );
}
