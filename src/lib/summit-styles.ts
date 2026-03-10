import type { SummitButtonPreset, SummitStyles } from '@/sanity/lib/summit'
import type { PageStyles, PageButtonPreset } from '@/sanity/lib/pageStyles'

// ---------- Button Sizing ----------

const BUTTON_SIZE_CLASSES: Record<string, string> = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  base: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
  '2xl': 'px-12 py-6 text-2xl',
}

interface ButtonStyleOptions {
  overrideBgColor?: string
  overrideTextColor?: string
  overrideSize?: string
  preset?: SummitButtonPreset | PageButtonPreset
}

const FALLBACK_BUTTON = {
  bgColor: '#C7A254',
  textColor: '#FFFFFF',
  size: 'base',
}

export function getButtonStyles(options: ButtonStyleOptions = {}): {
  className: string
  style: React.CSSProperties
} {
  const bgColor =
    options.overrideBgColor ||
    options.preset?.bgColor ||
    FALLBACK_BUTTON.bgColor
  const textColor =
    options.overrideTextColor ||
    options.preset?.textColor ||
    FALLBACK_BUTTON.textColor
  const size =
    options.overrideSize ||
    options.preset?.size ||
    FALLBACK_BUTTON.size

  const sizeClass = BUTTON_SIZE_CLASSES[size] || BUTTON_SIZE_CLASSES.base

  return {
    className: `inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md ${sizeClass}`,
    style: {
      backgroundColor: bgColor,
      color: textColor,
    },
  }
}

// ---------- Section Styling ----------

const PADDING_PRESET_CLASSES: Record<string, string> = {
  none: 'py-0',
  tight: 'py-6 md:py-8',
  normal: 'py-12 md:py-16',
  loose: 'py-20 md:py-28',
  'extra-loose': 'py-28 md:py-36',
}

interface SectionStyleOptions {
  overrideBgColor?: string
  overridePadding?: string
  overridePaddingCustom?: string
  summitStyles?: SummitStyles
  pageStyles?: PageStyles
  pageKey?: keyof SummitStyles
  fallbackBgColor?: string
  fallbackPadding?: string
}

export function getSectionStyles(options: SectionStyleOptions = {}): {
  className: string
  style: React.CSSProperties
} {
  const {
    overrideBgColor,
    overridePadding,
    overridePaddingCustom,
    summitStyles,
    pageStyles,
    pageKey,
    fallbackBgColor,
    fallbackPadding = 'normal',
  } = options

  const bgColor =
    overrideBgColor ||
    (pageKey && summitStyles?.[pageKey] as string | undefined) ||
    summitStyles?.defaultSectionBg ||
    pageStyles?.defaultSectionBg ||
    fallbackBgColor ||
    undefined

  const paddingCustom =
    overridePaddingCustom ||
    summitStyles?.defaultSectionPaddingCustom ||
    pageStyles?.defaultSectionPaddingCustom ||
    undefined

  const paddingPreset =
    overridePadding ||
    summitStyles?.defaultSectionPadding ||
    pageStyles?.defaultSectionPadding ||
    fallbackPadding

  const paddingClass = paddingCustom
    ? ''
    : PADDING_PRESET_CLASSES[paddingPreset] || PADDING_PRESET_CLASSES.normal

  const style: React.CSSProperties = {}
  if (bgColor) style.backgroundColor = bgColor
  if (paddingCustom) {
    style.paddingTop = paddingCustom
    style.paddingBottom = paddingCustom
  }

  return {
    className: paddingClass,
    style,
  }
}
