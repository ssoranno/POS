import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseTablePage } from './choose-table';

@NgModule({
  declarations: [
    ChooseTablePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseTablePage),
  ],
})
export class ChooseTablePageModule {}
