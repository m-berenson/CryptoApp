import Button from '@/components/atoms/Button/Button'
import Layout from '@/components/atoms/Layout/Layout'
import Spacer from '@/components/atoms/Spacer/Spacer'
import Text from '@/components/atoms/Text/Text'
import { useAuthContext } from '@/services/auth/useAuthContext'
import React from 'react'

const SignIn = () => {
  const { signIn, isLoading } = useAuthContext()

  return (
    <Layout>
      <Spacer vertical='large' />

      <Text variant='heading-regular'>
        ¡Bienvenido a <Text variant='heading-medium'>#CryptoApp</Text>!
      </Text>

      <Spacer vertical='large' />

      <Button isLoading={isLoading} title='Sign in with Google' onPress={signIn} />
    </Layout>
  )
}

export default SignIn
