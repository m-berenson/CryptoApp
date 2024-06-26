import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '@/theme/colors'
import { borderRadius, spacing } from '@/theme'
import { isAndroid } from '@/utils/platform'

type SearchBarProps = {
  placeholder: string
  onSearch: (value: string) => void
  value?: string
}

const SearchBar = ({ placeholder, onSearch, value }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        onChangeText={onSearch}
        selectionColor={colors.textPrimary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: isAndroid ? undefined : spacing.medium,
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.medium,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
})

export default SearchBar
