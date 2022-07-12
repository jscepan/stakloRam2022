import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'debtors-review',
        loadChildren: () =>
          import('@features/views/debtors-review/debtors-review.module').then(
            (m) => m.DebtorsReviewModule
          ),
      },
      {
        path: 'debtor/:buyerOID',
        loadChildren: () =>
          import('@features/views/debt-view/debt-view.module').then(
            (m) => m.DebtViewModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
