import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { OutcomesComponent } from './outcomes.component';

const routes: Routes = [
  {
    path: '',
    component: OutcomesComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'OUTCOMES_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutcomesRoutingModule {}
