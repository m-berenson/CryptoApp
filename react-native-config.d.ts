declare module 'react-native-config' {
  export interface NativeConfig {
    COIN_MARKET_CAP_API_URL: string
    COIN_MARKET_CAP_API_KEY: string
    GOOGLE_SIGN_IN_IOS_CLIENT_ID: string
    GOOGLE_SIGN_IN_IOS_REVERSED_CLIENT_ID: string
    GOOGLE_SIGN_IN_ANDROID_CLIENT_ID: string
  }

  export const Config: NativeConfig
  export default Config
}
