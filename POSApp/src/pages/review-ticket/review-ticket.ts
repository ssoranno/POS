import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the ReviewTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-ticket',
  templateUrl: 'review-ticket.html',
})
export class ReviewTicketPage {
  ticketFoods = [];
  ticket;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    this.ticketFoods = this.navParams.get('list');
    console.log("reviewFoods:",this.ticketFoods);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewTicketPage');
  }

  createTicket(){
    var user = this.afAuth.auth.currentUser;
    if(user){
      console.log(user.uid);
    }
  }

  submitTicket(){
    this.createTicket();
    this.navCtrl.popToRoot();
  }

}
