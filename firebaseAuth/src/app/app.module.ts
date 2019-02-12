import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Stripe } from '@ionic-native/stripe';
import { CardIO } from '@ionic-native/card-io';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';

export const firebaseConfig = {
  apiKey: "AIzaSyDNTuztJ68PGwBCFGVtYae2Uwg7kQjCwH0",
  authDomain: "posdemo-68bbd.firebaseapp.com",
  databaseURL: "https://posdemo-68bbd.firebaseio.com",
  projectId: "posdemo-68bbd",
  storageBucket: "posdemo-68bbd.appspot.com",
  messagingSenderId: "848805070961"
};

@NgModule({
  declarations: [
    MyApp,
    //HomePage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage,
    WelcomePage
  ],
  providers: [
    Stripe,
    CardIO,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
