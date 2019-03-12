import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';
import { AddTablePage} from '../add-table/add-table';
import { ChangeDetectorRef } from '@angular/core';

import{ TableItem } from '../../models/table-item/table-item.interface';
/**
 * Generated class for the HostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-host',
  templateUrl: 'host.html',
})
export class HostPage {

	tableList: Array <TableItem> =[];  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private fdatabase: AngularFireDatabase, private cdr: ChangeDetectorRef) {
  	
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HostPage');
    this.fdatabase.database.ref('Tables').orderByChild('tableNumber').once('value').then(snapshot =>{
      snapshot.forEach(itemSnap => {
        console.log(itemSnap.val());
        this.tableList.push(itemSnap.val());
      });
    });

	
  }

  // navigateToAddTablePage()
  // {
  // 	this.navCtrl.push(AddTablePage);
  // }

  fillTable(tableNumber: string)
  {

    this.fdatabase.database.ref('Tables').orderByChild('tableNumber').equalTo(tableNumber).once("child_added" , snapshot =>
    {
      snapshot.ref.update({ tableStatus: "Full"})
    });
    this.cdr.detectChanges();
  }

  clearTable(tableNumber: string)
  {
    this.fdatabase.database.ref('Tables').orderByChild('tableNumber').equalTo(tableNumber).once("child_added" , snapshot =>
    {
      snapshot.ref.update({ tableStatus: "Empty"})
      //console.log(this.tableList[Number(tableNumber)-1]);
      this.tableList[Number(tableNumber)-1].tableStatus="Empty";
    });
  }


}
