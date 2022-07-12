import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebtorsReviewComponent } from './debtors-review.component';

const routes: Routes = [{ path: '', component: DebtorsReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtorsReviewRoutingModule {}
