import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'buyers',
        loadChildren: () =>
          import('@features/settings/buyers/buyers.module').then(
            (m) => m.BuyersModule
          ),
      },
      {
        path: 'application',
        loadChildren: () =>
          import('@features/settings/app-settings/app-settings.module').then(
            (m) => m.AppSettingsModule
          ),
      },
      {
        path: 'countries',
        loadChildren: () =>
          import('@features/settings/countries/countries.module').then(
            (m) => m.CountriesModule
          ),
      },
      {
        path: 'cities',
        loadChildren: () =>
          import('@features/settings/cities/cities.module').then(
            (m) => m.CitiesModule
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
