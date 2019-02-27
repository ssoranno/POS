import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(){
    console.log(this.account.email);
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.account.email,this.account.password);
      console.log(result);
    } catch (e){
      console.dir(e);
    }
  }
}

