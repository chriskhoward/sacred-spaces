import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { draftMode } from "next/headers";
import "./globals.css";
import VisualEditing from "@/components/VisualEditing";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Sacred Spaces Yoga HTX",
  description: "A membership community for Christ-Centered Yoga Teachers of Color and practitioners.",
};

// Force dynamic rendering to avoid Clerk publishableKey error during static generation
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get publishableKey from environment variable
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" data-scroll-behavior="smooth">
        <body className={`${dmSans.variable} antialiased`}>
          {children}
          {(await draftMode()).isEnabled && <VisualEditing />}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
