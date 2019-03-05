import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitListPage } from './wait-list';

@NgModule({
  declarations: [
    WaitListPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitListPage),
  ],
})
export class WaitListPageModule {}
