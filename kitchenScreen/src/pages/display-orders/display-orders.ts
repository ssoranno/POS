import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the DisplayOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-orders',
  templateUrl: 'display-orders.html',
})
export class DisplayOrdersPage {

  foodAndTable = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    this.fdatabase.database.ref('Tickets').on('value', snapshot =>{
      //var obj: {tableNum:number, foodList:any};
      var l = [];
      console.log(snapshot.val());
      snapshot.forEach(user => {
        //var obj: {ticketID:string, tableNum:number, foodList:any, status:string, uid:string} = {tableNum: 0, foodList:[], ticketID:"", status:"", uid:""};
        console.log(user.val());
        //obj.uid = user.key;
        user.forEach(ticket =>{
          console.log(ticket.val());
          var obj: {ticketID:string, tableNum:number, foodList:any, status:string, uid:string} = {tableNum: 0, foodList:[], ticketID:"", status:"", uid:""};
          obj.tableNum = ticket.val().TableNumber;
          obj.ticketID = ticket.key;
          obj.status = ticket.val().status;
          obj.uid = user.key;
          var t = ticket.val().FoodIDs;
          for(let pid in t){
            //obj.foodList.push(t[pid].id);
            console.log(t[pid].id);
            this.fdatabase.database.ref('Food/'+t[pid].id+'/name').once('value').then(snapshot=>{
              console.log("snapshot:",snapshot.val());
              obj.foodList.push(snapshot.val());
            });
            /*for(let fid in t[pid].id){
              console.log("here");
              console.log(fid);
            }*/
          }
          /*t.forEach(pid =>{
            console.log(pid.val());
          });*/
          //obj.foodList = ticket.val().FoodIDs;
          this.foodAndTable.push(obj);
        });

      });
      /*l.forEach(obj =>{
        obj.foodList
      });*/
      //this.foodAndTable = l;
      console.log(this.foodAndTable);
    });
  }

  completeFood(food){
    console.log(food);
    this.fdatabase.database.ref("Tickets/"+food.uid+"/"+food.ticketID).update({
      status:"Complete"
    });
    for (let i in this.foodAndTable)
    {
       if (this.foodAndTable[i].ticketID == food.ticketID)
      {
        this.foodAndTable.splice(Number(i), 1);
      }
    }

    //console.log(this.tableList);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayOrdersPage');
  }

}
