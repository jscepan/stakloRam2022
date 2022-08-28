import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { BuyersComponent } from './buyers.component';

const routes: Routes = [
  {
    path: '',
    component: BuyersComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'BUYERS_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyersRoutingModule {}
