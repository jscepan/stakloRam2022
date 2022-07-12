import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintLayoutComponent } from '@layouts/print-layout/print-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('@layouts/main-layout/main-layout.module').then(
        (m) => m.MainLayoutModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'print',
    component: PrintLayoutComponent,
    loadChildren: () =>
      import('@layouts/print-layout/print-layout.module').then(
        (m) => m.PrintLayoutModule
      ),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@layouts/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
