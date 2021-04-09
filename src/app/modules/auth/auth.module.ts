import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
