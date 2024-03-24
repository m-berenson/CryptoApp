import Layout from '@/components/atoms/Layout/Layout'
import { SignInScreenProps } from '@/navigation/authStack/AuthStack'
import { useAuthContext } from '@/services/auth/useAuthContext'
import { colors } from '@/theme'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = ({ navigation }: SignInScreenProps) => {
  const { signIn, isLoading } = useAuthContext()

  return (
    <Layout>
      {isLoading ? (
        <ActivityIndicator size='large' color={colors.accentColor} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
    </Layout>
  )
}

export default SignIn
