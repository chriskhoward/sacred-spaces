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
  title: "Flow in Faith - Christ-Centered Yoga",
  description: "A membership community for Christ-Centered Yoga Teachers of Color and practitioners.",
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
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
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/onboarding"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-(--color-roti) hover:bg-(--color-primary) text-white',
        },
      }}
      localization={
        {
          locale: 'en-US',
          localization: {
            enUS: {
              formFieldLabel__organizationName: 'Name',
              formFieldInputPlaceholder__organizationName: 'Organization name',
              formFieldLabel__organizationLogo: 'Headshot',
              formFieldInputPlaceholder__organizationLogo: 'Upload headshot',
            },
          },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    >
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
