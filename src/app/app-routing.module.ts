import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAuthenticationGuard } from '@app/guards/keycloak-auth.guards';
import { Role } from '@shared/models/Role';
import { AuthLayoutComponent } from 'app/layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from 'app/layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ContentLayoutComponent,
    data: { roles: [Role.User, Role.Admin] },
    // after keycloak ready, uncomment below
    // canActivate: [CanAuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'admin',
    component: ContentLayoutComponent,
    data: { roles: [Role.Admin] },
    // after keycloak ready, uncomment below
    // canActivate: [CanAuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'not-authorized',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Fallback when no prior routes is matched
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
