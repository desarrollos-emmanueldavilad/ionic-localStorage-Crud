import { Component, OnInit, ViewChild } from '@angular/core';
import { Item, StorageService } from '../services/storage.service';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ionic-storage',
  templateUrl: './ionic-storage.page.html',
  styleUrls: ['./ionic-storage.page.scss'],
})
export class IonicStoragePage implements OnInit {
items: Item[] = [];
data: any;

@ViewChild('mylist', {static: true})mylist;

newItem: Item = <Item>{};

  constructor(private sService: StorageService,
     private plt:Platform, 
     public storage: Storage,
     private toastCOntroller: ToastController) {
    this.plt.ready().then(()=>{
      this.sService.getItemUnic().then(datos =>{

        this.data = datos;
      });
    });
   }

  loadItems(){
 //   this.sService.getItems().then(items =>{
  this.sService.getItemUnic().then(items =>{

      this.items = items;
    })
  }

  ngOnInit() {

    this.loadItems();
    this.loadItemsBrowser();
  }

  add(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.sService.addItemBrowser(this.newItem).then(item =>{
      this.newItem = <Item>{}
      this.showToast('Item  br');
      this.loadItems();
      this.loadItemsBrowser();
    })
  }

  addMobile(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.sService.addMobile(this.newItem).then(item =>{
      this.newItem = <Item>{}
      this.showToast('Item added');
      this.loadItems();
    })
  }


  driverUsed() {
    console.log("Driver Used: " + this.storage.driver);
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
      this.loadItemsBrowser();

    })
  }

  deleteItem(item:Item){
    this.sService.delete(item.id).then(item=>{
      this.showToast('Item removed!');
      alert('delete') // fix or sliding is stuck afterwards
      this.loadItems();
      this.loadItemsBrowser();

    })
  }


  //indexed


  loadItemsBrowser(){
    this.sService.getAllBrowser().then(items =>{
      this.items = items;
      console.log('browser', items);
    })
  }

  addItemIndex(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.sService.addItemBrowser(this.newItem).then(item =>{
      this.newItem = <Item>{}
      this.showToast('Item added');
      this.loadItems();
    })
  }


  updateItemBrowser(item:Item){
    item.title = `Updated: ${item.title}`;
    item.modified = Date.now();

    this.sService.updateBrowser(item).then(item=>{
      this.showToast('Item updated!');
      alert('updated');
      this.loadItems();
    })
  }

  deleteItemBrowser(item:Item){
    this.sService.deleteBrowser(item.id).then(item=>{
      this.showToast('Item removed!');
      alert('delete') // fix or sliding is stuck afterwards
      this.loadItems();
    })
  }
 

}
