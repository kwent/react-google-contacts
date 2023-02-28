import React from 'react'
import GoogleContacts from '../src/index'
// import FontAwesome from 'react-fontawesome';

const clientId = '' // <Your Client Id>
const apiKey = '' // <Your Api Key>

const success = response => {
  console.log(response) // eslint-disable-line
}

const error = response => {
  console.error(response) // eslint-disable-line
}

const loading = () => {
  console.log('loading') // eslint-disable-line
}

const App = () => (
  <div>
    <GoogleContacts apiKey={apiKey} clientId={clientId} onFailure={error} onRequest={loading} onSuccess={success} />
    <br />
    <br />
    <GoogleContacts apiKey={apiKey} clientId={clientId} onFailure={error} onRequest={loading} onSuccess={success} theme="dark" />
    <br />
    <br />
    <GoogleContacts apiKey={apiKey} clientId={clientId} disabled onFailure={error} onRequest={loading} onSuccess={success} theme="dark" />
    <br />
    <br />
    <GoogleContacts
      apiKey={apiKey}
      clientId={clientId}
      onFailure={error}
      onRequest={loading}
      onSuccess={success}
      render={renderProps => (
        <button onClick={renderProps.onClick} type="button">
          This is my custom Google button
        </button>
      )}
      theme="dark"
    />
  </div>
)

export default App
