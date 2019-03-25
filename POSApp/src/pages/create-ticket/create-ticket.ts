import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the CreateTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-ticket',
  templateUrl: 'create-ticket.html',
})
export class CreateTicketPage {
  foodList = [];
  loadedFoodList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    var food = {name:"Cheeseburger", description: "Very Good", Price:7}
    /*this.fdatabase.database.ref('Food').once('value')
        .then(snapshot => {
          let foods = [];
          snapshot.forEach(food => {
            foods.push(food.val());
          });
          this.foodList = foods;
          this.loadedFoodList = foods;
        });*/
  }

  initializeItems(): void {
    this.foodList = this.loadedFoodList;
  }

  getFood(searchbar){
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.foodList = this.foodList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTicketPage');
  }

}
