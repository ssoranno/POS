import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayReviewPage } from './pay-review';

@NgModule({
  declarations: [
    PayReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PayReviewPage),
  ],
})
export class PayReviewPageModule {}
