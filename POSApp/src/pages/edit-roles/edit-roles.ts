import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the EditRolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-roles',
  templateUrl: 'edit-roles.html',
})
export class EditRolesPage {
  employeeName = "";
  employeeRole = 0;
  newRole;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    this.employeeName = navParams.get('Name');
    console.log(this.employeeName);
    this.fdatabase.database.ref('Users').once('value')
        .then(snapshot => {
          snapshot.forEach(user => {
            console.log(user.val());
            if(user.val().name.toLowerCase() == this.employeeName.toLowerCase()){
              this.employeeRole = user.val().Role;
            }
          });
        });
  }

  ionViewDidLoad() {
  }

  changeRole(){
    console.log(this.newRole);
    this.fdatabase.database.ref('Users').orderByChild('name').equalTo(this.employeeName).once("child_added", snapshot =>{
      snapshot.ref.update({ Role: this.newRole});
    });
  }


}
