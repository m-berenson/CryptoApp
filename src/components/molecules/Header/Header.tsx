import React from 'react'
import Text from '@/components/atoms/Text/Text'
import { strings } from '@/services/localization/strings'

type HeaderProps = {
  userName?: string
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return !userName ? (
    <Text variant='heading-regular'>`${strings.headerMessage}!`</Text>
  ) : (
    <Text variant='heading-regular'>
      {strings.headerMessage}, <Text variant='heading-medium'>{userName}</Text>!
    </Text>
  )
}

export default Header
