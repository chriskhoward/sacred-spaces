import Link from 'next/link'
import { getSectionStyles, getButtonStyles } from '@/lib/summit-styles'
import type { SummitButtonPreset } from '@/sanity/lib/summit'

interface UpgradeCTAProps {
  allAccessSalesUrl?: string
  basePath?: string
  message?: string
  heading?: string
  description?: string
  buttonLabel?: string
  // Style overrides
  sectionBgColor?: string
  sectionPadding?: string
  sectionPaddingCustom?: string
  buttonPreset?: SummitButtonPreset
  buttonBgColor?: string
  buttonTextColor?: string
  buttonSize?: string
}

export default function UpgradeCTA({
  allAccessSalesUrl,
  basePath,
  message = 'This presentation is no longer available for free viewing.',
  heading = 'Get All Access',
  description = 'Upgrade to the All Access Pass for permanent, unlimited access to all summit presentations, resources, and bonus content.',
  buttonLabel = 'Get All Access Pass',
  sectionBgColor,
  sectionPadding,
  sectionPaddingCustom,
  buttonPreset,
  buttonBgColor,
  buttonTextColor,
  buttonSize,
}: UpgradeCTAProps) {
  const upgradeHref = allAccessSalesUrl || (basePath ? `${basePath}/all-access` : undefined)

  const sectionStyle = getSectionStyles({
    overrideBgColor: sectionBgColor,
    overridePadding: sectionPadding,
    overridePaddingCustom: sectionPaddingCustom,
    fallbackBgColor: '#F6EDC8', // --color-sidecar
    fallbackPadding: 'none',
  })

  const btnStyles = getButtonStyles({
    overrideBgColor: buttonBgColor,
    overrideTextColor: buttonTextColor,
    overrideSize: buttonSize,
    preset: buttonPreset,
  })

  return (
    <div
      className={`rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto ${sectionStyle.className}`}
      style={sectionStyle.style}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-4">
        {heading}
      </h3>
      <p className="text-(--color-primary)/80 mb-6">{message}</p>
      <p className="text-(--color-primary)/70 text-sm mb-6">
        {description}
      </p>
      {upgradeHref && (
        allAccessSalesUrl ? (
          <a
            href={upgradeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={btnStyles.className}
            style={btnStyles.style}
          >
            {buttonLabel}
          </a>
        ) : (
          <Link
            href={upgradeHref}
            className={btnStyles.className}
            style={btnStyles.style}
          >
            {buttonLabel}
          </Link>
        )
      )}
    </div>
  )
}
