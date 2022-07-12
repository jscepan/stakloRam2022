import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebtViewComponent } from './debt-view.component';

const routes: Routes = [{ path: '', component: DebtViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtViewRoutingModule {}
