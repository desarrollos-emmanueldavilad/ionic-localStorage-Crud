import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicStoragePageRoutingModule } from './ionic-storage-routing.module';

import { IonicStoragePage } from './ionic-storage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStoragePageRoutingModule
  ],
  declarations: [IonicStoragePage]
})
export class IonicStoragePageModule {}
