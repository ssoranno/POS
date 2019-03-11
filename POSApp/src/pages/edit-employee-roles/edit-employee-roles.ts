import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the EditEmployeeRolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-employee-roles',
  templateUrl: 'edit-employee-roles.html',
})
export class EditEmployeeRolesPage {
  userNames = [];
  loadedUserNames = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.fdatabase.database.ref('Users').once('value')
        .then(snapshot => {
          let userNames = [];
          snapshot.forEach(user => {
            userNames.push(user.val().name);
          });
          this.userNames = userNames;
          this.loadedUserNames = userNames;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeeRolesPage');
  }

  initializeItems(): void {
    this.userNames = this.loadedUserNames;
  }

  getEmployee(searchbar){
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.userNames = this.userNames.filter((v) => {
      if(v && q) {
        if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q);
  }

  editRole(name){
    console.log(name);
    this.navCtrl.push('EditRolesPage',{
      Name: name
    });
  }

}
