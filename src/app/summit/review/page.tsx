import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Summit Feature Review — Flow in Faith',
  robots: 'noindex, nofollow',
}

const features = [
  {
    title: 'Summit Navigation',
    description:
      'A dedicated nav bar for the summit section, separate from the main site. Links are fully editable from Sanity — you control what appears in the nav. Includes mobile hamburger menu, sign-in/user button, and hide-on-scroll behavior matching the main site.',
    link: '/summit/start-here',
    linkLabel: 'View Summit Nav',
    sanityNote: 'Edit nav links in: Summit → Navigation Links',
  },
  {
    title: 'Start Here (Welcome Page)',
    description:
      'The landing page for summit attendees. Shows different content based on whether the visitor is a free registrant or an All Access Pass holder. Both versions are fully editable rich text in Sanity — you can add images, formatted text, and links.',
    link: '/summit/start-here',
    linkLabel: 'View Start Here',
    sanityNote:
      'Edit in: Summit → "Welcome Content (Free)" and "Welcome Content (All Access)"',
  },
  {
    title: 'Schedule Page',
    description:
      'Auto-generated schedule grouped by day. Each presentation shows the speaker photo, name, time slot, and description. Clicking any presentation opens its detail page. The schedule updates automatically when you add or edit presentations in Sanity.',
    link: '/summit/schedule',
    linkLabel: 'View Schedule',
    sanityNote: 'Add/edit presentations in: Summit Presentation documents',
  },
  {
    title: 'Speakers Page',
    description:
      'A grid of all speakers, automatically derived from the presentations — no separate speaker list to maintain. Shows headshots, bios, website links, and social media links.',
    link: '/summit/speakers',
    linkLabel: 'View Speakers',
    sanityNote:
      'Add/edit speakers in: Summit Speaker documents. They appear here automatically when linked to a presentation.',
  },
  {
    title: 'Presentation Detail Pages (with Access Gating)',
    description:
      'Each presentation has its own page with video, speaker info, description, and downloadable resources. This is where the access gating happens:',
    link: '/summit/schedule',
    linkLabel: 'View Schedule → Click a Presentation',
    sanityNote:
      'Set "Available Date" and "Expires Date" on each presentation to control free access windows.',
    bullets: [
      'Free users: Can watch only during the drip window (Available Date → Expires Date). Outside that window, they see an upgrade prompt.',
      'All Access users: Can watch anytime, forever. No time restrictions.',
      'Not signed in: Sees a prompt to sign in or upgrade.',
    ],
  },
  {
    title: 'Yoga Classes',
    description:
      'An on-demand library of bonus yoga classes. Each class has a video embed, instructor name, and description. These are publicly accessible — no gating.',
    link: '/summit/yoga-classes',
    linkLabel: 'View Yoga Classes',
    sanityNote: 'Add/edit in: Summit Yoga Class documents',
  },
  {
    title: 'All Access Pass Page',
    description:
      'The sales/upgrade page for the All Access Pass. Shows the perks description (editable rich text in Sanity) and either a link to your external sales page or a Clerk PricingTable for direct purchase. If the visitor already has All Access, it shows a confirmation message instead.',
    link: '/summit/all-access',
    linkLabel: 'View All Access Page',
    sanityNote:
      'Edit perks in: Summit → "All Access Perks". Set sales URL in: Summit → "All Access Sales URL"',
  },
  {
    title: 'Contact & FAQ',
    description:
      'Contact page with your email and an FAQ accordion. Both the email and all FAQ items are editable in Sanity. The accordion uses a clean expand/collapse interaction.',
    link: '/summit/contact',
    linkLabel: 'View Contact Page',
    sanityNote: 'Edit in: Summit → "Contact Email" and "FAQ Items"',
  },
  {
    title: 'Year Archiving',
    description:
      'When a new summit year begins, you simply mark the new summit as "Current" in Sanity and unmark the old one. The old summit content remains accessible at /summit/[year] (e.g. /summit/2025). Archive pages show all content without access gating since the event is over. No data migration needed — just a boolean flip.',
    link: null,
    linkLabel: null,
    sanityNote:
      'Toggle "Is Current Summit" in Sanity. Old summits are automatically archived.',
  },
]

export default function SummitReviewPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-(--color-roti)/10 text-(--color-roti) rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              Internal Review
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-4">
              Virtual Summit — Feature Review
            </h1>
            <p className="text-lg text-(--color-primary)/70">
              Hi Queen! Here is a walkthrough of every feature built for the
              summit section. Click the links to see each page live with sample
              data. Everything is managed from{' '}
              <Link href="/studio" className="text-(--color-roti) font-medium hover:opacity-80">
                Sanity Studio
              </Link>
              .
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-(--color-sidecar) rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="text-xl font-bold text-(--color-primary) mb-4">
              Quick Links
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Start Here', href: '/summit/start-here' },
                { label: 'Schedule', href: '/summit/schedule' },
                { label: 'Speakers', href: '/summit/speakers' },
                { label: 'Yoga Classes', href: '/summit/yoga-classes' },
                { label: 'All Access', href: '/summit/all-access' },
                { label: 'Contact', href: '/summit/contact' },
                { label: 'Sanity Studio', href: '/studio' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 bg-(--color-primary) text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Feature Sections */}
          <div className="space-y-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-(--color-gallery)"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-(--color-primary) text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-(--color-primary)">
                    {f.title}
                  </h2>
                </div>

                <p className="text-(--color-primary)/80 mb-4">{f.description}</p>

                {f.bullets && (
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    {f.bullets.map((b, j) => (
                      <li key={j} className="text-(--color-primary)/70 text-sm">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Sanity editing note */}
                <div className="bg-(--color-gallery)/50 rounded-lg px-4 py-3 mb-4">
                  <p className="text-sm text-(--color-primary)/70">
                    <span className="font-semibold">How to edit: </span>
                    {f.sanityNote}
                  </p>
                </div>

                {f.link && (
                  <Link
                    href={f.link}
                    className="inline-block px-6 py-2 bg-(--color-roti) text-white rounded-full text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-sm"
                  >
                    {f.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 p-6 bg-(--color-primary) rounded-2xl text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              What&apos;s Not Included (Handled Externally)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70 text-left max-w-lg mx-auto">
              <div>Registration page</div>
              <div>Sales/checkout pages</div>
              <div>Email marketing (Mailerlite)</div>
              <div>Google Calendar integration</div>
              <div>Private podcast feed</div>
              <div>Workbook sales</div>
            </div>
            <p className="text-white/50 text-xs mt-4">
              These are handled by your existing external tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
