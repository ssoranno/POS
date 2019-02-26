import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

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
  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    this.uid = navParams.get('uid');
    console.log("HOMEUID:",this.uid);
  }

  num: number;

  ionViewDidLoad() {

    // useful info about shapshots: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot

    console.log('ionViewDidLoad HomePage');
    //console.log(this.fdatabase.database.ref('/payments/7k0x90oIGPVoyHF78Enu7u4DAGT2').orderByValue());
    this.fdatabase.database.ref('/payments/7k0x90oIGPVoyHF78Enu7u4DAGT2').once('value').then(function(snapshot) {
      console.log(snapshot.val());
      var maxAmount = 0;
      for(var id in snapshot.val()){
        console.log(id);
        if(snapshot.child(id).val().amount > maxAmount){
          maxAmount = snapshot.child(id).val().amount;
        }
      }
      console.log(maxAmount);
      //console.log(snapshot)
  });
  }
  pay(){
    this.navCtrl.push('PayPage', { data:this.num, data2:this.uid });
  }

}
