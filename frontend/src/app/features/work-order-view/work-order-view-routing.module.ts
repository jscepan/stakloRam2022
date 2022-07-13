import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrderViewComponent } from './work-order-view.component';

const routes: Routes = [{ path: '', component: WorkOrderViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrderViewRoutingModule {}
