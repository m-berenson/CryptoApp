import type { Config } from 'jest'

const jestConfig: Config = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFiles: ['./__tests__/setup.ts'],
}

export default jestConfig
