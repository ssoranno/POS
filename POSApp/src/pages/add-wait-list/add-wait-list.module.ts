import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWaitListPage } from './add-wait-list';

@NgModule({
  declarations: [
    AddWaitListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWaitListPage),
  ],
})
export class AddWaitListPageModule {}
