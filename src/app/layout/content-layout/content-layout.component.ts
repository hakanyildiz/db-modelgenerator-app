import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '@app/services/auth.service';
import { environment } from '@env';
import { User } from '@shared/models/User';
import { KeycloakService } from 'keycloak-angular';
import { Role } from '@shared/models/Role';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, OnDestroy {

  public appName: string = environment.APP_NAME;
  mobileQuery: MediaQueryList;
  logoSrc: any = 'assets/logo.png';
  defaultUserLogoSrc: any = 'assets/default-user.png';

  appSideNav: any;
  user: User = {};

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private authService: AuthService,
    private keycloakService: KeycloakService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (environment.IS_MOCK) {
      this.user = {
        isAdmin: true,
        fullName: 'Full Name Here',
        username: 'Mock User',
        avatarUrl: this.defaultUserLogoSrc
      }
    } else {
      this.initUser();
    }
  }

  initUser(): void {
    if (this.keycloakService.isLoggedIn()) {
      if (this.authService.currentUserIsNull()) {
        const tokenParsed: any = this.keycloakService.getKeycloakInstance().tokenParsed;
        this.user = {
          username: tokenParsed.preferred_username,
          fullName: tokenParsed.name,
          email: tokenParsed.email,
          resource_access: tokenParsed.resource_access,
          userGroups: tokenParsed.groups.map((group: string) => group.substring(1)).join(),
          avatarUrl: 'http://resimler/' + tokenParsed.preferred_username.substr(3) + '.jpg',
          isAdmin: this.keycloakService.isUserInRole(Role.Admin)
        };
        this.authService.setCurrentUser(this.user);
      } else {
        this.user = this.authService.currentUserValue;
      }
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  logout() {
    this.keycloakService.logout();
  }


}
