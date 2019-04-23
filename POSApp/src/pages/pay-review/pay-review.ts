import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the PayReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-review',
  templateUrl: 'pay-review.html',
})
export class PayReviewPage {
  ticketID;
  foodList = [];
  OrderTotal;
  tableNumber;
  uid;
  date;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    this.ticketID = this.navParams.get('tid');
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    console.log(this.ticketID);
    console.log(this.uid);
    this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID).once('value').then(snapshot =>{
      this.OrderTotal = snapshot.val().OrderTotal;
      this.tableNumber = snapshot.val().TableNumber;
      this.date=snapshot.val().Date;
      let foods = [];
      snapshot.child('FoodIDs').forEach(fid => {
        this.fdatabase.database.ref('Food/'+fid.val().id).once('value').then(foodInfo => {
          foods.push(foodInfo.val());
        });
      });
      this.foodList = foods;
    });
    this.fdatabase.database.ref('Users/'+this.uid).once('value').then(snapshot =>{
      this.user=snapshot.val().name;
    })
  }

  closeTicket(){
    this.navCtrl.push('SubmitPaymentPage', {tid:this.ticketID, orderTotal:this.OrderTotal});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayReviewPage');
  }

}
