import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from '@modules/dashboard/dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DbConnectComponent } from './components/db-connect/db-connect.component';
import { FormDbConnectComponent } from './components/form-db-connect/form-db-connect.component';
import { FormDbGeneratemodelComponent } from './components/form-db-generatemodel/form-db-generatemodel.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DbConnectComponent,
    FormDbConnectComponent,
    FormDbGeneratemodelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
