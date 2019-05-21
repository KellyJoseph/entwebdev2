import { inject } from 'aurelia-framework';
import {Location} from "../services/donation-types";
import {DonationService} from "../services/donation-service";

@inject(DonationService)
export class Locations {
  locations: Location[] = [];
  regions = ['North', ' North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];

  constructor(private ds: DonationService) {
    this.locations = ds.locations;

  }
}
