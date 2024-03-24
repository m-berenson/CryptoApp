import React from 'react'
import { View } from 'react-native'
import { spacing, type SpacingKeys } from '@/theme'

type SpacerProps = {
  vertical?: SpacingKeys
  horizontal?: SpacingKeys
}

const Spacer: React.FC<SpacerProps> = ({ vertical = 'medium', horizontal = 'medium' }) => {
  return <View style={{ height: spacing[vertical], width: spacing[horizontal] }} />
}

export default Spacer
