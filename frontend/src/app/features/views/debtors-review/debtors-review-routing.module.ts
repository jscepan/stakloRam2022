import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { DebtorsReviewComponent } from './debtors-review.component';

const routes: Routes = [
  {
    path: '',
    component: DebtorsReviewComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'DEBTORS_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtorsReviewRoutingModule {}
