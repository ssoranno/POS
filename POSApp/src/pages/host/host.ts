import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';
import { AddTablePage} from '../add-table/add-table';
import { AngularFireAuth } from '@angular/fire/auth';
import { WelcomePage } from '../welcome/welcome';

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
  	private fdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  	
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
    for (let i in this.tableList){
      if(this.tableList[i].tableNumber==tableNumber){
        this.tableList[i].tableStatus="Full";
      }
    }
  }

  clearTable(tableNumber: string)
  {
    this.fdatabase.database.ref('Tables').orderByChild('tableNumber').equalTo(tableNumber).once("child_added" , snapshot =>
    {
      snapshot.ref.update({ tableStatus: "Empty"})
      //console.log(this.tableList[Number(tableNumber)-1]);
    });
    for (let i in this.tableList){
        if(this.tableList[i].tableNumber==tableNumber){
          this.tableList[i].tableStatus="Empty";
        }
      }
    }

    condition(tableStatus: string)
    {
      if (tableStatus == "Empty"){
        return false;
      }
      else{
        return true;
      }
    }

    logout() {
    this.afAuth.auth.signOut().then(func => {
      this.navCtrl.setRoot(WelcomePage);
      //this.navCtrl.pop();
    }).catch(error => {
      console.log(error);
    });
  }


}
