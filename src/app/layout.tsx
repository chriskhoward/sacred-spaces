import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacred Spaces Yoga HTX",
  description: "A membership community for Christian yoga teachers of color and practitioners.",
};

// Force dynamic rendering to avoid Clerk publishableKey error during static generation
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get publishableKey from environment variable
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
