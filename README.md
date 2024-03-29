# React Google Contacts

> A Google Button to import user's gmail contacts

<img src="https://github.com/kwent/react-google-contacts/raw/master/doc/screenshot.png?raw=true" alt="React Google Contacts" style="max-width:100%;" height="200px">

## Install
```
npm install react-google-contacts
```

## How to use
```js
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleContacts from 'react-google-contacts';

const responseCallback = (response) => {
  console.log(response);
}

ReactDOM.render(
  <GoogleContacts
    clientId="YOUR_CLIENT_ID"
    apiKey="YOUR_API_KEY"
    buttonText="Import"
    onSuccess={responseCallback}
    onFailure={responseCallback}
  />,
  document.getElementById('googleButton')
);
```

## Google button without styling or custom button
```js
ReactDOM.render(
  <GoogleContacts
    clientId="YOUR_CLIENT_ID"
    apiKey="YOUR_API_KEY"
    render={renderProps => (
      <button onClick={renderProps.onClick}>This is my custom Google button</button>
    )}
    buttonText="Import"
    onSuccess={responseCallback}
    onFailure={responseCallback}
  />,
  document.getElementById('googleButton')
);
```

## onSuccess callback

Callback will return an array of objects (contacts).

If you use the hostedDomain param, make sure to validate the id_token (a JSON web token) returned by Google on your backend server:
 1. In the `responseGoogle(response) {...}` callback function, you should get back a standard JWT located at `response.hg.id_token`
 2. Send this token to your server (preferably as an `Authorization` header)
 3. Have your server decode the id_token by using a common JWT library such as [jwt-simple](https://github.com/hokaccha/node-jwt-simple) or by sending a GET request to `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=YOUR_TOKEN_HERE`
 4. The returned decoded token should have an `hd` key equal to the hosted domain you'd like to restrict to.


## Parameters

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    clientId  |  string  |               REQUIRED               |                  |
|    apiKey    |  string  |               REQUIRED               |                  |
|  maxResults  |  number  |                  999                 |   By passing a number here you can restrict how many results you want to return   |
| hostedDomain |  string  |                   -                  | URL of the Javascript file normally hosted by Google |
|  accessType  |  string  |                 online               | Can be either 'online' or 'offline'. |
|   onFailure  | function |               REQUIRED               |                  |
|   onSuccess  | function |               REQUIRED               |                  |
|   onRequest  | function |                () => {}              |                  |
|   buttonText |  string  |             Import from Gmail        |                  |
|   className  |  string  |                   -                  |                  |
| disabledStyle|  object  |                   -                  |                  |
|   loginHint  |  string  |                   -                  |                  |
|    prompt    |  string  |               consent                |                  |
|     tag      |  string  |                button                |  sets element tag (div, a, span, etc     |
|     type     |  string  |               button                 |sets button type (submit || button)     |
|  disabled    | boolean  |               false                  |                  |
|   uxMode     |  string  |               popup                  | The UX mode to use for the sign-in flow. Valid values are popup and redirect. |
|    theme     | string   |               light                  | If set to `dark` the button will follow the Google brand guidelines for dark. Otherwise it will default to light (https://developers.google.com/identity/branding-guidelines) |
|    icon      | boolean  |               true                   | Show (`true`) or hide (`false`) the Google Icon |
| redirectUri  |  string  |                 -                    | If using uxMode='redirect', this parameter allows you to override the default redirect_uri that will
|   render     | function |                 -                    | Render prop to use a custom element, use renderProps.onClick |

## onSuccess callback ( w/ offline false)

  onSuccess callback returns an array of objects (contacts).

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|   title       |  string  |        First Name and Last Name      |
|   email       |  string  |                Email                 |

## onSuccess callback ( w/ offline true)

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|    code       |  object  |           offline token              |

You can also pass child components such as icons into the button component.
```js
  <GoogleContacts
    clientId="YOUR_CLIENT_ID"
    apiKey="YOUR_API_KEY"
    onSuccess={responseCallback}
    onFailure={responseCallback}
  >
    <FontAwesome
      name='google'
    />
    <span> Import from Gmail</span>
  </GoogleContacts>

```


## onFailure callback

onFailure callback is called when either initialization or a signin attempt fails.

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|   error       |  string  |           Error code                 |
|   details     |  string  |      Detailed error description      |



Common error codes include:

| error code | description |
|:----------:|:-----------:|
| `idpiframe_initialization_failed` | initialization of the Google Auth API failed (this will occur if a client doesn't have [third party cookies enabled](https://github.com/google/google-api-javascript-client/issues/260)) |
| `popup_closed_by_user` | The user closed the popup before finishing the sign in flow.|
| `access_denied` | The user denied the permission to the scopes required |
| `immediate_failed` | No user could be automatically selected without prompting the consent flow. |

More details can be found in the official Google docs:
 * [GoogleAuth.then(onInit, onError)](https://developers.google.com/identity/sign-in/web/reference#googleauththenoninit-onerror)
 * [GoogleAuth.signIn(options)](https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions)
 * [GoogleAuth.grantOfflineAccess(options)](https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions)

## Dev Server
```
npm run start
```
Default dev server runs at localost:8080 in browser.
You can set IP and PORT in webpack.config.dev.js

## Run Tests
```
npm run test:watch
```

## Production Bundle
```
npm run bundle
```

## Credits

Based on the amazing work of @anthonyjgrove: https://github.com/anthonyjgrove/react-google-login
