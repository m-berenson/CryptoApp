import Button from '@/components/atoms/Button/Button'
import Layout from '@/components/atoms/Layout/Layout'
import Spacer from '@/components/atoms/Spacer/Spacer'
import Text from '@/components/atoms/Text/Text'
import { useAuthContext } from '@/services/auth/useAuthContext'
import { strings } from '@/services/localization/strings'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const SignIn = () => {
  const { signIn, isLoading } = useAuthContext()

  return (
    <Layout>
      <Spacer vertical='large' />

      <View style={styles.container}>
        <Text variant='heading-large-regular'>{strings.signInMessage}</Text>

        <Text variant='heading-large-medium'>
          {strings.cryptoApp}
          <Text variant='heading-large-regular'>!</Text>
        </Text>

        <Spacer vertical='xlarge' />
        <Spacer vertical='xlarge' />

        <Button isLoading={isLoading} title={strings.googleSignIn} onPress={signIn} />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
})

export default SignIn
