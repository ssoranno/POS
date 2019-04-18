import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayOrdersPage } from './display-orders';

@NgModule({
  declarations: [
    DisplayOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayOrdersPage),
  ],
})
export class DisplayOrdersPageModule {}
