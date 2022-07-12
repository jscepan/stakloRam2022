import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceEditComponent } from './service-edit.component';

const routes: Routes = [{ path: '', component: ServiceEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceEditRoutingModule {}
