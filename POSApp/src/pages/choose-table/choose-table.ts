import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the ChooseTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-table',
  templateUrl: 'choose-table.html',
})
export class ChooseTablePage {
  tables = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    console.log("here");
    //var table = {tableNumber: 1};
    //this.tables.push(table);
    this.fdatabase.database.ref('Tables').once('value')
        .then(snapshot => {
          console.log("here2");
          snapshot.forEach(table => {
            console.log(table.val());
            this.tables.push(table.val());
          });
        });
  }
  // POp to Root: this.navCtrl.popToRoot();
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseTablePage');
  }

  openTable(tableNum){
    this.navCtrl.push('CreateTicketPage', {num:tableNum});
  }

}
