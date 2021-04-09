import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

  appName: string = '';
  appDevName: string = '';

  constructor(private router: Router, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.initTitles();
  }

  private initTitles(): void {
    this.appName = environment.APP_NAME;
    this.appDevName = environment.APP_DEV_NAME;
  }

  toRoot(): void {
    // Kullanıcı Authenticate aslinda, ama rol tanimi yok.
    // O yuzden onu uygulamadan atiyoruz.
    this.logout();

    this.router.navigate(['/']);
  }

  private logout(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.logout();
    }
  }
}
