import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the MenuOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-options',
  templateUrl: 'menu-options.html',
})
export class MenuOptionsPage {
  foodList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    this.fdatabase.database.ref('Food').once('value')
        .then(snapshot => {
          snapshot.forEach(food => {
            console.log(food.val());
            this.foodList.push(food.val());
          });
          console.log(this.foodList);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuOptionsPage');
  }

  /*viewMenu(){
    //this.navCtrl.push('MenuOptionsPage');
  }*/

  addItem(){
    console.log('add');
    this.navCtrl.push('AddFoodPage');
  }

  /*editMenu(){
    this.navCtrl.push('editOptionsPage');
  }*/

}
