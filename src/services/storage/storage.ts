import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

type StorageKeys = 'Favorites'

type StorageValue = boolean | number | string | object

type GetParams = {
  key: StorageKeys
}

type SetParams<T extends StorageValue> = {
  key: StorageKeys
  value: T
}

const onKeyChange = (key: StorageKeys, callback: (changedKey?: string) => void) => {
  const listener = storage.addOnValueChangedListener(callback)

  return () => listener.remove()
}

const setItem = <T extends StorageValue>({ key, value }: SetParams<T>) => {
  if (typeof value === 'object') {
    storage.set(key, JSON.stringify(value))
    return
  }

  storage.set(key, value)
}

const getBoolean = ({ key }: GetParams) => {
  return storage.getBoolean(key)
}

const getNumber = ({ key }: GetParams) => {
  return storage.getNumber(key)
}

const getString = ({ key }: GetParams) => {
  return storage.getString(key)
}

const getObject = <T extends object>({ key }: GetParams) => {
  const value = storage.getString(key)

  try {
    return value ? (JSON.parse(value) as T) : null
  } catch (error) {
    return null
  }
}

export { onKeyChange, setItem, getBoolean, getNumber, getString, getObject }
