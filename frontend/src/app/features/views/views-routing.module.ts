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
        path: 'buyers',
        loadChildren: () =>
          import('../views/buyers/buyers.module').then((m) => m.BuyersModule),
      },
      {
        path: 'countries',
        loadChildren: () =>
          import('../views/countries/countries.module').then(
            (m) => m.CountriesModule
          ),
      },
      {
        path: 'cities',
        loadChildren: () =>
          import('../views/cities/cities.module').then((m) => m.CitiesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
