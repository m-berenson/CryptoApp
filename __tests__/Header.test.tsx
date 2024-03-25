import React from 'react'
import Header from '@/components/molecules/Header/Header'
import { render } from '@testing-library/react-native'

describe('Header - English', () => {
  it('should render the header without any name when user name is not defined', () => {
    const { getByText } = render(<Header />)
    const element = getByText('👋 Hello!')
    expect(element).toBeTruthy()
  })

  it('should render the header with the user name when user name is defined', () => {
    const { getByText } = render(<Header userName='John' />)
    const element = getByText('👋 Hello, John!')
    expect(element).toBeTruthy()
  })
})
