import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceViewComponent } from './invoice-view.component';

const routes: Routes = [{ path: '', component: InvoiceViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceViewRoutingModule {}
