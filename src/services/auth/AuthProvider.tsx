import React, { useCallback, useEffect, useState } from 'react'
import { GoogleSignin, statusCodes, type User } from '@react-native-google-signin/google-signin'
import { createContext } from 'react'
import { clearAll } from '../storage/storage'
import Config from 'react-native-config'
import { Alert } from 'react-native'
import { strings } from '../localization/strings'

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: () => void
  signOut: () => void
}

const INITIAL_STATE: AuthContextType = {
  user: null,
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
}

export const AuthContext = createContext(INITIAL_STATE)

GoogleSignin.configure({
  iosClientId: Config.GOOGLE_SIGN_IN_IOS_CLIENT_ID,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkIfSignedIn = async () => {
      try {
        const isSignedIn = await GoogleSignin.isSignedIn()

        if (isSignedIn) {
          const userInfo = await GoogleSignin.signInSilently()

          setUser(userInfo)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error checking if user is signed in', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkIfSignedIn()
  }, [])

  const signIn = useCallback(async () => {
    try {
      setIsLoading(true)

      const userInfo = await GoogleSignin.signIn()

      setUser(userInfo)
    } catch (error) {
      //@ts-ignore - We should use the correct type for error from GoogleSignin library
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return
      }

      Alert.alert('Error', strings.error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = async () => {
    try {
      await GoogleSignin.signOut()

      setUser(null)

      // TODO: Improve this call to clear storage for each user
      clearAll()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error signing out', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
