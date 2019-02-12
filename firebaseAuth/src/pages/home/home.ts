import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uid = navParams.get('uid');
    console.log("HOMEUID:",this.uid);
  }

  num: number;

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  pay(){
    this.navCtrl.push('PayPage', { data:this.num, data2:this.uid });
  }

}
