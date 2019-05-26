import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Location } from '../../services/poi-types';
import { PoiService } from '../../services/poi-service';

@inject(PoiService)
export class LocationForm {
  @bindable
  locations: Location[];

  name = 'name';
  description = 'describe location';
  author = 'author id';
  region = 'somewhere';
  lat = 'lat';
  lng = 'lng';
  _id = 'some id';

  constructor (private ds: PoiService) {}


  addLocation() {
    console.log("add location function triggered");
    const result = this.ds.addLocation(this.name, this.description, this.author, this.region, this.lat, this.lng, this._id);
    console.log(location);
    console.log(result);
  }
}

