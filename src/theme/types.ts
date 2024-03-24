import type { colors } from './colors'
import type { shadows } from './shadows'
import type { spacing } from './spacing'
import type { textVariants } from './text'

export type ColorsKeys = keyof typeof colors
export type SpacingKeys = keyof typeof spacing
export type TextVariantKeys = keyof typeof textVariants
export type ShadowKeys = keyof typeof shadows
