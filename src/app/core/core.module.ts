import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '@app/guards/module-imports.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanAuthenticationGuard } from '@app/guards/keycloak-auth.guards';
import { AuthenticationInterceptor } from '@app/interceptors/authentication.interceptor';
import { CustomHeadersInterceptor } from '@app/interceptors/custom-headers.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CanAuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeadersInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
