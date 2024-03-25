# CryptoApp

- [CryptoApp](#cryptoapp)
  - [📝 Description](#-description)
  - [🔧 Installation](#-installation)
  - [💻 Technologies](#-technologies)
  - [📦 Packages Used](#-packages-used)
    - [🌐 API Requests](#-api-requests)
    - [📊 Navigation](#-navigation)
    - [⚙️ Environment Variables](#️-environment-variables)
    - [🔒 Local Storage](#-local-storage)
    - [🌍 Localization](#-localization)
    - [🔑 Google SignIn](#-google-signin)
    - [🧪 Testing](#-testing)

## 📝 Description

This is a React native app that allows users to check the current price of cryptocurrencies. The app uses the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/) to fetch the data. The app also allows users to search for a specific cryptocurrency and view more details about it. The app is built using React Native CLI.

## 🔧 Installation

_Note: To run the app you will need to have the .env files._

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Run `bundle install` to install the dependencies for the iOS project
4. Run `cd ios && bundle exec pod install` to install the pods.
5. Run `yarn ios` to run the app on an iOS simulator. (You can also run `yarn android` to run the app on an Android emulator.)

## 💻 Technologies

- React Native CLI
- TypeScript

## 📦 Packages Used

### 🌐 API Requests

- [fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [React Query](https://tanstack.com/query/v3/docs/framework/react/overview)
  - React Query is used to handle the asynchronous requests and cache the data.

### 📊 Navigation

- [React Navigation](https://reactnavigation.org/)
  - React Navigation is used to handle the navigation between screens.

### ⚙️ Environment Variables

- [react-native-config](https://github.com/lugg/react-native-config/)
  - React Native Config is used to handle the environment variables and API keys.

### 🔒 Local Storage

- [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)
  - React Native MMKV is used to store the data locally and retrieve it synchronously.

### 🌍 Localization

- [react-native-localization](https://github.com/stefalda/ReactNativeLocalization)
  - React Native Localization is used to handle the localization of the app to have multiple languages (The app is currently available in English and Spanish).

### 🔑 Google SignIn

- [react-native-google-signin](https://github.com/react-native-google-signin/google-signin)
  - React Native Google Signin is used to handle the Google Sign In and user session management.

### 🧪 Testing

- [Jest](https://jestjs.io/)
  - Jest is used to run the tests.
- [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
  - React Native Testing Library is used to test the components.
