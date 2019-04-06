import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitPaymentPage } from './submit-payment';

@NgModule({
  declarations: [
    SubmitPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitPaymentPage),
  ],
})
export class SubmitPaymentPageModule {}
