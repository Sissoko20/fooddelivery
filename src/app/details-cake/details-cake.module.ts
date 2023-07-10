import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsCakePageRoutingModule } from './details-cake-routing.module';

import { DetailsCakePage } from './details-cake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsCakePageRoutingModule
  ],
  declarations: [DetailsCakePage]
})
export class DetailsCakePageModule {}
