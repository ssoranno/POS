import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeRegisterPage } from './employee-register';

@NgModule({
  declarations: [
    EmployeeRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeRegisterPage),
  ],
})
export class EmployeeRegisterPageModule {}
