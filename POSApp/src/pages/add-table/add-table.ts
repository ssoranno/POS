import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TableItem } from '../../models/table-item/table-item.interface';
import {AngularFireDatabase} from '@angular/fire/database';
/**
 * Generated class for the AddTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-table',
  templateUrl: 'add-table.html',
})
export class AddTablePage {

	tableItem ={} as TableItem;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fdatabase: AngularFireDatabase) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTablePage');
  }

  addTable(tableItem :TableItem)
  {
  	console.log(tableItem);
  	this.fdatabase.database.ref('Tables').push({
  		tableNumber: Number(this.tableItem.tableNumber),
  		tableStatus: "Empty",
      server: " "
  	});
  	this.tableItem = {} as TableItem;

  	this.navCtrl.pop();
  }

}
