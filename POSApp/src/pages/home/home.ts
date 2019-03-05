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
// <<<<<<< HEAD
//     this.fdatabase.database.ref('/payments/7k0x90oIGPVoyHF78Enu7u4DAGT2').once('value').then(function(snapshot) 
//     {
//       //console.log(snapshot.val());
//       var maxAmount = 0;
//       for(var id in snapshot.val()){
//         //console.log(id);
//         if(snapshot.child(id).val().amount > maxAmount){
//           maxAmount = snapshot.child(id).val().amount;
//         }
//       }
//       //console.log(maxAmount);
// =======

//     this.fdatabase.database.ref('/payments/7k0x90oIGPVoyHF78Enu7u4DAGT2').once('value')
//       .then(snapshot => {
      
//         snapshot.forEach( itemSnap => {
//           console.log(itemSnap.val());
//           this.payments.push(itemSnap.val());
//         });
//         console.log(this.payments);
// >>>>>>> a4b8331f5e89fdcfd4960207ff33f255fc94ad8c
//     });

	}

    host()
    {
    	this.navCtrl.push('HostTabPage');
    }
  

}