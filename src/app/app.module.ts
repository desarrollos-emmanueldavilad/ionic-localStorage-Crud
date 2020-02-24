import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage'
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { dbConfig } from './services/storage.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
  IonicModule.forRoot(),
  NgxIndexedDBModule.forRoot(dbConfig),
  AppRoutingModule,
  
IonicStorageModule.forRoot(
  {
    name: 'mydbStorage',
driverOrder: ['indexeddb', 'sqlite', 'websql']
//driverOrder: ['sqlite','indexeddb', 'websql']
  }
),],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
