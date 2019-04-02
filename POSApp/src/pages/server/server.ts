import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the ServerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerPage');
  }

  newTicket(){
    this.navCtrl.push('ChooseTablePage');
  }

  getTickets(){
    this.navCtrl.push('TicketListPage');
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
