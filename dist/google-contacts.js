!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.GoogleContacts=t(require("react")):e.GoogleContacts=t(e.react)}("undefined"!=typeof self?self:this,(function(e){return r={},t.m=n=[function(t,n){t.exports=e},function(e,t,n){e.exports=n(2)()},function(e,t,n){"use strict";function r(){}function o(){}var a=n(3);o.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,o,i){if(i!==a)throw(i=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")).name="Invariant Violation",i}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:r};return n.PropTypes=n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){for(var n=0,r=Array(t=null==t||t>e.length?e.length:t);n<t;n++)r[n]=e[n];return r}function i(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){var r,o;o=n[r=t],r in(t=e)?Object.defineProperty(t,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[r]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=f(e);return n=t?(n=f(this).constructor,Reflect.construct(o,arguments,n)):o.apply(this,arguments),o=this,!(n=n)||"object"!==r(n)&&"function"!=typeof n?p(o):n}}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){return b.a.createElement("div",{style:{marginRight:10,background:e.active?"#eee":"#fff",padding:10,borderRadius:2}},b.a.createElement("svg",{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg"},b.a.createElement("g",{fill:"#000",fillRule:"evenodd"},b.a.createElement("path",{d:"M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",fill:"#EA4335"}),b.a.createElement("path",{d:"M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",fill:"#4285F4"}),b.a.createElement("path",{d:"M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",fill:"#FBBC05"}),b.a.createElement("path",{d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",fill:"#34A853"}),b.a.createElement("path",{fill:"none",d:"M0 0h18v18H0z"}))))}function h(e){return b.a.createElement("span",{style:{paddingRight:10,fontWeight:500,paddingLeft:e.icon?0:10,paddingTop:10,paddingBottom:10}},e.children)}n.r(t);var y=n(0),b=n.n(y),g=(n(1),function(){function e(t){return function(t){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),(t=r.call(this,t)).signIn=t.signIn.bind(p(t)),t.handleImportContacts=t.handleImportContacts.bind(p(t)),t.handleParseContacts=t.handleParseContacts.bind(p(t)),t.state={hovered:!1,active:!1},t.allData=[],t}!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(e,y.Component);var t,n,r=l(e);return t=e,(n=[{key:"componentDidMount",value:function(){this.allData=[];var e,t,n,r=this.props.jsSrc;n=t=(e=document).getElementsByTagName("script")[0],(t=e.createElement("script")).id="google-contacts",t.src=r,n&&n.parentNode?n.parentNode.insertBefore(t,n):e.head.appendChild(t),t.onload=void 0}},{key:"handleImportContacts",value:function(e){var t,n=this,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,o=this.props.onFailure;e&&(t=e.getAuthResponse(),window.gapi.load("client",(function(){window.gapi.client.request({path:"https://people.googleapis.com/v1/otherContacts",params:c({readMask:"names,emailAddresses",pageSize:1e3<n.props.maxResults?1e3:n.props.maxResults},r&&{pageToken:r}),headers:{"GData-Version":"3.0",Authorization:"Bearer ".concat(t.access_token)}}).then((function(t){return n.handleNextDataFetch(t,e)}),(function(e){return o(e)}))})))}},{key:"handleNextDataFetch",value:function(e,t){e=JSON.parse(e.body),this.allData=[].concat(o(this.allData),o(e.otherContacts)),"nextPageToken"in e&&this.props.maxResults<this.allData.length?this.handleImportContacts(t,e.nextPageToken):this.handleParseContacts()}},{key:"handleParseContacts",value:function(){var e=(t=this.props).onSuccess,t=t.onFailure,n=[];try{for(var r=0;r<this.allData.length;r+=1){var o=this.allData[r];n.push({email:o.emailAddresses[0].value,title:"names"in o?o.names[0].displayName:o.emailAddresses[0].value})}e(n)}catch(e){t("Error to fetch contact")}}},{key:"signIn",value:function(e){var t=this;this.allData=[];var n,r=this.props,o=r.onRequest,a=r.onFailure,i=r.responseType,c=r.prompt,s=r.onSuccess,u={client_id:r.clientId,cookie_policy:r.cookiePolicy,login_hint:r.loginHint,hosted_domain:r.hostedDomain,discoveryDocs:r.discoveryDocs,ux_mode:r.uxMode,redirect_uri:r.redirectUri,scope:"https://www.googleapis.com/auth/contacts.other.readonly",access_type:r.accessType};"code"===i&&(u.access_type="offline"),e&&e.preventDefault(),this.state.disabled||(n=function(){var e=window.gapi.auth2.getAuthInstance(),n={prompt:c};o(),"code"===i?e.grantOfflineAccess(n).then((function(e){return s(e)}),(function(e){return a(e)})):e.signIn(n).then((function(e){return t.handleImportContacts(e)}),(function(e){return a(e)}))},window.gapi.load("auth2",(function(){window.gapi.auth2.getAuthInstance()?n():window.gapi.auth2.init(u).then(n)})))}},{key:"render",value:function(){var e,t=this,n=(f=this.props).tag,r=f.type,o=f.className,a=f.disabledStyle,i=f.buttonText,c=f.children,s=f.theme,u=f.icon,l=this.state.disabled||this.props.disabled;if(e=f.render)return e({onClick:this.signIn});var p={backgroundColor:"dark"===s?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===s?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},f={cursor:"pointer",opacity:.9};s={cursor:"pointer",backgroundColor:"dark"===s?"#3367D6":"#eee",color:"dark"===s?"#fff":"rgba(0, 0, 0, .54)",opacity:1},p=l?Object.assign({},p,a):t.state.active?Object.assign({},p,s):t.state.hovered?Object.assign({},p,f):p;return b.a.createElement(n,{onMouseEnter:function(){return t.setState({hovered:!0})},onMouseLeave:function(){return t.setState({hovered:!1,active:!1})},onMouseDown:function(){return t.setState({active:!0})},onMouseUp:function(){return t.setState({active:!1})},onClick:this.signIn,style:p,type:r,disabled:l,className:o},[u&&b.a.createElement(d,{key:1,active:this.state.active}),b.a.createElement(h,{icon:u,key:2},c||i)])}}])&&s(t.prototype,n),e}());g.defaultProps={type:"button",tag:"button",buttonText:"Import from Gmail",accessType:"online",prompt:"consent",cookiePolicy:"single_host_origin",uxMode:"popup",disabled:!1,maxResults:999,disabledStyle:{opacity:.6},icon:!0,theme:"light",onRequest:function(){},jsSrc:"https://apis.google.com/js/api.js"};var m=g;n.d(t,"default",(function(){return m}))}],t.c=r,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(t){return e[t]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4);function t(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n,r}));