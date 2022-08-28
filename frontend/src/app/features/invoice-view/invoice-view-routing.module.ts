import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { InvoiceViewComponent } from './invoice-view.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceViewComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'INVOICE_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceViewRoutingModule {}
