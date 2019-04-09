import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';

import{ EmployeeItem } from '../../models/employee-item/employee-item.interface';

/**
 * Generated class for the AdminEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-employee',
  templateUrl: 'admin-employee.html',
})
export class AdminEmployeePage {

	empList: Array <EmployeeItem>=[];
	tempList: Array <EmployeeItem>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdatabase: AngularFireDatabase, public actionSheetCtrl: ActionSheetController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEmployeePage');
    this.refreshEmployeeList();
  }

  ionViewDidEnter()
  {
  	this.refreshEmployeeList();
  	this.tempList=this.empList;
  }

  register(){
    this.navCtrl.push('NewUserPage');
  }

  refreshEmployeeList()
  {
  	var i =0;
  	var found = false;
    this.fdatabase.database.ref('Users').once('value').then(snapshot =>{
      snapshot.forEach(itemSnap=>{
      	for (var j =0; j<this.empList.length; j++)
      	{
	        if (itemSnap.key == this.empList[j].uid)
	        {
	        	found = true;

	        }
    	}
    	if (found == false)
    	{
    		//console.log(itemSnap.val());
    		this.empList.push(itemSnap.val());
    		this.tempList.push(itemSnap.val());
	        this.empList[i].uid = itemSnap.key;
	        i++;
    	}
      });
    });
    
  }
  initializeItems(): void {
    	this.tempList=this.empList;
  }

  getEmployee(searchbar){
    this.initializeItems();
    //console.log(this.tempList);
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    else{
	    this.tempList = this.tempList.filter((v) => {
	      if(v.name && q) {
	        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
	          return true;
	        }
	        return false;
	      }
	    });
	}
    //console.log(q);
  }

  presentActionSheet(e: string){
  	let actionSheet = this.actionSheetCtrl.create({
     title: 'Change Roles',
     buttons: [
       {
         text: 'Admin',
         handler: () => {
           this.fdatabase.database.ref('Users').orderByChild('name').equalTo(e).once("child_added", snapshot =>{
      		snapshot.ref.update({ Role: Number(1)});});
         }
       },
       {
         text: 'Server',
         handler: () => {
           this.fdatabase.database.ref('Users').orderByChild('name').equalTo(e).once("child_added", snapshot =>{
      		snapshot.ref.update({ Role: Number(2)});});
         }
       },
       {
         text: 'Host',
         handler: () => {
           this.fdatabase.database.ref('Users').orderByChild('name').equalTo(e).once("child_added", snapshot =>{
      		snapshot.ref.update({ Role: Number(3)});});
         }
       },
       {
         text: 'Delete',
         handler: () => {
           console.log('delete');
         }
       }
     ]
   });

   actionSheet.present();
 }

}
