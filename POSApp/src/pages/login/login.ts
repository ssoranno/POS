import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

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
  Role:number;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
  }

  async login(){
    console.log(this.account.email);
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email,this.account.password);
      console.log("result",result);
      if(result){
        //console.log(result.user.uid)
        this.fdatabase.database.ref('Users/'+result.user.uid).once('value')
        .then(snapshot => {
          this.Role = snapshot.val().Role;
          console.log(this.Role);
          if(this.Role == 1){
            this.navCtrl.setRoot('AdminPage');
          } else if(this.Role == 2){
            this.navCtrl.setRoot('ServerPage');
          } else if(this.Role == 3){
            this.navCtrl.setRoot('HostTabPage');
          } else{
            this.navCtrl.setRoot('HomePage');
          }
        });
      }
    } catch (e){
      console.log("Error:")
      console.dir(e);
    }
  }

}
