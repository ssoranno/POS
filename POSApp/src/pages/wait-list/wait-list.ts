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
     this.refreshWaitList();

  }

   ionViewDidEnter(){
    console.log('ionViewDidEnter AdminTablesPage');
    this.refreshWaitList();
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

refreshWaitList()
{
  this.fdatabase.database.ref('WaitList').once('value').then(snapshot =>{
    snapshot.forEach(itemSnap => {
      var ind = itemSnap.val().email;
      var found = false;
      for (var i =0; i<this.waitList.length; i++)
      {
        if (this.waitList[i].email == ind)
        {
          found = true;
        }
      }
      if (found==false)
      {
        this.waitList.push(itemSnap.val());
      }
    });
  });

  }

}
