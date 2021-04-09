import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminResolver } from '@modules/admin/admin-resolver.service';

import { AdminCustomComponent } from '@modules/admin/pages/admin-custom/admin-custom.component';
import { AdminComponent } from '@modules/admin/pages/admin/admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent
    },
    {
        path: 'custom/:id',
        component: AdminCustomComponent,
        resolve: { view: AdminResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
