import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
//import { Stripe } from '@ionic-native/stripe';
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var Stripe;

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  stripe = Stripe('pk_test_m91z8WAjgeg3sn3MBPIDegev');
  /*cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }*/
  card: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, /*public stripe: Stripe, public http: Http*/) {
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  setupStripe(){
    let elements = this.stripe.elements();
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
 
    this.card.mount('#card-element');
 
    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
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
  }

  //pay() {
    //this.stripe.setPublishableKey('pk_test_m91z8WAjgeg3sn3MBPIDegev');
    //this.stripe.createCardToken(this.cardinfo).then(token => console.log(token.id))
    //.catch(error => console.dir(error));
  //}

}
