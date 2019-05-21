import { bindable } from 'aurelia-framework';
import {Location, Photo} from "../../services/donation-types";
import { DonationService } from '../../services/donation-service';
import { inject } from 'aurelia-framework';


@inject(DonationService)
export class LocationList {
  @bindable
  locations: Location[];
  @bindable
  locationPhotos: Photo[];


  constructor (private ds: DonationService) {}

  getPhotosByLocation(locationName) {
    this.ds.getPhotosByLocation(locationName);
    console.log('getPhotosByLocation function is triggered for: ' + locationName);
  }

  deleteLocation(id) {
    this.ds.deleteLocation(id);
    console.log("delete button was triggered for " + id);
  }
}

