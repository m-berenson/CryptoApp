import CryptoCell from '@/components/molecules/CryptoCell/Cell'
import { colors, textVariants } from '@/theme'
import { render } from '@testing-library/react-native'
import React from 'react'

describe('CryptoCell', () => {
  it('should render a simple CryptoCell', () => {
    const { getByText } = render(
      <CryptoCell name='CryptoCell' symbol='CC' price='100.00' isFavorite={false} />
    )
    const name = getByText('CryptoCell')
    const symbol = getByText('CC')
    const price = getByText('$100.00 USD')

    expect(name).toBeTruthy()
    expect(symbol).toBeTruthy()
    expect(price).toBeTruthy()

    expect(name.props.style[0].fontSize).toBe(textVariants.label.fontSize)
  })

  it('should render a big CryptoCell', () => {
    const { getByText } = render(
      <CryptoCell name='CryptoCell' symbol='CC' price='100.00' isFavorite={false} big={true} />
    )
    const element = getByText('CryptoCell')

    expect(element.props.style[0].fontSize).toBe(textVariants['subheading-regular'].fontSize)
  })

  it('should render a favorite CryptoCell', () => {
    const { getByTestId } = render(
      <CryptoCell name='CryptoCell' symbol='CC' price='100.00' isFavorite={true} />
    )
    const element = getByTestId('crypto-cell-pressable')

    expect(element.props.style[1].borderColor).toBe(colors.accentColor)
  })
})
