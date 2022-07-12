import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../features/auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
  // },
  // {
  //   path: 'create-new-password/:token',
  //   loadChildren: () => import('./create-new-password/create-new-password.module').then((m) => m.CreateNewPasswordModule)
  // },
  // {
  //   path: 'create-account/:token',
  //   loadChildren: () => import('./create-account/create-account.module').then((m) => m.CreateAccountModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
