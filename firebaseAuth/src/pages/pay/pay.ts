import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
import { Stripe } from '@ionic-native/stripe';
import { CardIO } from '@ionic-native/card-io';
import { AngularFireDatabase } from '@angular/fire/database';
import { MyApp } from '../../app/app.component';
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//declare var Stripe;

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  //stripe = Stripe('pk_test_m91z8WAjgeg3sn3MBPIDegev');
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  //card: any;
  price: number;
  arrData = [];
  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe, /*public http: Http*/private cardIO: CardIO, public fdatabase: AngularFireDatabase) {
    this.price = navParams.get('data');
    this.uid = navParams.get('data2');
    console.log("payUID:", this.uid);
    //sconsole.log(this.price);
    /*this.fdatabase.list('/').valueChanges().subscribe(data=>{
      this.arrData = data;
      console.log(this.arrData);
    });*/
    this.fdatabase.database.ref('/username').once('value').then(function(snapshot) {
        console.log(snapshot.val());
    });
  }
  
  ionViewDidLoad() {
    //this.stripe.setPublishableKey('pk_test_m91z8WAjgeg3sn3MBPIDegev');
    /*let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     };*/
     /*this.fdatabase.list('/username').valueChanges().subscribe(data =>{
       console.log(JSON.stringify(data));
     });*/
     //this.fdatabase.database.ref('/username')

    this.cardIO.canScan().then(
      (res: boolean) => {
        if(res){
          let options = {
            requireExpiry: true,
            requireCVV: false,
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
            }
          );
        }
      }
    );
    //this.setupStripe("123456789");
    /*this.stripe.createCardToken(card)
   .then(token => {console.log(token.id);
    console.log("we good");})
   .catch(error => console.error(error));*/
  }

  /*setupStripe(cardNum:string){
    console.log("cnum:",cardNum);
    let elements = this.stripe.elements();
    //elements.cardnumber = cardNum;
    //console.log("pooop");
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
 
    this.card = elements.create('card', { style: style });
    //console.log("Elements:",elements.cardNumber);
    this.card.mount('#card-element');
    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        console.log("got error!!");
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
 
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
 
      // this.stripe.createToken(this.card)
      this.stripe.createToken(this.card).then(token => {
        if (token.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = token.error.message;
        } else {
          console.log("we good");
          console.log(token);
        }
      });
    });
  }*/

  pay() {
    //p = this.price;
    /*this.fdatabase.database.ref(`/payments/${this.uid}`).set({
      amount:this.price,
      token:12345678
    });*/
    this.stripe.setPublishableKey('pk_test_m91z8WAjgeg3sn3MBPIDegev');
    this.stripe.createCardToken(this.cardinfo).then(token => {console.log(token.id);
      console.log(this.uid);
      this.fdatabase.database.ref(`/payments/${this.uid}`).push({
        amount:this.price,
        t:token
      });
    })
    .catch(error => console.dir(error));
    //console.log(payment);
    //this.fdatabase.database.ref(`/payments/${this.uid}`).set(payment);
  }

}
