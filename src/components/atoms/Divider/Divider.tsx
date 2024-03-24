import { colors } from '@/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Divider = () => <View style={styles.divider} />

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.darkGray,
  },
})

export default Divider
