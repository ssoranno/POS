import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { TicketFoodItem } from '../../models/ticket-food-item/ticket-food-item.interface';

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
  ticketFoods : Array<TicketFoodItem>=[];
  foodList=[];
  ticket: { Date:string, FoodIDs:any, OrderTotal:number, TableNumber:number };
  tableNumber;
  uid;
  orderTotal:number = 0;
  ticketID;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    // this.ticketFoods = this.navParams.get('list');
    // this.tableNumber = this.navParams.get('tabNum');
    

    //this.navCtrl.getPrevious().data.ticketFoods = this.ticketFoods;
    //console.log("reviewFoods:",this.navCtrl.getPrevious().data.ticketFoods);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewTicketPage');
    this.ticketID = this.navParams.get('tid');
    var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    // this.getMenu();
    // this.refreshTicket();
  }


  ionViewDidEnter(){
    this.getMenu();
    this.refreshTicket();
  }

  ionViewWillLeave(){
    this.navCtrl.getPrevious().data.ticketFoods = this.ticketFoods;
  }

  deleteFood(food: string){
      console.log(food);
     var fref = this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID+'/FoodIDs/'+food);
      //console.log(fref.key);
      fref.remove();
      this.refreshTicket();
    for (let i in this.ticketFoods)
    {
      if (this.ticketFoods[i].entryID == food)
      {
        this.ticketFoods.splice(Number(i), 1);
      }
    }


  }

  updateOrderTotal(){
    var price = 0;
    this.ticketFoods.forEach(food =>{
      price = price +food.price;
      this.orderTotal = price;
      this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID).update({OrderTotal: this.orderTotal});
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
        TableNumber: this.tableNumber,
        isOpen: true
      });

      console.log("foodid:",id.key);
      this.ticketID = id.key;
  }

  navigateToCreateTicketPage(){
    this.navCtrl.push('CreateTicketPage', {tid: this.ticketID});
  }

  getMenu()
  {
    this.fdatabase.database.ref('Food').once('value')
        .then(snapshot => {
          let foods = [];
          snapshot.forEach(food => {
            var f = {name: "",description: "", price: 0, id: "", entryid:""};
            f.name = food.val().name;
            f.description = food.val().description;
            f.price = Number(food.val().price);
            f.id=food.key;
            foods.push(f);
          });
          this.foodList = foods;
        });
  }

  refreshTicket()
  {
    this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID+'/FoodIDs').once('value').then(snapshot =>{
      snapshot.forEach(itemSnap=>{
        var x = itemSnap.val().id;
        var found = false;
        for (var i =0; i<this.ticketFoods.length; i++)
        {
          if (this.ticketFoods[i].entryID==itemSnap.key)
          {
             found = true;
          }
        }
        if (found ==false)
        {
          for(let i in this.foodList)
          {
            if(this.foodList[i].id==x)
            {
              var y: TicketFoodItem={
              entryID: itemSnap.key,
              name: this.foodList[i].name,
              price: this.foodList[i].price,
              foodID:this.foodList[i].id,
              description:this.foodList[i].description};
              this.ticketFoods.push(y);
            }
          }
        }
      });  
      this.updateOrderTotal();
    });


  }

   payTicket(ticketId){
    console.log(ticketId);
    this.navCtrl.push('PayReviewPage', {tid:this.ticketID});
  }

  

  submitTicket(){
    this.fdatabase.database.ref('Tickets/'+this.uid+'/'+this.ticketID).update({status:"Sent"});
    this.navCtrl.popToRoot();
  }

}
