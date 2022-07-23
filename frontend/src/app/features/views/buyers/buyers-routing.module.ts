import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyersComponent } from './buyers.component';

const routes: Routes = [{ path: '', component: BuyersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyersRoutingModule {}
