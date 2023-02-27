/* eslint-disable no-underscore-dangle */
/* eslint-disable better-mutation/no-mutating-methods */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from './icon'
import ButtonContent from './button-content'

const SCOPE = 'https://www.googleapis.com/auth/contacts.other.readonly'

class GoogleContacts extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.handleImportContacts = this.handleImportContacts.bind(this)
    this.handleParseContacts = this.handleParseContacts.bind(this)
    this.state = {
      hovered: false,
      active: false
    }
    this.allData = []
  }

  componentDidMount() {
    this.allData = []
    const { jsSrcs } = this.props
    ;((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      jsSrcs.forEach(jsSrc => {
        let js = element
        js = d.createElement(s)
        js.id = id
        js.src = jsSrc
        if (fjs && fjs.parentNode) {
          fjs.parentNode.insertBefore(js, fjs)
        } else {
          d.head.appendChild(js)
        }
        js.onload = cb
      })
    })(document, 'script', 'google-contacts')
  }

  handleImportContacts(tokenResponse, pageToken = null) {
    const { onFailure, maxResults } = this.props

    if (tokenResponse) {
      window.gapi.client
        .request({
          path: 'https://people.googleapis.com/v1/otherContacts',
          params: {
            readMask: 'names,emailAddresses',
            pageSize: maxResults > 1000 ? 1000 : maxResults,
            ...(pageToken && { pageToken })
          },
          headers: {
            'GData-Version': '3.0',
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        })
        .then(
          response => this.handleNextDataFetch(response, tokenResponse),
          err => onFailure(err)
        )
    }
  }

  handleNextDataFetch(response, authResponse) {
    const { maxResults } = this.props
    // Parse the response body
    const parsedData = JSON.parse(response.body)

    // Store the fetched data so that we can use it later
    this.allData = [...this.allData, ...parsedData.otherContacts]

    // If we have more data and the number of data we fethced is less than maxResults then fetch again using the nextPageToken
    if ('nextPageToken' in parsedData && maxResults < this.allData.length) {
      this.handleImportContacts(authResponse, parsedData.nextPageToken)
    } else {
      this.handleParseContacts()
    }
  }

  handleParseContacts() {
    const { onSuccess, onFailure } = this.props
    const results = []
    try {
      for (let index = 0; index < this.allData.length; index += 1) {
        const element = this.allData[index]
        results.push({
          email: element.emailAddresses[0].value,
          title: 'names' in element ? element.names[0].displayName : element.emailAddresses[0].value
        })
      }
      onSuccess(results)
    } catch (error) {
      onFailure('Error to fetch contact')
    }
  }

  signIn(e) {
    this.allData = []
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      redirectUri,
      discoveryDocs,
      // onRequest,
      // onFailure,
      uxMode,
      accessType,
      responseType
      // prompt,
      // onSuccess
    } = this.props

    const { disable } = this.state

    const params = {
      client_id: clientId,
      cookie_policy: cookiePolicy,
      login_hint: loginHint,
      hosted_domain: hostedDomain,
      discoveryDocs,
      ux_mode: uxMode,
      redirect_uri: redirectUri,
      scope: SCOPE,
      access_type: accessType
    }

    if (responseType === 'code') {
      params.access_type = 'offline'
    }

    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (!disable) {
      const _signIn = tokenResponse => {
        if (responseType === 'code') {
          // todo
        } else {
          this.handleImportContacts(tokenResponse)
        }
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: params.client_id,
        scope: params.scope,
        callback: tokenResponse => {
          _signIn(tokenResponse)
        },
        error_callback: () => {} // handle
      })

      client.requestAccessToken()
    }
  }

  render() {
    const { tag, type, className, disabledStyle, buttonText, children, render, theme, icon, disabled: disabledProps } = this.props
    const { active, hovered, disabled: disabledState } = this.state
    const disabled = disabledState || disabledProps

    if (render) {
      return render({ onClick: this.signIn })
    }

    const initialStyle = {
      backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
      padding: 0,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Roboto, sans-serif'
    }

    const hoveredStyle = {
      cursor: 'pointer',
      opacity: 0.9
    }

    const activeStyle = {
      cursor: 'pointer',
      backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      opacity: 1
    }

    const defaultStyle = (() => {
      if (disabled) {
        return Object.assign({}, initialStyle, disabledStyle)
      }

      if (active) {
        if (theme === 'dark') {
          return Object.assign({}, initialStyle, activeStyle)
        }

        return Object.assign({}, initialStyle, activeStyle)
      }

      if (hovered) {
        return Object.assign({}, initialStyle, hoveredStyle)
      }

      return initialStyle
    })()
    const googleLoginButton = React.createElement(
      tag,
      {
        onMouseEnter: () => this.setState({ hovered: true }),
        onMouseLeave: () => this.setState({ hovered: false, active: false }),
        onMouseDown: () => this.setState({ active: true }),
        onMouseUp: () => this.setState({ active: false }),
        onClick: this.signIn,
        style: defaultStyle,
        type,
        disabled,
        className
      },
      [
        icon && <Icon key={1} active={active} />,
        <ButtonContent key={2} icon={icon}>
          {children || buttonText}
        </ButtonContent>
      ]
    )

    return googleLoginButton
  }
}

GoogleContacts.propTypes = {
  accessType: PropTypes.string,
  buttonText: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
  cookiePolicy: PropTypes.string,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  discoveryDocs: PropTypes.array,
  hostedDomain: PropTypes.string,
  icon: PropTypes.bool,
  jsSrcs: PropTypes.array,
  loginHint: PropTypes.string,
  maxResults: PropTypes.number,
  onFailure: PropTypes.func.isRequired,
  // onRequest: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  // prompt: PropTypes.string,
  redirectUri: PropTypes.string,
  render: PropTypes.func,
  responseType: PropTypes.string,
  tag: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string,
  uxMode: PropTypes.string
}

GoogleContacts.defaultProps = {
  accessType: 'online',
  buttonText: 'Import from Gmail',
  cookiePolicy: 'single_host_origin',
  disabled: false,
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  jsSrcs: ['https://apis.google.com/js/api.js', 'https://accounts.google.com/gsi/client'],
  maxResults: 999,
  // onRequest: () => {},
  // prompt: 'consent',
  tag: 'button',
  theme: 'light',
  type: 'button',
  uxMode: 'popup'
}

export default GoogleContacts
