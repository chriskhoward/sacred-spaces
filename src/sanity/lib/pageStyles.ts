/**
 * Page-level styles (for generic page documents).
 * Used by BlockRenderer when rendering page content.
 */

export interface PageButtonPreset {
  bgColor?: string
  textColor?: string
  size?: string
}

export interface PageStyles {
  buttonPrimary?: PageButtonPreset
  buttonSecondary?: PageButtonPreset
  defaultSectionBg?: string
  defaultSectionPadding?: string
  defaultSectionPaddingCustom?: string
  headingSize?: string
  bodySize?: string
}
