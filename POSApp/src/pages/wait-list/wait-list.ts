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
  	private fdatabase: AngularFireDatabase, private sms: SMS, private ec : EmailComposer) {
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


clearWaitListItem(phoneNum: string)
{
	this.fdatabase.database.ref('WaitList').orderByChild('phoneNum').equalTo(phoneNum).once("child_added" , snapshot =>
	{
	  snapshot.ref.remove();
  });

  for (let i in this.waitList)
    {
       if (this.waitList[i].phoneNum == phoneNum)
      {
        this.waitList.splice(Number(i), 1);
      }
    }
}

alertWaiting(phoneNum: string, carrier: string)
{
  this.sms.send(phoneNum, 'Your table is ready. Please arrive in 5 minutes.' );

//   var addr ="";
//   if (carrier == "Verizon")
//   {
//       addr = phoneNum+'@vtext.com';
//   }

// let email = {
//   to: addr,
//   body: 'How are you? Nice greetings from Leipzig',
//   isHtml: false
// }

// // Send a text message using default options
//   this.ec.open(email);
}

refreshWaitList()
{
  this.fdatabase.database.ref('WaitList').once('value').then(snapshot =>{
    snapshot.forEach(itemSnap => {
      var ind = itemSnap.val().phoneNum;
      var found = false;
      for (var i =0; i<this.waitList.length; i++)
      {
        if (this.waitList[i].phoneNum == ind)
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
