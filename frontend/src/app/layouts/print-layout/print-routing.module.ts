import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'invoice-view/:invoiceOID',
    loadChildren: () =>
      import('@features/invoice-view/invoice-view.module').then(
        (m) => m.InvoiceViewModule
      ),
  },
  {
    path: 'work-order-view/:workOrderOID',
    loadChildren: () =>
      import('@features/work-order-view/work-order-view.module').then(
        (m) => m.WorkOrderViewModule
      ),
  },
  {
    path: 'debtor/:buyerOID',
    loadChildren: () =>
      import('@features/views/debt-view/debt-view.module').then(
        (m) => m.DebtViewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
