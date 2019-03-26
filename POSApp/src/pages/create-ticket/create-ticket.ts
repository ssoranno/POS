import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
import { v } from '@angular/core/src/render3';

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
  tableNumber;
  add = false;
  ticketFoods = [];
  //foodChecked;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase) {
    this.tableNumber = this.navParams.get('num');
    console.log('tableNum:',this.tableNumber);
    /*var food = {name:"Cheeseburger", description: "Very Good", price: 7, isChecked: false};
    var food2 = {name:"f2", description: "Very Good", price: 7, isChecked: false};
    this.foodList.push(food);
    this.foodList.push(food2);
    */
    this.fdatabase.database.ref('Food').once('value')
        .then(snapshot => {
          let foods = [];
          snapshot.forEach(food => {
            var f = {name: "",description: "", price: 0, isChecked:false};
            f.name = food.val().name;
            f.description = food.val().description;
            f.price = food.val().price;
            foods.push(f);
          });
          this.foodList = foods;
          this.loadedFoodList = foods;
        });
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
      console.log("q:",q);
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    /*let newList = [];
    this.foodList.forEach(food=>{
      if(food.name && q){
        if(v.name.toLocaleLowerCase().indexOf(q.toLowerCase())>-1){
          newList
        }
        return false;
      }
    });*/
    console.log(q);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTicketPage');
  }

  reviewTicket(){
    console.log("reviewButton");
    //console.log("foodList:",this.foodList[0].isChecked);
    this.navCtrl.push('ReviewTicketPage', {list:this.ticketFoods});
  }

  checked(){
    var isChecked = false;
    this.foodList.forEach(food=>{
      if(food.isChecked == true){
        console.log("here");
        isChecked = true;
      }
    });
    return isChecked;
  }
  foodClicked(foodName){
    if(this.checked()){
      this.add = true;
    } else{
      this.add = false;
    }
    console.log(foodName);
    //this.add = !this.add;
  }

  addToTicket(){
    this.foodList.forEach(food=>{
      if(food.isChecked == true){
        this.ticketFoods.push(food);
        food.isChecked = false;
      }
    });
    this.add = false;
  }

}
