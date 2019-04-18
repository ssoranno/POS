import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foodAndTable = [];
  uid;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public fdatabase: AngularFireDatabase) {
    this.login();
    /*var user = this.afAuth.auth.currentUser;
    this.uid = user.uid;
    if(user){

    }*/
  }

  async login(){
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword("kitchen@gmail.com","kitchen");
      console.log("result",result);
      if(result){
        //console.log(result.user.uid)
        console.log("loggedin")
        this.navCtrl.setRoot('DisplayOrdersPage');
        /*this.fdatabase.database.ref('Tickets').on('value', snapshot =>{
          //var obj: {tableNum:number, foodList:any};
          var l = [];
          console.log(snapshot.val());
          snapshot.forEach(user => {
            console.log(user.val());
            user.forEach(ticket =>{
              console.log(ticket.val());
              var obj: {tableNum:number, foodList:any} = {tableNum: 0, foodList:{}};
              obj.tableNum = ticket.val().TableNumber;
              obj.foodList = ticket.val().FoodIDs;
              this.foodAndTable.push(obj);
            });
          });
          //this.foodAndTable = l;
          console.log(this.foodAndTable);
        });*/
        //console.log(this.foodAndTable);
      }
    } catch (e){
      console.log("Error:")
      console.dir(e);
    }
  }

}
