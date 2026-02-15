import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { draftMode } from "next/headers";
import Script from "next/script";
import "./globals.css";
import VisualEditing from "@/components/VisualEditing";
import { Analytics } from "@vercel/analytics/next";
import AnnouncementBar from "@/components/AnnouncementBar";
import { getClient } from "@/sanity/lib/client";

const GTM_ID = "GTM-5Z6DMF5X";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowinfaith.com';

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ title, description }`);

  const title = settings?.title || "Flow in Faith - Christ-Centered Yoga";
  const description = settings?.description || "A membership community for Christ-Centered Yoga Teachers of Color and practitioners.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: {
      icon: [{ url: '/icon.png', type: 'image/png' }],
      apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    },
    openGraph: {
      title,
      description,
      siteName: "Flow in Faith",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Force dynamic rendering
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
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/join"
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
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
          <AnnouncementBar />
          {children}
          {(await draftMode()).isEnabled && <VisualEditing />}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
