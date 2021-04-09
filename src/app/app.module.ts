import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';

import { environment } from '@env';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AuthLayoutComponent, ContentLayoutComponent, FooterComponent, NavComponent } from './layout';
import { CookieService } from 'ngx-cookie-service';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // core & shared
    CoreModule,
    SharedModule.forRoot(),

    // app
    AppRoutingModule,

    // keycloak
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
    CookieService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // comment boostrap property when keycloak conf completed & ready to use
  bootstrap: [AppComponent]
})
export class AppModule {};

/**
 * Uncomment AppModule at below when keycloak conf completed & ready to use
 */
/*
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    const { keycloakOptions } = environment;

    keycloakService
      .init(keycloakOptions)
      .then(() => {
        console.log('[ngBoostrap] boostrap app');
        appRef.bootstrap(AppComponent);
      })
      .catch(error => {
        console.error('[ngBoostrap] init Keycloak Failed', error);
      })

  }
}
*/
