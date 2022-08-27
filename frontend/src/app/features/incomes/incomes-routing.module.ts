import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { IncomesComponent } from './incomes.component';

const routes: Routes = [
  {
    path: '',
    component: IncomesComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'INCOMES_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomesRoutingModule {}
