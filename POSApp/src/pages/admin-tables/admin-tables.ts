import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';
import { AddTablePage} from '../add-table/add-table';
import{ TableItem } from '../../models/table-item/table-item.interface';

/*
 * Generated class for the AdminTablesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-tables',
  templateUrl: 'admin-tables.html',
})
export class AdminTablesPage {

  tableList: Array <TableItem> =[];  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private fdatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTablesPage');
    this.refreshTableList();
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter AdminTablesPage');
    this.refreshTableList();
    this.tableListSort();
  }


  navigateToAddTablePage()
  {
  	this.navCtrl.push(AddTablePage);
    
  }

  deleteTable(tableNumber: string){
    this.fdatabase.database.ref('Tables').orderByChild('tableNumber').equalTo(tableNumber).once("child_added" , snapshot =>
    {
      snapshot.ref.remove()
    });
    for (let i in this.tableList)
    {
       if (this.tableList[i].tableNumber == tableNumber)
      {
        this.tableList.splice(Number(i), 1);
      }
    }

    console.log(this.tableList);

  }
  
  refreshTableList()
  {
    this.fdatabase.database.ref('Tables').orderByChild('tableNumber').once('value').then(snapshot =>{
      snapshot.forEach(itemSnap => {
        var ind = itemSnap.val().tableNumber;
        var found = false;
        for (var i =0; i<this.tableList.length; i++)
        {
          if (this.tableList[i].tableNumber == ind)
          {
            found = true;
          }
        }
        if (found==false)
        {
          this.tableList.push(itemSnap.val());
        }
      });
    });

  }
  tableListSort(){
    console.log(this.tableList);
    console.log(this.tableList.length);
     this.tableList.sort((leftSide, rightSide): number=>{
      console.log(leftSide.tableNumber);
      if (leftSide.tableNumber<rightSide.tableNumber) return -1;
      if (leftSide.tableNumber>rightSide.tableNumber) return 1;
      return 0;
    });
  }
}
