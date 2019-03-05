import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostPage } from '../host/host';
import { WaitListPage} from '../wait-list/wait-list';

/**
 * Generated class for the HostTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-host-tab',
  templateUrl: 'host-tab.html',
})
export class HostTabPage {

	hostPage = HostPage;
	waitListPage = WaitListPage;

}
