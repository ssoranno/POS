import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmployeeRolesPage } from './edit-employee-roles';

@NgModule({
  declarations: [
    EditEmployeeRolesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmployeeRolesPage),
  ],
})
export class EditEmployeeRolesPageModule {}
