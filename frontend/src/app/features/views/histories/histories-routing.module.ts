import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { HistoriesComponent } from './histories.component';

const routes: Routes = [
  {
    path: '',
    component: HistoriesComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'HISTORIES_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriesRoutingModule {}
