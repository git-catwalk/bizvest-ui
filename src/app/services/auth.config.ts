import {AuthConfig} from "angular-oauth2-oidc";


export const authConfig: AuthConfig = {
  issuer: 'https://keycloak.bluntsoftware.com/auth/realms/bizvest',
  redirectUri: window.location.origin + "/callback",
  clientId: 'bizvest-spa',
  scope: 'openid profile email roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  logoutUrl: "https://keycloak.bluntsoftware.com/auth/realms/bizvest/protocol/openid-connect/logout"
}
