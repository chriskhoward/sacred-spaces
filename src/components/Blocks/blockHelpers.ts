export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonColor = 'primary' | 'gold'
export type ButtonAlignment = 'left' | 'center' | 'right'
export type SectionSpacing = 'tight' | 'normal' | 'loose'

export function getButtonSizeClasses(size?: ButtonSize): string {
  switch (size) {
    case 'small':
      return 'px-4 py-2 text-xs'
    case 'large':
      return 'px-10 py-4 text-lg'
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
