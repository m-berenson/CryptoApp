import { type User } from '@react-native-google-signin/google-signin'

export const getUserName = (user: User | null) => {
  return user && user.user.name ? user.user.name.split(' ')[0] : undefined
}
