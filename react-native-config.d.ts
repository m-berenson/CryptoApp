declare module 'react-native-config' {
  export interface NativeConfig {
    COIN_MARKET_CAP_API_URL: string
    COIN_MARKET_CAP_API_KEY: string
  }

  export const Config: NativeConfig
  export default Config
}
