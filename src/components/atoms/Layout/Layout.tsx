import React from 'react'
import { colors } from '@/theme'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacer from '../Spacer/Spacer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Spacer vertical='large' />
      {children}
      <Spacer vertical='large' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 16,
  },
})

export default Layout
