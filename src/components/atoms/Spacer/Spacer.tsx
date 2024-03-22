import React from 'react'
import { View } from 'react-native'
import { SpacingKeys, useAppTheme } from '@/theme'

type SpacerProps = {
  vertical?: SpacingKeys
  horizontal?: SpacingKeys
}

const Spacer: React.FC<SpacerProps> = ({ vertical = 'medium', horizontal = 'medium' }) => {
  const { spacing } = useAppTheme()

  return <View style={{ height: spacing[vertical], width: spacing[horizontal] }} />
}

export default Spacer
