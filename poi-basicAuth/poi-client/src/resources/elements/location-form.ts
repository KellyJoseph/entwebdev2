import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Location } from '../../services/donation-types';
import { DonationService } from '../../services/donation-service';

@inject(DonationService)
export class LocationForm {
  @bindable
  locations: Location[];

  name = 'name';
  description = 'describe location';
  author = 'author id';
  region = 'somewhere';
  latitude = 'lat';
  longitude = 'long';
  _id = 'some id';

  constructor (private ds: DonationService) {}


  addLocation() {
    const location = {
      name: this.name,
      description: this.description,
      author: this.author,
      region: this.region,
      latitude: this.latitude,
      longitude: this.longitude,
      _id: ''
    };
    const result = this.ds.addLocation(this.name, this.description, this.author, this.region, this.latitude, this.longitude, this._id);
    console.log(location);
    console.log(result);
  }
}

