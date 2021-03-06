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
  appList = [];
  breakfastList = [];
  lunchList = [];
  dinnerList = [];
  desertList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter AdminTablesPage');
    this.foodList = [];
    this.fdatabase.database.ref('Food').once('value')
        .then(snapshot => {
          snapshot.forEach(food => {
            this.foodList.push(food.val());
            if(food.val().type == "appetizer"){
              this.appList.push(food.val());
            } else if(food.val().type == "breakfast"){
              this.breakfastList.push(food.val());
            } else if(food.val().type == "lunch"){
              this.lunchList.push(food.val());
            } else if(food.val().type == "dinner"){
              this.dinnerList.push(food.val());
            } else if(food.val().type == "desert"){
              this.desertList.push(food.val());
            }
          });
          console.log("app:",this.appList);
          console.log("break:",this.breakfastList);
          console.log("lunch:",this.lunchList);
          console.log("dinner:",this.dinnerList);
          console.log("desert:",this.desertList);
        });
    
  }


  clearFood(foodName){
    //console.log(this.foodList);
    this.fdatabase.database.ref('Food').orderByChild('name').equalTo(foodName).once("child_added" , snapshot =>
    {
      snapshot.ref.remove();
      for (let i in this.foodList)
      {
        if (this.foodList[i].name == foodName)
        {
          this.foodList.splice(Number(i), 1);
        }
      }
    });
  }

  editFood(foodName){
    this.navCtrl.push('EditFoodPage', {name:foodName});
  }

  addItem(){
    console.log('add');
    this.navCtrl.push('AddFoodPage');
  }

}
