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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
