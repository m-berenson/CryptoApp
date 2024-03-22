import Text from '@/components/atoms/Text/Text'

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
