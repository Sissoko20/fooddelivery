import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPlatAfricainsPageRoutingModule } from './details-plat-africains-routing.module';

import { DetailsPlatAfricainsPage } from './details-plat-africains.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPlatAfricainsPageRoutingModule
  ],
  declarations: [DetailsPlatAfricainsPage]
})
export class DetailsPlatAfricainsPageModule {}
