import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Stripe } from '@ionic-native/stripe';
import { CardIO } from '@ionic-native/card-io';

/**
 * Generated class for the SubmitPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-payment',
  templateUrl: 'submit-payment.html',
})
export class SubmitPaymentPage {
  ticketID;
  orderTotal;
  uid;

  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase, public stripe: Stripe, private cardIO: CardIO) {
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    this.ticketID = this.navParams.get('tid');
    console.log(this.ticketID);
    this.orderTotal = this.navParams.get('orderTotal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitPaymentPage');
  }

  readCard(){
    this.cardIO.canScan().then(
      (res: boolean) => {
        if(res){
          let options = {
            requireExpiry: true,
            requireCVV: true,
            requirePostalCode: false
          };
          
          this.cardIO.scan(options).then(
            (value) => {
              //document.getElementsByName("cardnumber")
              //this.card.cardNumber = value.cardNumber;
              //console.log(this.card.cardNumber);
              if(value.cardNumber !== null){
                console.log("got here");
                this.cardinfo.number = value.cardNumber;
                console.log(value.cardNumber);
              } 
              this.cardinfo.expMonth = value.expiryMonth;
              this.cardinfo.expYear = value.expiryYear;
              this.cardinfo.cvc = value.cvv;
            }
          );
        }
      }
    );
  }

  pay(){
    this.stripe.setPublishableKey('pk_test_m91z8WAjgeg3sn3MBPIDegev');
    this.stripe.createCardToken(this.cardinfo).then(t => {console.log(t.id);
      console.log(this.uid);
      this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID).update({
        isOpen:false,
        amount:this.orderTotal,
        token:t
      });
    }).then(r => {
      this.paymentProcessed();
    })
    .catch(error => console.dir(error));
  }

  paymentProcessed(){

    this.navCtrl.popToRoot();
  }

}
