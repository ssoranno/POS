import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
import { v } from '@angular/core/src/render3';
import { AngularFireAuth } from '@angular/fire/auth';

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
  ticketID;
  uid;
  //foodChecked;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.tableNumber = this.navParams.get('num') || null;
    this.ticketID = this.navParams.get('tid')|| null;
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    /*var food = {name:"Cheeseburger", description: "Very Good", price: 7, isChecked: false};
    var food2 = {name:"f2", description: "Very Good", price: 7, isChecked: false};
    this.foodList.push(food);
    this.foodList.push(food2);
    */
    
  }



  ionViewWillEnter(){
    this.ticketFoods = this.navParams.get('ticketFoods')|| [];
    //console.log(this.navParams.get('ticketFoods'));
  }

  initializeItems(): void {
    this.foodList = this.loadedFoodList;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTicketPage');
    this.fdatabase.database.ref('Food').once('value')
        .then(snapshot => {
          let foods = [];
          snapshot.forEach(food => {
            var f = {name: "",description: "", price: 0, isChecked:false, status:""};
            f.name = food.val().name;
            f.description = food.val().description;
            f.price = Number(food.val().price);
            f.status= "Sent"
            console.log(typeof f.price);
            foods.push(f);
          });
          this.foodList = foods;
          this.loadedFoodList = foods;
        });
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
    console.log(q);
  }



  reviewTicket(){
    console.log("reviewButton");
    //console.log("foodList:",this.foodList[0].isChecked);
    this.navCtrl.push('ReviewTicketPage', {list:this.ticketFoods, tabNum:this.tableNumber, tid:this.ticketID});
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
        if (this.ticketID == null)
        {
          var id = this.fdatabase.database.ref('Tickets/'+this.uid).push({
            Date: new Date().toLocaleDateString(),
            OrderTotal: 0,
            TableNumber: this.tableNumber,
            isOpen: true,
            status: "Sent"
          });
          this.ticketID = id.key;
        }
        var foodid = "";
        this.fdatabase.database.ref('Food').orderByChild('name').equalTo(food.name)
        .once("child_added" , snapshot => {
        foodid = snapshot.key;
        
        this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID+'/FoodIDs').push({
         id:foodid
        });
      });
        food.isChecked = false;
      }
    });
    this.add = false;

    this.navCtrl.push('ReviewTicketPage', {tid:this.ticketID});
  }

}
