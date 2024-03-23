import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '@/theme/colors'

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
    padding: 8,
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
})

export default SearchBar
