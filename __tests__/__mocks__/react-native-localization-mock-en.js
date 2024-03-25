const interfaceLanguage = 'en'

class RNLocalization {
  constructor(props) {
    this.props = props
    this.setLanguage(interfaceLanguage)
  }

  setLanguage(iLanguage) {
    const bestLanguage = iLanguage

    this.language = bestLanguage

    if (this.props[bestLanguage]) {
      const localizedStrings = this.props[this.language]
      for (const key in localizedStrings) {
        if (localizedStrings.hasOwnProperty(key)) {
          this[key] = localizedStrings[key]
        }
      }
    }
  }
}

export default RNLocalization
