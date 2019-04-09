import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEmployeePage } from './admin-employee';

@NgModule({
  declarations: [
    AdminEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEmployeePage),
  ],
})
export class AdminEmployeePageModule {}
