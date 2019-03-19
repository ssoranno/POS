import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the EditFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-food',
  templateUrl: 'edit-food.html',
})
export class EditFoodPage {
  food: {name: string, description: string, price: number} = {
    name: "",
    description: "",
    price: 0
  };
  //databaseRef = this.fdatabase.database.ref('Food').orderByChild('name').equalTo(this.food.name);
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    this.food.name = navParams.get('name');
    this.fdatabase.database.ref('Food').orderByChild('name').equalTo(this.food.name)
      .once("child_added" , snapshot => {
        this.food.description = snapshot.val().description;
        this.food.price = snapshot.val().price;
        this.id = snapshot.key;
        console.log("id:",this.id);
      });
    console.log(this.food);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditFoodPage');
  }

  changeFood(){
    console.log(this.food);
    this.fdatabase.database.ref('Food/'+this.id).set(this.food);
    this.navCtrl.pop();
  }

}
