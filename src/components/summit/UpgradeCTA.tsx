import Link from 'next/link'

interface UpgradeCTAProps {
  allAccessSalesUrl?: string
  basePath?: string
  message?: string
  heading?: string
  description?: string
  buttonLabel?: string
}

export default function UpgradeCTA({
  allAccessSalesUrl,
  basePath = '/summit',
  message = 'This presentation is no longer available for free viewing.',
  heading = 'Get All Access',
  description = 'Upgrade to the All Access Pass for permanent, unlimited access to all summit presentations, resources, and bonus content.',
  buttonLabel = 'Get All Access Pass',
}: UpgradeCTAProps) {
  const upgradeHref = allAccessSalesUrl || `${basePath}/all-access`

  return (
    <div className="bg-(--color-sidecar) rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-4">
        {heading}
      </h3>
      <p className="text-(--color-primary)/80 mb-6">{message}</p>
      <p className="text-(--color-primary)/70 text-sm mb-6">
        {description}
      </p>
      {allAccessSalesUrl ? (
        <a
          href={upgradeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
        >
          {buttonLabel}
        </a>
      ) : (
        <Link
          href={upgradeHref}
          className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}
