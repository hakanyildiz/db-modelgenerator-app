import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: any) => {
      if (err.status === 401) {
        if (!this.keycloakService.isLoggedIn()) {
          this.keycloakService.logout();
        }
      }
      return throwError(err);
    }));
  }
}
