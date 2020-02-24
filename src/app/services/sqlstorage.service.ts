import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';



export interface Item {
  id: number;
  title: string;
  value: string;
  modified: number;
}

@Injectable({
  providedIn: 'root'
})


export class SqlstorageService {

  android = this.platform.is("android");
  mobile = this.platform.is("android") || this.platform.is('ios');
  browser =
    navigator.userAgent.indexOf("Chrome") != -1 ||
    navigator.userAgent.indexOf("Safari") != -1 ||
    navigator.userAgent.indexOf("Firefox") != -1 ||
    navigator.userAgent.indexOf("Opera");

  constructor(
    private storage: Storage,
    public platform: Platform,
  ) {

  }

  addItem(item: Item) {
    if (this.browser === true) {
      return this.storage.add("__mydbStorage", {
        id: item.id,
        title: item.title,
        value: item.value,
        modified: item.modified,
      });
    }
  }


  getItemUnic(){
    return this.storage.get('_mydbStorage');
  }

  //update
  update(item: Item): Promise<any> {
    return this.storage.get("__mydbStorage").then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: Item[] = [];
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set("__mydbStorage", newItems);
    });
  }
  

  //delete

  delete(id: number): Promise<Item> {
      return this.storage.get("__mydbStorage").then((items: Item[]) => {
        if (!items || items.length === 0) {
          return null;
        }
        let toKeep: Item[] = [];
  
        for (let i of items) {
          if (i.id !== id) {
            toKeep.push(i);
          }
        }
        return this.storage.set("__mydbStorage", toKeep);
      });
    }
}

