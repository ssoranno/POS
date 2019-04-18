import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

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
  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    console.log("here");
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    //var table = {tableNumber: 1};
    //this.tables.push(table);
    this.fdatabase.database.ref('Tables').once('value')
        .then(snapshot => {
          console.log("here2");
          snapshot.forEach(table => {
            console.log(table.val());
            if(table.val().server == this.uid){
            this.tables.push(table.val());
          }
          });
        }).then(sort=>{
          this.tables.sort((obj1,obj2)=>{
            if(obj1.tableNumber > obj2.tableNumber){
              return 1;
            }
            if(obj1.tableNumber < obj2.tableNumber){
              return -1;
            }
            return 0;
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
