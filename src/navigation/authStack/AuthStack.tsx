import React from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import SignIn from '@/screens/signIn/SignIn'

type AuthStackParamList = {
  SignIn: undefined
}

export type SignInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SignIn' component={SignIn} />
    </Stack.Navigator>
  )
}

export default AuthStack
