import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';

import { WaitListItem } from '../../models/wait-list-item/wait-list-item.interface';
import { AddWaitListPage } from '../add-wait-list/add-wait-list';

/**
 * Generated class for the WaitListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wait-list',
  templateUrl: 'wait-list.html',
})
export class WaitListPage {

  waitList: Array <WaitListItem> =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private fdatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad WaitListPage');

	    this.fdatabase.database.ref('WaitList').orderByChild('personName').once('value').then(snapshot =>{
	      snapshot.forEach(itemSnap => {
	        console.log(itemSnap.val());
	        this.waitList.push(itemSnap.val());
	      });
	  });
  }


navigateToAddWaitList()
{
  	this.navCtrl.push(AddWaitListPage);
}


clearWaitListItem(personName: string)
{
	this.fdatabase.database.ref('WaitList').orderByChild('name').equalTo(personName).once("child_added" , snapshot =>
	{
	  snapshot.ref.remove();
	});
}

}
