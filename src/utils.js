/* eslint-disable no-underscore-dangle */

function titleize(string) {
  return string.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase())
}

function extractTitleFromEntry(entry) {
  if (entry.title && entry.title._text) {
    return titleize(entry.title._text)
  }
  if (entry['gd:name'] && entry['gd:name']['gd:fullName'] && entry['gd:name']['gd:fullName']._text) {
    return titleize(entry['gd:name']['gd:fullName']._text)
  }
  if (
    entry['gd:name'] &&
    entry['gd:name']['gd:givenName'] &&
    entry['gd:name']['gd:givenName']._text &&
    entry['gd:name']['gd:familyName'] &&
    entry['gd:name']['gd:familyName']._text
  ) {
    return `${titleize(entry['gd:name']['gd:givenName']._text)} ${titleize(entry['gd:name']['gd:familyName']._text)}`
  }
  if (entry['gd:name'] && entry['gd:name']['gd:givenName']._text) {
    return titleize(entry['gd:name']['gd:givenName']._text)
  }
  if (entry['gd:name'] && entry['gd:name']['gd:familyName']._text) {
    return titleize(entry['gd:name']['gd:familyName']._text)
  }
  if (entry['gd:email'] && entry['gd:email']._attributes && entry['gd:email']._attributes.address) {
    return titleize(entry['gd:email']._attributes.address.replace(/@.*/, '').replace('.', ' '))
  }

  return null
}

function extractPhoneNumberFromEntry(entry) {
  if (entry['gd:phoneNumber']) {
    if (entry['gd:phoneNumber']._attributes && entry['gd:phoneNumber']._attributes.uri) {
      return entry['gd:phoneNumber']._attributes.uri.replace('tel:', '')
    }

    if (entry['gd:phoneNumber']._attributes && entry['gd:phoneNumber']._attributes._text) {
      return entry['gd:phoneNumber']._attributes._text
    }
  }

  return null
}

function extractGivenNameFromEntry(entry) {
  if (entry['gd:name'] && entry['gd:name']['gd:givenName'] && entry['gd:name']['gd:givenName']._text) {
    return titleize(entry['gd:name']['gd:givenName']._text)
  }

  return null
}

function extractFamilyNameFromEntry(entry) {
  if (entry['gd:name'] && entry['gd:name']['gd:familyName'] && entry['gd:name']['gd:familyName']._text) {
    return titleize(entry['gd:name']['gd:familyName']._text)
  }

  return null
}

function extractEmailFromEntry(entry) {
  if (entry['gd:email'] && entry['gd:email']._attributes && entry['gd:email']._attributes.address) {
    return entry['gd:email']._attributes.address
  }

  return null
}

export { titleize, extractTitleFromEntry, extractGivenNameFromEntry, extractFamilyNameFromEntry, extractEmailFromEntry, extractPhoneNumberFromEntry }
