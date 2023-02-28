/* eslint-disable no-underscore-dangle */
/* eslint-disable better-mutation/no-mutating-methods */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from './icon'
import ButtonContent from './button-content'

const SCOPE = 'https://www.googleapis.com/auth/contacts.readonly'

class GoogleContacts extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.handleImportContacts = this.handleImportContacts.bind(this)
    this.handleParseContacts = this.handleParseContacts.bind(this)
    this.loadApi = this.loadApi.bind(this)
    this.loadClient = this.loadClient.bind(this)
    this.state = {
      hovered: false,
      active: false
    }
    this.allData = []
    this.client = null
  }

  componentDidMount() {
    const element = document.getElementsByTagName('script')[0]
    const firstJs = element

    if (!document.getElementById('google-contacts-api')) {
      const js = document.createElement('script')
      js.id = 'google-contacts-api'
      js.src = 'https://apis.google.com/js/api.js'
      if (firstJs && firstJs.parentNode) {
        firstJs.parentNode.insertBefore(js, firstJs)
      } else {
        document.head.appendChild(js)
      }
      js.onload = this.loadApi
    }

    if (!document.getElementById('google-contacts-gsi')) {
      const js = document.createElement('script')
      js.id = 'google-contacts-gsi'
      js.src = 'https://accounts.google.com/gsi/client'
      if (firstJs && firstJs.parentNode) {
        firstJs.parentNode.insertBefore(js, firstJs)
      } else {
        document.head.appendChild(js)
      }
      js.onload = this.loadClient
    }
  }

  loadApi() {
    const { apiKey } = this.props

    window.gapi.load('client', () => {
      window.gapi.client.init({
        apiKey
      })
    })
  }

  loadClient() {
    const { clientId, hostedDomain, loginHint, accessType, onFailure, redirectUri, uxMode } = this.props

    if (accessType === 'online') {
      this.client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPE,
        hosted_domain: hostedDomain,
        hint: loginHint
      })
    }

    if (accessType === 'offline') {
      this.client = window.google.accounts.oauth2.initCodeClient({
        client_id: clientId,
        scope: SCOPE,
        hosted_domain: hostedDomain,
        hint: loginHint,
        redirect_uri: redirectUri,
        ux_mode: uxMode
      })
    }

    this.client.error_callback = onFailure
  }

  handleImportContacts(tokenResponse, pageToken = null) {
    const { onFailure, maxResults } = this.props

    if (tokenResponse) {
      window.gapi.client
        .request({
          path: 'https://people.googleapis.com/v1/people/me/connections',
          params: {
            personFields: 'names,emailAddresses',
            pageSize: maxResults > 1000 ? 1000 : maxResults,
            ...(pageToken && { pageToken })
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
    this.allData = [...this.allData, ...parsedData.connections]
    // If we have more data and the number of data we fethced is less than maxResults then fetch again using the nextPageToken

    if ('nextPageToken' in parsedData && maxResults > this.allData.length) {
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
        if (element.emailAddresses && element.emailAddresses.length > 1) {
          results.push({
            email: element.emailAddresses[0].value,
            title: 'names' in element ? element.names[0].displayName : element.emailAddresses[0].value
          })
        }
      }
      onSuccess(results)
    } catch (error) {
      onFailure('Error to fetch contacts')
    }
  }

  signIn(e) {
    this.allData = []
    const { disable } = this.state
    const { prompt, onRequest, accessType, onSuccess } = this.props

    onRequest()

    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }

    if (!disable) {
      if (accessType === 'online') {
        this.client.callback = resp => {
          this.handleImportContacts(resp)
        }

        if (window.gapi.client.getToken() === null) {
          this.client.requestAccessToken({ prompt })
        } else {
          this.client.requestAccessToken({ prompt: '' })
        }
      }

      if (accessType === 'offline') {
        this.client.callback = onSuccess

        if (window.gapi.client.getToken() === null) {
          this.client.requestCode({ prompt })
        } else {
          this.client.requestCode({ prompt: '' })
        }
      }
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
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  hostedDomain: PropTypes.string,
  icon: PropTypes.bool,
  loginHint: PropTypes.string,
  maxResults: PropTypes.number,
  onFailure: PropTypes.func.isRequired,
  onRequest: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  redirectUri: PropTypes.string,
  render: PropTypes.func,
  tag: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string,
  uxMode: PropTypes.string
}

GoogleContacts.defaultProps = {
  accessType: 'online',
  buttonText: 'Import from Gmail',
  disabled: false,
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  maxResults: 999,
  onRequest: () => {},
  prompt: 'consent',
  tag: 'button',
  theme: 'light',
  type: 'button',
  uxMode: 'popup'
}

export default GoogleContacts
