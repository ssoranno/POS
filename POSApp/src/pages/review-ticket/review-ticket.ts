import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the ReviewTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-ticket',
  templateUrl: 'review-ticket.html',
})
export class ReviewTicketPage {
  ticketFoods = [];
  ticket: { Date:string, FoodIDs:any, OrderTotal:number, TableNumber:number };
  tableNumber;
  uid;
  orderTotal:number = 0;
  ticketID;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    this.ticketFoods = this.navParams.get('list');
    this.tableNumber = this.navParams.get('tabNum');
    this.ticketID = this.navParams.get('tid');
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    this.navCtrl.getPrevious().data.ticketFoods = this.ticketFoods;
    //console.log("reviewFoods:",this.navCtrl.getPrevious().data.ticketFoods);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewTicketPage');
  }

  ionViewWillLeave(){
    this.navCtrl.getPrevious().data.ticketFoods = this.ticketFoods;
  }

  deleteFood(foodName){
    for (let i in this.ticketFoods)
      {
        if (this.ticketFoods[i].name == foodName)
        {
          this.ticketFoods.splice(Number(i), 1);
        }
      }
      //this.navCtrl.getPrevious().data.list = this.ticketFoods;
  }

  updateOrderTotal(){
    this.ticketFoods.forEach(food =>{
      var price = +food.price;
      this.orderTotal = this.orderTotal+price;
    });
  }

  createTicket(){
    console.log("create");
    //var user = this.afAuth.auth.currentUser;
    this.updateOrderTotal();
    //if(this.user){
      //console.log(this.user.uid);
      //this.uid = this.user.uid;
      console.log("OrderTotal:",this.orderTotal);
      //this.ticket.Date = new Date().toLocaleDateString();
      //this.ticket.TableNumber = this.tableNumber;
      var id = this.fdatabase.database.ref('Tickets/'+this.uid).push({
        Date: new Date().toLocaleDateString(),
        OrderTotal: this.orderTotal,
        TableNumber: this.tableNumber
      });

      console.log("foodid:",id.key);
      this.ticketID = id.key;
      this.addToTicket();
      /*this.ticketFoods.forEach(food =>{
        var foodid = "";
        this.fdatabase.database.ref('Food').orderByChild('name').equalTo(food.name)
        .once("child_added" , snapshot => {
          foodid = snapshot.key;
          this.fdatabase.database.ref('Tickets/'+this.uid+'/'+id.key+'/FoodIDs').push({
            id:foodid
          });
        });

      });*/
    //}
  }

  addToTicket(){

    this.ticketFoods.forEach(food =>{
      var foodid = "";
      this.fdatabase.database.ref('Food').orderByChild('name').equalTo(food.name)
      .once("child_added" , snapshot => {
        foodid = snapshot.key;
        
        this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID+'/FoodIDs').push({
          id:foodid
        });
      });

    });
  }

  editTicket(){
    console.log("edit")
    this.updateOrderTotal();
    var currentTotal;
    this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID).child("OrderTotal").once('value').then(total => {
      return total.val();
    }).then(total=>{
      this.orderTotal = this.orderTotal+Number(total);
      console.log("here:", this.orderTotal);
      this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID).update({
        OrderTotal:this.orderTotal
      });
      this.addToTicket();
    });
  }

  submitTicket(){
    if(this.ticketID == null){
      this.createTicket();
    } else {
      this.editTicket();
    }
    this.navCtrl.popToRoot();
  }

}
