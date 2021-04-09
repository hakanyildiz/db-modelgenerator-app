// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false,
  APP_NAME: window['appName'],
  APP_DEV_NAME: 'IVR Solutions',
  API_BASE_PATH: window['restApiURL'] + '/api/',
  keycloakOptions,
  PATH: {
    DB_CONNECT: 'database/connect',
    DB_GENERATE_MODELS: 'database/generate-models',
    PATH1: 'test'
  },
  IS_MOCK: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
