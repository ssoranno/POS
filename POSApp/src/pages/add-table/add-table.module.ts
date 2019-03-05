import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTablePage } from './add-table';

@NgModule({
  declarations: [
    AddTablePage,
  ],
  imports: [
    IonicPageModule.forChild(AddTablePage),
  ],
})
export class AddTablePageModule {}
