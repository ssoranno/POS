import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the NewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {

  account: { name: string, email: string, password: string, role: number } = {
    name: '',
    email: '',
    password: '',
    role: 0
  };

  /*userInfo: { name:string, Role:number } = {
    name: '',
    Role: 1
  };*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  async register(){
    console.log(this.account.email);
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.account.email,this.account.password);
      console.log(result.user.uid);
      //this.userInfo.name = this.account.name;
      this.fdatabase.database.ref('/Users/'+result.user.uid).set({
        name: this.account.name,
        Role: this.account.role
      });
      //this.signedup = "Signed up!";
    } catch (e){
      console.dir(e);
    }
  }

}