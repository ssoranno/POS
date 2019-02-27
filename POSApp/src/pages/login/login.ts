import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(){
    console.log(this.account.email);
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email,this.account.password);
      console.log("result",result);
      if(result){
        //console.log(result.user.uid)
        this.navCtrl.setRoot('HomePage');
        /*this.navCtrl.setRoot('HomePage', {
          uid: result.user.uid
        });*/
      }
    } catch (e){
      console.log("Error:")
      console.dir(e);
    }
  }

}
