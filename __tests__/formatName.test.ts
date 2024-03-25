import { getUserName } from '@/utils/user'
import type { User } from '@react-native-google-signin/google-signin'

const BASE_USER: User = {
  user: {
    name: 'Juan Perez',
    id: '',
    email: '',
    photo: null,
    familyName: null,
    givenName: null,
  },
  idToken: null,
  serverAuthCode: null,
}

describe('getUserName util', () => {
  it('should return undefined when user is null', () => {
    const user = null
    expect(getUserName(user)).toBeUndefined()
  })

  it('should return the first name when user is defined', () => {
    const user = { ...BASE_USER, user: { ...BASE_USER.user, name: 'Juan' } }
    expect(getUserName(user)).toBe('Juan')
  })

  it('should return undefined when user name is not defined', () => {
    const user = { ...BASE_USER, user: { ...BASE_USER.user, name: null } }
    expect(getUserName(user)).toBeUndefined()
  })

  it('should return undefined when user name is empty', () => {
    const user = { ...BASE_USER, user: { ...BASE_USER.user, name: '' } }
    expect(getUserName(user)).toBeUndefined()
  })

  it('should return the first name when user name has multiple names', () => {
    const user = { ...BASE_USER, user: { ...BASE_USER.user, name: 'Juan Carlos Perez' } }
    expect(getUserName(user)).toBe('Juan')
  })

  it('should return the same name when user name has only one name', () => {
    const user = { ...BASE_USER, user: { ...BASE_USER.user, name: 'Juan' } }
    expect(getUserName(user)).toBe('Juan')
  })
})
