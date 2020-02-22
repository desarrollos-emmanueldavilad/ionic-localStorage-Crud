import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const ITEMS_KEY = 'My-items'

export interface Item{
  id: number,
  title: string,
  value: string,
  modified: number,
}

@Injectable({
  providedIn: 'root'
})


export class StorageService {


  constructor(private storage: Storage) { }
//create
  addItem(item: Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
      if(items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, [item]);

      }else{
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }
//read
  getItems(): Promise<Item[]>{
return this.storage.get(ITEMS_KEY);
  }

  //update
  update(item:Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
      if(!items || items.length === 0){
        return null
      }
      let newItems: Item[]= [];
      for (let i of items){
        if(i.id === item.id){
          newItems.push(item)
        }else{
          newItems.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newItems);
    })
    }

  //delete

  delete(id:number): Promise<Item>{
    return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
      if(!items || items.length === 0){
        return null
      }
      let toKeep: Item[] = [];

      for (let i of items){
        if(i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
