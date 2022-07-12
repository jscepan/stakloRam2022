import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutcomesComponent } from './outcomes.component';

const routes: Routes = [{ path: '', component: OutcomesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutcomesRoutingModule {}
