import Text from '@/components/atoms/Text/Text'
import { colors, shadows } from '@/theme'
import { View } from 'react-native'

type HeaderProps = {
  userName: string
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <Text variant='heading-regular'>
      👋 ¡Hola, <Text variant='heading-medium'>{userName}</Text>!
    </Text>
  )
}

export default Header
