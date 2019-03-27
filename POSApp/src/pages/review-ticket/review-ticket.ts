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
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    this.ticketFoods = this.navParams.get('list');
    this.tableNumber = this.navParams.get('tabNum');
    console.log("reviewFoods:",this.ticketFoods);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewTicketPage');
  }

  createTicket(){
    var user = this.afAuth.auth.currentUser;
    this.ticketFoods.forEach(food =>{
      var price = +food.price;
      this.orderTotal = this.orderTotal+price;
    });
    if(user){
      console.log(user.uid);
      this.uid = user.uid;
      console.log("OrderTotal:",this.orderTotal);
      //this.ticket.Date = new Date().toLocaleDateString();
      //this.ticket.TableNumber = this.tableNumber;
      var id = this.fdatabase.database.ref('Tickets/'+this.uid).push({
        Date: new Date().toLocaleDateString(),
        OrderTotal: this.orderTotal,
        TableNumber: this.tableNumber
      });

      console.log("foodid:",id.key);

      this.ticketFoods.forEach(food =>{
        var foodid = "";
        this.fdatabase.database.ref('Food').orderByChild('name').equalTo(food.name)
        .once("child_added" , snapshot => {
          foodid = snapshot.key;
          this.fdatabase.database.ref('Tickets/'+this.uid+'/'+id.key+'/FoodIDs').push({
            id:foodid
          });
        });

      });
    }
  }

  submitTicket(){
    this.createTicket();
    this.navCtrl.popToRoot();
  }

}
