import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { WorkOrderViewComponent } from './work-order-view.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderViewComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'WORK_ORDER_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrderViewRoutingModule {}
