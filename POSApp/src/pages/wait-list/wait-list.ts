import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';

import { WaitListItem } from '../../models/wait-list-item/wait-list-item.interface';
import { AddWaitListPage } from '../add-wait-list/add-wait-list';
import { SMS } from '@ionic-native/sms';


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
  	private fdatabase: AngularFireDatabase, private sms: SMS) {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad WaitListPage');
     this.refreshWaitList();

  }

   ionViewDidEnter(){
    console.log('ionViewDidEnter WaitList');
    this.refreshWaitList();
  }


navigateToAddWaitList()
{
  	this.navCtrl.push(AddWaitListPage);
}


clearWaitListItem(id: string)
{
	var fref = this.fdatabase.database.ref('WaitList/'+ id);
  fref.remove();
  for (let i in this.waitList)
    {
       if (this.waitList[i].id == id)
      {
        this.waitList.splice(Number(i), 1);
      }
    }
}

alertWaiting(phoneNum: string)
{
  this.sms.send(phoneNum, 'Your table is ready. Please arrive in 5 minutes.' );

}

refreshWaitList()
{
  this.fdatabase.database.ref('WaitList').once('value').then(snapshot =>{
    snapshot.forEach(itemSnap => {
      var ind = itemSnap.key;
      var found = false;
      for (var i =0; i<this.waitList.length; i++)
      {
        if (this.waitList[i].id == ind)
        {
          found = true;
        }
      }
      if (found==false)
      {
        var temp : WaitListItem ={
          personName: itemSnap.val().name,
          partySize: itemSnap.val().partySize,
          phoneNum: itemSnap.val().phoneNum,
          id: itemSnap.key  
        }
        this.waitList.push(temp);
      }
    });
  });

  }

}
