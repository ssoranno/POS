import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ticketFoods = this.navParams.get('list');
    console.log("reviewFoods:",this.ticketFoods);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewTicketPage');
  }

  submitTicket(){
    this.navCtrl.popToRoot();
  }

}
