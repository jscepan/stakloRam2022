import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
  },
  {
    path: 'create',
    component: ServicesComponent,
    loadChildren: () =>
      import('@features/services-edit/service-edit.module').then(
        (m) => m.ServiceEditModule
      ),
  },
  {
    path: 'edit/:serviceOID',
    component: ServicesComponent,
    loadChildren: () =>
      import('@features/services-edit/service-edit.module').then(
        (m) => m.ServiceEditModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
