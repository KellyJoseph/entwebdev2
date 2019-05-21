import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class Logout {
  constructor(private ds: DonationService) {}

  attached() {
    this.ds.logout();
  }
}
