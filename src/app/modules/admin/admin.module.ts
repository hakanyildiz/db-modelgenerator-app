import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRoutingModule } from '@modules/admin/admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AdminCustomComponent } from '@modules/admin/pages/admin-custom/admin-custom.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminCustomComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
