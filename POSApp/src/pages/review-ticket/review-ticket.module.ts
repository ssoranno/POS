import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewTicketPage } from './review-ticket';

@NgModule({
  declarations: [
    ReviewTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewTicketPage),
  ],
})
export class ReviewTicketPageModule {}
