import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { InvoiceCreateEditComponent } from './invoice-create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceCreateEditComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'INVOICE_CREATE',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceCreateEditRoutingModule {}
