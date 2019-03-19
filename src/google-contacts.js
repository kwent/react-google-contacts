/* eslint-disable no-underscore-dangle */
/* eslint-disable better-mutation/no-mutating-methods */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import xml from 'xml-js'

import Icon from './icon'
import ButtonContent from './button-content'

import { extractTitleFromEntry, extractEmailFromEntry, extractPhoneNumberFromEntry } from './utils'

const SCOPE = 'https://www.googleapis.com/auth/contacts.readonly'
const MAX_RESULTS = '999' // TODO Make this parametable or paginate

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
  }

  componentDidMount() {
    const { jsSrc } = this.props
    ;((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
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
    })(document, 'script', 'google-contacts')
  }

  handleImportContacts(res) {
    const { onFailure } = this.props

    if (res) {
      const authResponse = res.getAuthResponse()
      window.gapi.load('client', () => {
        window.gapi.client
          .request({
            path: '/m8/feeds/contacts/default/full',
            params: { 'max-results': MAX_RESULTS },
            headers: {
              'GData-Version': '3.0',
              Authorization: `Bearer ${authResponse.access_token}`
            }
          })
          .then(response => this.handleParseContacts(response), err => onFailure(err))
      })
    }
  }

  handleParseContacts(response) {
    const { onSuccess } = this.props

    // Now let's parse the XML...
    const options = { ignoreDeclaration: true, ignoreComment: true, compact: true }
    const parsed = xml.xml2js(response.body, options)

    // Iterate over each contact.
    const results = []

    Object.keys(parsed.feed.entry).forEach(key => {
      if (
        parsed.feed.entry[key] &&
        parsed.feed.entry[key]['gd:email'] &&
        parsed.feed.entry[key]['gd:email']._attributes &&
        parsed.feed.entry[key]['gd:email']._attributes.address
      ) {
        results.push({
          title: extractTitleFromEntry(parsed.feed.entry[key]),
          email: extractEmailFromEntry(parsed.feed.entry[key]),
          phoneNumber: extractPhoneNumberFromEntry(parsed.feed.entry[key])
        })
      }
    })

    onSuccess(results)
  }

  signIn(e) {
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      redirectUri,
      discoveryDocs,
      onRequest,
      onFailure,
      uxMode,
      accessType,
      responseType,
      prompt,
      onSuccess
    } = this.props

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
    if (!this.state.disabled) {
      const _signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        const options = { prompt }
        onRequest()
        if (responseType === 'code') {
          auth2.grantOfflineAccess(options).then(res => onSuccess(res), err => onFailure(err))
        } else {
          auth2.signIn(options).then(res => this.handleImportContacts(res), err => onFailure(err))
        }
      }

      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(_signIn)
        } else {
          _signIn()
        }
      })
    }
  }

  render() {
    const { tag, type, className, disabledStyle, buttonText, children, render, theme, icon } = this.props
    const disabled = this.state.disabled || this.props.disabled

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

      if (this.state.active) {
        if (theme === 'dark') {
          return Object.assign({}, initialStyle, activeStyle)
        }

        return Object.assign({}, initialStyle, activeStyle)
      }

      if (this.state.hovered) {
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
        icon && <Icon key={1} active={this.state.active} />,
        <ButtonContent icon={icon} key={2}>
          {children || buttonText}
        </ButtonContent>
      ]
    )

    return googleLoginButton
  }
}

GoogleContacts.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool
}

GoogleContacts.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Import from Gmail',
  accessType: 'online',
  prompt: 'consent',
  cookiePolicy: 'single_host_origin',
  uxMode: 'popup',
  disabled: false,
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  theme: 'light',
  onRequest: () => {},
  jsSrc: 'https://apis.google.com/js/api.js'
}

export default GoogleContacts
