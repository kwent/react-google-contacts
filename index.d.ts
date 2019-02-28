// Type definitions for react-google-contacts v0.0.1
// Project: https://github.com/kwent/react-google-contacts
// Definitions by: Ruslan Ibragimov <https://github.com/IRus>
import {Component, ReactNode, CSSProperties} from 'react';

export as namespace ReactGoogleContacts;

interface AuthResponse {
  readonly access_token: string;
  readonly id_token: string;
  readonly login_hint: string;
  readonly expires_in: number;
  readonly first_issued_at: number;
  readonly expires_at: number;
}

interface BasicProfile {
  getId(): string;
  getEmail(): string;
  getName(): string;
  getGivenName(): string;
  getFamilyName(): string;
  getImageUrl(): string;
}

// Based on https://developers.google.com/identity/sign-in/web/reference
export interface GoogleContactsResponse {
  getBasicProfile(): BasicProfile;
  getAuthResponse(): AuthResponse;
  getGrantedScopes(): string;
  getHostedDomain(): string;
  getId(): string;
  hasGrantedScopes(scopes: string): boolean;
  disconnect(): void;
  grantOfflineAccess(options: GrantOfflineAccessOptions): Promise<GoogleContactsResponseOffline>;
  signIn(options: SignInOptions): Promise<any>;
  grant(options: SignInOptions): Promise<any>;
}

interface GrantOfflineAccessOptions {
  readonly redirect_uri?: string;
}

interface SignInOptions {
  readonly app_package_name?: string;
  readonly fetch_basic_profile?: boolean;
  readonly prompt?: string;
}

export interface GoogleContactsResponseOffline {
  readonly code: string;
}

export interface GoogleContactsProps {
  readonly onSuccess: (response: GoogleContactsResponse | GoogleContactsResponseOffline) => void,
  readonly onFailure: (error: any) => void,
  readonly clientId: string,
  readonly jsSrc?: string,
  readonly onRequest?: () => void,
  readonly buttonText?: string,
  readonly className?: string,
  readonly redirectUri?: string,
  readonly cookiePolicy?: string,
  readonly loginHint?: string,
  readonly hostedDomain?: string,
  readonly prompt?: string,
  readonly responseType?: string,
  readonly children?: ReactNode,
  readonly style?: CSSProperties,
  readonly tag?: string,
  readonly disabled?: boolean;
  readonly uxMode?: string;
  readonly disabledStyle?: CSSProperties;
  readonly type?: string;
  readonly accessType?: string;
  readonly render?: (props?: { onClick: () => void }) => JSX.Element;
}

export class GoogleContacts extends Component<GoogleContactsProps, {}> {
  public signIn(e?: Event): void;
}

export default GoogleContacts;
