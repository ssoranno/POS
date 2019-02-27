import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MyApp } from './app.component';
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
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
