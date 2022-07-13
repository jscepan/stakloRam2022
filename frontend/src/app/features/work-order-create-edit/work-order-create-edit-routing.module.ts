import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrderCreateEditComponent } from './work-order-create-edit.component';

const routes: Routes = [{ path: '', component: WorkOrderCreateEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceCreateEditRoutingModule {}
