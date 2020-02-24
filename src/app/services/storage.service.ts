import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NgxIndexedDBService, DBConfig } from "ngx-indexed-db";
import { Platform } from "@ionic/angular";
const ITEMS_KEY = "My-items";

export interface Item {
  id: number;
  title: string;
  value: string;
  modified: number;
}

export const dbConfig: DBConfig = {
  name: "MyDatabase",
  version: 1,
  objectStoresMeta: [
    {
      store: "otherthing",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "value", keypath: "value", options: { unique: false } },
        { name: "modified", keypath: "modified", options: { unique: false } }
      ]
    }
  ]
};



@Injectable({
  providedIn: "root"
})
export class StorageService {
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
    private dbService: NgxIndexedDBService,
  ) {
  }
  //create
  addItem(item: Item): Promise<any> {
alert('antes de condicion');
    if (this.platform.is('android')) {
    return this.addMobile(item);    
    }
    if (this.browser === true){
      alert('browser')
      return this.addItemBrowser(item);
    }
 
  }


  addMobile(item: Item): Promise<any> {
    alert('device directo')
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, [item]);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
}
  //read
//  getItemsBrowser(): Promise<Item[]> {
//    if (this.browser === true) {
//      return this.dbService.getAll("otherthing");
//    }
 // }

  getItems(): Promise<Item[]>{
    if(this.browser !== true){
      return this.storage.get(ITEMS_KEY);
    }else{
      return this.dbService.getAll("otherthing");
    }
  }

  getItemUnic(){
    return this.storage.get('mydbStorage');
  }

  //update
  update(item: Item): Promise<any> {
  if (this.browser === true) {
    return this.dbService.update("otherthing", {
      title: item.title,
      value: item.value,
      modified: item.modified
    });
  }else{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
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
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }
  }

  //delete

  delete(id: number): Promise<Item> {
    if (this.browser === true) {
      return this.dbService.delete("otherthing", id);
    }else{
      return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
        if (!items || items.length === 0) {
          return null;
        }
        let toKeep: Item[] = [];
  
        for (let i of items) {
          if (i.id !== id) {
            toKeep.push(i);
          }
        }
        return this.storage.set(ITEMS_KEY, toKeep);
      });
    }
}

  //BROWSER INDEXED

  addItemBrowser(item: Item) {
    if (this.browser === true) {
      return this.dbService.add("otherthing", {
        title: item.title,
        value: item.value,
        modified: item.modified
      });
    }
  }

  updateBrowser(item: Item) {
    if (this.browser === true) {
      return this.dbService.update("otherthing", {
        title: item.title,
        value: item.value,
        modified: item.modified
      });
    }
  }

  getAllBrowser(): Promise<Item[]> {
    if (this.browser === true) {
      return this.dbService.getAll("otherthing");
    }
  }

  deleteBrowser(id) {
    if (this.browser === true) {
      return this.dbService.delete("otherthing", id);
    }
  }
}
