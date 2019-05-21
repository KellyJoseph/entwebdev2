import { bindable } from 'aurelia-framework';
import {User} from "../../services/donation-types";
import { DonationService } from '../../services/donation-service';
import { inject } from 'aurelia-framework';


@inject(DonationService)
export class UserList {
  @bindable
  users : User[];

  constructor (private ds: DonationService) {}

  deleteUser(_id) {
    this.ds.deleteUser(_id);
    console.log('deleteUser function is triggered...');
  }
}
