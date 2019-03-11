import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRolesPage } from './edit-roles';

@NgModule({
  declarations: [
    EditRolesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRolesPage),
  ],
})
export class EditRolesPageModule {}
