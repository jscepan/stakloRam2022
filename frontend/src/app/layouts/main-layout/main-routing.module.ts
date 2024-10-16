import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('@features/invoices/invoices.module').then(
        (m) => m.InvoicesModule
      ),
  },
  {
    path: 'incomes',
    loadChildren: () =>
      import('@features/incomes/incomes.module').then((m) => m.IncomesModule),
  },
  {
    path: 'outcomes',
    loadChildren: () =>
      import('@features/outcomes/outcomes.module').then(
        (m) => m.OutcomesModule
      ),
  },
  {
    path: 'work-orders',
    loadChildren: () =>
      import('@features/work-orders/work-orders.module').then(
        (m) => m.WorkOrdersModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'views',
    loadChildren: () =>
      import('@features/views/views.module').then((m) => m.ViewsModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@features/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'histories',
    loadChildren: () =>
      import('@features/views/histories/histories.module').then(
        (m) => m.HistoriesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
