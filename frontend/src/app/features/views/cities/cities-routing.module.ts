import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { CitiesComponent } from './cities.component';

const routes: Routes = [
  {
    path: '',
    component: CitiesComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'CITIES_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitiesRoutingModule {}
