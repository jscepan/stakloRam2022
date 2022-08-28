import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { WorkOrderCreateEditComponent } from './work-order-create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderCreateEditComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'WORK_ORDER_CREATE',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceCreateEditRoutingModule {}
