import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { draftMode } from "next/headers";
import Script from "next/script";
import "./globals.css";
import VisualEditing from "@/components/VisualEditing";
import { Analytics } from "@vercel/analytics/next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { getClient } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY, type SiteSettings } from "@/sanity/lib/siteSettings";
import { urlForImage } from "@/sanity/lib/image";

const GTM_ID = "GTM-5Z6DMF5X";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowinfaith.com';

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);
  const settings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY);

  const title = settings?.title || "Flow in Faith - Christ-Centered Yoga";
  const description = settings?.description || "A membership community for Christ-Centered Yoga Teachers of Color and practitioners.";

  const iconUrl = settings?.favicon
    ? urlForImage(settings.favicon).width(32).height(32).url()
    : undefined;
  const appleIconUrl = settings?.favicon
    ? urlForImage(settings.favicon).width(180).height(180).url()
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: {
      icon: iconUrl ? [{ url: iconUrl, type: 'image/png' }] : [{ url: '/icon.png', type: 'image/png' }],
      apple: appleIconUrl ? [{ url: appleIconUrl, sizes: '180x180' }] : [{ url: '/apple-icon.png', type: 'image/png' }],
    },
    openGraph: {
      title,
      description,
      siteName: title,
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
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);
  const settings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY);

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
          <Footer
            logoUrl={settings?.logo ? urlForImage(settings.logo).width(400).url() : undefined}
            socialLinks={settings?.socialLinks ?? undefined}
            contactEmail={settings?.contactEmail ?? undefined}
          />
          {(await draftMode()).isEnabled && <VisualEditing />}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
