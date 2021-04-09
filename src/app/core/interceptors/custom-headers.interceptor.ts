import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '@app/services/auth.service';

@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!environment.IS_MOCK) {

      console.log('girdi');

      const isApiUrl = request.url.startsWith(environment.API_BASE_PATH);
      const isLoggedIn = this.keycloakService.isLoggedIn() && !this.keycloakService.isTokenExpired();

      if (isApiUrl && isLoggedIn) {
        const user = this.authService.currentUserValue;
        request = request.clone({
          setHeaders: {
            CurrentUserName: user.username || '',
            CurrentUserGroups: user.userGroups || ''
            // .. maybe add custom user attibutes to header
            // what you desire
          }
        });
      }

    }



    return next.handle(request);
  }
}
