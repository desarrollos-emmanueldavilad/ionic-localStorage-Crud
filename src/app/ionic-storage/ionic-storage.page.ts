import { Component, OnInit, ViewChild } from '@angular/core';
import { Item, StorageService } from '../services/storage.service';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ionic-storage',
  templateUrl: './ionic-storage.page.html',
  styleUrls: ['./ionic-storage.page.scss'],
})
export class IonicStoragePage implements OnInit {
items: Item[] = [];
@ViewChild('mylist', {static: true})mylist;

newItem: Item = <Item>{};

  constructor(private sService: StorageService,
     private plt:Platform, 
     private toastCOntroller: ToastController) {
    this.plt.ready().then(()=>{
      this.loadItems();
    });
   }

  loadItems(){
    this.sService.getItems().then(items =>{
      this.items = items;
    })
  }

  ngOnInit() {
  }

  addItem(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.sService.addItem(this.newItem).then(item =>{
      this.newItem = <Item>{}
      this.showToast('Item added');
      this.loadItems();
    })
  }

  async showToast(msg){
    const toast = await this.toastCOntroller.create({
      message: msg,
      duration: 1500
    })
    toast.present();
  }

  updateItem(item:Item){
    item.title = `Updated: ${item.title}`;
    item.modified = Date.now();

    this.sService.update(item).then(item=>{
      this.showToast('Item updated!');
      alert('updated');
      this.loadItems();
    })
  }

  deleteItem(item:Item){
    this.sService.delete(item.id).then(item=>{
      this.showToast('Item removed!');
      alert('delete') // fix or sliding is stuck afterwards
      this.loadItems();
    })
  }
 

}
