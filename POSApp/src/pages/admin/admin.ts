import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  employees() {
    console.log("Employee");
    this.navCtrl.push('EmployeeRegisterPage');
  }

  menu() {
    console.log("Menu");
    //this.navCtrl.push('ServerPage');
  }

  tables() {
    console.log("Table");
    this.navCtrl.push('AdminTablesPage');
  }

}
