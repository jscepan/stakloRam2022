import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { DebtViewComponent } from './debt-view.component';

const routes: Routes = [
  {
    path: '',
    component: DebtViewComponent,
    // canActivate: [BasePermissionGuard],
    data: {
      permission: 'DEBTOR_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtViewRoutingModule {}
