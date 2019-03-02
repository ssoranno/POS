import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EmployeeRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-register',
  templateUrl: 'employee-register.html',
})
export class EmployeeRegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  register(){
    this.navCtrl.push('EditEmployeeRolesPage');
  }

  editRole(){
    this.navCtrl.push('NewUserPage');
  }

}
