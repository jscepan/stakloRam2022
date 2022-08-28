import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePermissionGuard } from 'src/app/core/guards/base-permission.guard';
import { AppSettingsComponent } from './app-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AppSettingsComponent,
    canActivate: [BasePermissionGuard],
    data: {
      permission: 'SETTINGS_VIEW',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
