import { KeycloakOptions } from 'keycloak-angular';

const keycloakOptions: KeycloakOptions = {
  config: {
    realm: '####-REALM',
    url: window['restApiURL'] + '/auth/',
    clientId: window['keycloakClientID']
  },
  initOptions: {
    onLoad: 'login-required',
    checkLoginIframe: false,
    enableLogging: true
  },
  enableBearerInterceptor: true,
  bearerExcludedUrls: ['/assets', '/clients/public'],
  loadUserProfileAtStartUp: false
};

export const environment = {
  production: true,
  APP_NAME: window['appName'],
  APP_DEV_NAME: 'IVR Solutions',
  API_BASE_PATH: window['restApiURL'] + '/api/',
  keycloakOptions,
  PATH: {
    PATH1: 'path1',
    PATH2: 'path2',
    PATH3: 'path3'
  },
  IS_MOCK: false
};
