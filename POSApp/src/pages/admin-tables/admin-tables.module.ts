import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminTablesPage } from './admin-tables';

@NgModule({
  declarations: [
    AdminTablesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminTablesPage),
  ],
})
export class AdminTablesPageModule {}
