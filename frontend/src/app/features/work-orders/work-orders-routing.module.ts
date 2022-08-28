import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { WorkOrdersComponent } from './work-orders.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrdersComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'WORK_ORDERS_VIEW',
    },
  },
  {
    path: 'create',
    loadChildren: () =>
      import(
        '@features/work-order-create-edit/work-order-create-edit.module'
      ).then((m) => m.WorkOrderCreateEditModule),
  },
  {
    path: 'edit/:workOrderOID',
    loadChildren: () =>
      import(
        '@features/work-order-create-edit/work-order-create-edit.module'
      ).then((m) => m.WorkOrderCreateEditModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrdersRoutingModule {}
