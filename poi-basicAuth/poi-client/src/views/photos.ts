import { inject } from 'aurelia-framework';
import {Photo} from "../services/donation-types";
import {DonationService} from "../services/donation-service";

@inject(DonationService)
export class Users {
  photos: Photo[] = [];
  locationPhotos: Photo[] = [];

  constructor(private ds: DonationService) {
    this.photos = ds.photos;
    this.locationPhotos = ds.locationPhotos;

  }
}
