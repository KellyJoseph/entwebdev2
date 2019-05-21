import { inject } from 'aurelia-framework';
import {User} from "../services/donation-types";
import {DonationService} from "../services/donation-service";

@inject(DonationService)
export class Users {
  users: User[] = [];

  constructor(private ds: DonationService) {
    this.users = ds.users2;

  }
}
