import { getButtonStyles } from '@/lib/summit-styles'
import type { PageButtonPreset } from '@/sanity/lib/pageStyles'

export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonColor = 'primary' | 'gold'
export type ButtonAlignment = 'left' | 'center' | 'right'
export type SectionSpacing = 'tight' | 'normal' | 'loose'

/** Returns className and optional style for a block button. Use when block has buttonPreset (page-level) or block-level props. */
export function getBlockButtonProps(options: {
  buttonSize?: ButtonSize
  buttonColor?: ButtonColor
  buttonPreset?: PageButtonPreset
  onDarkBg?: boolean
}): { className: string; style?: React.CSSProperties } {
  if (options.buttonPreset) {
    const { className, style } = getButtonStyles({ preset: options.buttonPreset })
    return { className: `inline-block rounded-full font-bold transition-all shadow-xl hover:opacity-90 ${className}`, style }
  }
  return {
    className: `inline-block rounded-full font-bold transition-all shadow-xl ${getButtonSizeClasses(options.buttonSize)} ${getButtonColorClasses(options.buttonColor, options.onDarkBg)}`,
  }
}

export function getButtonSizeClasses(size?: ButtonSize | string): string {
  switch (size) {
    case 'xs':
      return 'px-3 py-1.5 text-xs'
    case 'small':
      return 'px-4 py-2 text-xs'
    case 'sm':
      return 'px-4 py-2 text-sm'
    case 'base':
      return 'px-6 py-3 text-base'
    case 'large':
      return 'px-10 py-4 text-lg'
    case 'lg':
      return 'px-8 py-4 text-lg'
    case 'xl':
      return 'px-10 py-5 text-xl'
    case '2xl':
      return 'px-12 py-6 text-2xl'
    case 'medium':
    default:
      return 'px-6 py-3 text-sm'
  }
}

export function getButtonColorClasses(color?: ButtonColor, onDarkBg = false): string {
  if (color === 'gold') {
    return 'bg-(--color-roti) text-white hover:opacity-90'
  }
  if (onDarkBg) {
    return 'bg-(--color-roti) text-white hover:bg-white hover:text-(--color-primary)'
  }
  return 'bg-(--color-primary) text-white hover:bg-(--color-roti)'
}

export function getButtonAlignClasses(alignment?: ButtonAlignment): string {
  switch (alignment) {
    case 'left':
      return 'text-left'
    case 'right':
      return 'text-right'
    default:
      return 'text-center'
  }
}

export function getSectionSpacingClasses(spacing?: SectionSpacing): string {
  switch (spacing) {
    case 'tight':
      return 'py-8 lg:py-10'
    case 'loose':
      return 'py-28 lg:py-36'
    default:
      return 'py-20 lg:py-24'
  }
}

export function getSectionBackgroundStyle(
  bgColor?: string,
  bgImageUrl?: string
): React.CSSProperties {
  const style: React.CSSProperties = {}
  if (bgColor) {
    style.backgroundColor = bgColor
  }
  if (bgImageUrl) {
    style.backgroundImage = `url(${bgImageUrl})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  return style
}
