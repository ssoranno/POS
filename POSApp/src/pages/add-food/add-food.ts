import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the AddFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {
  food: {name: string, description: string, type: number, price: number} = {
    name: "",
    description: "",
    type: 0,
    price: 0,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  registerFood(){
    this.food.price = Number(this.food.price);
    this.fdatabase.database.ref('Food').push(this.food);
    this.navCtrl.pop();
  }

}
