import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicStoragePage } from './ionic-storage.page';

const routes: Routes = [
  {
    path: '',
    component: IonicStoragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicStoragePageRoutingModule {}
