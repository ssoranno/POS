import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostTabPage } from './host-tab';

@NgModule({
  declarations: [
    HostTabPage,
  ],
  imports: [
    IonicPageModule.forChild(HostTabPage),
  ],
})
export class HostTabPageModule {}
