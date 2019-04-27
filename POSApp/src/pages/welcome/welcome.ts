import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  ip:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  cashBoxOpen(){
    var url = "http://"+this.ip+"/open";

    this.http.get(url).subscribe(data => {
      console.log('my data: ', data);
    });
  }
  cashBoxClose(){
    var url = "http://"+this.ip+"/lock";
    this.http.get(url).subscribe(data => {
      console.log('my data: ', data);
    });
  }

}
