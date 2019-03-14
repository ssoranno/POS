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
    console.log("employee");
    this.navCtrl.push('EmployeeRegisterPage');
  }

  menu() {
    console.log("menu");
    this.navCtrl.push('MenuOptionsPage');
  }

  tables() {
    console.log("table");
    //this.navCtrl.push('ServerPage');
  }

}
