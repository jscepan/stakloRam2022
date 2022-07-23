import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'application',
        loadChildren: () =>
          import('@features/settings/app-settings/app-settings.module').then(
            (m) => m.AppSettingsModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('@features/settings/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'password-change',
        loadChildren: () =>
          import(
            '@features/settings/password-change/password-change.module'
          ).then((m) => m.PasswordChangeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
