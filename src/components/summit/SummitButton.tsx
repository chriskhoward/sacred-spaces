import Link from 'next/link'
import { getButtonStyles } from '@/lib/summit-styles'
import type { SummitButtonPreset } from '@/sanity/lib/summit'

interface SummitButtonProps {
  label: string
  href?: string
  external?: boolean
  preset?: SummitButtonPreset
  overrideBgColor?: string
  overrideTextColor?: string
  overrideSize?: string
}

export default function SummitButton({
  label,
  href,
  external,
  preset,
  overrideBgColor,
  overrideTextColor,
  overrideSize,
}: SummitButtonProps) {
  if (!href) return null

  const { className, style } = getButtonStyles({
    overrideBgColor,
    overrideTextColor,
    overrideSize,
    preset,
  })

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={style}>
      {label}
    </Link>
  )
}
