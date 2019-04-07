import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { WelcomePage } from '../welcome/welcome';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  employees() {
    console.log("Employee");
    this.navCtrl.push('AdminEmployeePage');
  }

  menu() {
    console.log("menu");
    this.navCtrl.push('MenuOptionsPage');
  }

  tables() {
    console.log("Table");
    this.navCtrl.push('AdminTablesPage');
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
