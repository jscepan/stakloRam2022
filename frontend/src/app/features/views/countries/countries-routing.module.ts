import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { CountriesComponent } from './countries.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'COUNTRIES_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
