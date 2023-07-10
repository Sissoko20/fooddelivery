import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsCakePage } from './details-cake.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsCakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsCakePageRoutingModule {}
