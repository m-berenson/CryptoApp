import React, { useCallback, useEffect, useState } from 'react'
import { GoogleSignin, statusCodes, type User } from '@react-native-google-signin/google-signin'
import { createContext } from 'react'
import { clearAll } from '../storage/storage'
import Config from 'react-native-config'

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

  console.log(Config.GOOGLE_SIGN_IN_IOS_CLIENT_ID)

  useEffect(() => {
    GoogleSignin.isSignedIn()
      .then(isSignedIn => {
        if (isSignedIn) {
          GoogleSignin.getCurrentUser().then(userInfo => {
            setUser(userInfo)
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const signIn = useCallback(async () => {
    try {
      setIsLoading(true)
      const userInfo = await GoogleSignin.signIn()

      console.log(userInfo)
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
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
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
