import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the TicketListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-list',
  templateUrl: 'ticket-list.html',
})
export class TicketListPage {
  ticketList = [];
  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private fdatabase: AngularFireDatabase) {
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    this.fdatabase.database.ref('Tickets/'+this.uid).once('value').then(snapshot => {
      let tickets = [];
      snapshot.forEach(ticket => {
        tickets.push(ticket);
      });
      this.ticketList = tickets;
    });
  }

  editTicket(ticketId){
    console.log("ticketIDTickList:",ticketId);
    this.navCtrl.push('CreateTicketPage', {num:0,tid:ticketId});
  }

  payTicket(ticketId){
    console.log(ticketId);
    this.navCtrl.push('PayReviewPage', {id:ticketId});
  }

  clearTicket(ticketId){
    console.log(ticketId);
    this.fdatabase.database.ref('Tickets/'+this.uid).orderByKey().equalTo(ticketId).once("child_added" , snapshot =>
    {
      snapshot.ref.remove();
      for (let i in this.ticketList)
      {
        if (this.ticketList[i].key == ticketId)
        {
          this.ticketList.splice(Number(i), 1);
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketListPage');
  }

}
