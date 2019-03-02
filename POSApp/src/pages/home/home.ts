import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { resolveDefinition } from '@angular/core/src/view/util';

//import { FirebaseListObservable } from '@angular/fire/database/observable';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  payments: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.fdatabase.database.ref('/payments/7k0x90oIGPVoyHF78Enu7u4DAGT2').once('value')
      .then(snapshot => {
      
        snapshot.forEach( itemSnap => {
          console.log(itemSnap.val());
          this.payments.push(itemSnap.val());
        });
        console.log(this.payments);
    });
  }

}