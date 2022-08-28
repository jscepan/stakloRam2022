import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'USERS_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitiesRoutingModule {}
