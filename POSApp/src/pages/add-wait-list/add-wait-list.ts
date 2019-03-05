import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WaitListItem } from '../../models/wait-list-item/wait-list-item.interface';
import {AngularFireDatabase} from '@angular/fire/database';
/**
 * Generated class for the AddWaitListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-wait-list',
  templateUrl: 'add-wait-list.html',
})
export class AddWaitListPage {

	waitListItem = {} as WaitListItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWaitListPage');
  }

  addItem(waitListItem :WaitListItem)
  {
  	console.log(waitListItem);
  	this.fdatabase.database.ref('WaitList').push({
  		name: this.waitListItem.personName,
  		partySize: Number(this.waitListItem.partySize),
  		email: this.waitListItem.email
  	});
  	this.waitListItem = {} as WaitListItem;

  	this.navCtrl.pop();
  }

}
