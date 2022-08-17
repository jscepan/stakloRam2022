import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [
  { path: '', component: InvoicesComponent },
  {
    path: 'create',
    loadChildren: () =>
      import('@features/invoice-create-edit/invoice-create-edit.module').then(
        (m) => m.InvoiceCreateEditModule
      ),
  },
  {
    path: 'edit/:invoiceOID',
    loadChildren: () =>
      import('@features/invoice-create-edit/invoice-create-edit.module').then(
        (m) => m.InvoiceCreateEditModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
