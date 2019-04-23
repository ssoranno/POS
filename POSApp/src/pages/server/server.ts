import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { WelcomePage } from '../welcome/welcome';
import { AngularFireDatabase} from '@angular/fire/database';



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

  ticketList = [];
  uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private fdatabase: AngularFireDatabase) {

     var user = this.afAuth.auth.currentUser;
     console.log(this.afAuth.auth.currentUser);
    this.uid = user.uid;

  }

  refreshTickets(){
    this.fdatabase.database.ref('Tickets/'+this.uid).once('value').then(snapshot => {
      let tickets = [];
      snapshot.forEach(ticket => {
        if(ticket.child('isOpen').val() == true){
          tickets.push(ticket);
        }
      });
      this.ticketList = tickets;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerPage');
  }

  ionViewDidEnter(){
    this.refreshTickets();
  }

  newTicket(){
    this.navCtrl.push('ChooseTablePage');
  }

  getTickets(){
    this.navCtrl.push('TicketListPage');
  }

  reviewTicket(ticketId){
    console.log(ticketId);
    this.navCtrl.push('ReviewTicketPage', {tid:ticketId});
  }

  logout() {
    this.afAuth.auth.signOut().then(func => {
      this.navCtrl.setRoot(WelcomePage);
      //this.navCtrl.pop();
    }).catch(error => {
      console.log(error);
    });
  }

  condition(tableStatus: string)
    {
      if (tableStatus == "Complete"){
        return false;
      }
      else{
        return true;
      }
    }

}
