import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';
import { AddTablePage} from '../add-table/add-table';
import{ TableItem } from '../../models/table-item/table-item.interface';
import{ EmployeeItem } from '../../models/employee-item/employee-item.interface';

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
  empList: Array <EmployeeItem>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private fdatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTablesPage');
    var i =0;
    this.refreshTableList();
    this.fdatabase.database.ref('Users').once('value').then(snapshot =>{
      snapshot.forEach(itemSnap=>{
        if (itemSnap.val().Role == "2")
        {
          this.empList.push(itemSnap.val());
          this.empList[i].uid = itemSnap.key;
          i++;
        }
      });
    });
    
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter AdminTablesPage');
    this.refreshTableList();
 
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
        this.tableListSort();
    }).catch(error =>{
      console.log(error);
    });
    
  }
  tableListSort(){
     this.tableList.sort((leftSide, rightSide): number=>{
      if (leftSide.tableNumber<rightSide.tableNumber) return -1;
      if (leftSide.tableNumber>rightSide.tableNumber) return 1;
      return 0;
    });
  }

  assignEmployee(emp: string, tableNum:string){
      console.log(emp);
      console.log(tableNum);

  }
}
