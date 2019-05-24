import { bindable } from 'aurelia-framework';
import {Location, Photo} from "../../services/poi-types";
import { PoiService } from '../../services/poi-service';
import { inject } from 'aurelia-framework';


@inject(PoiService)
export class LocationList {
  @bindable
  locations: Location[];
  @bindable
  locationPhotos: Photo[];


  constructor (private ds: PoiService) {}

  getPhotosByLocation(locationName) {
    this.ds.getPhotosByLocation(locationName);
    console.log('getPhotosByLocation function is triggered for: ' + locationName);
  }

  deleteLocation(id) {
    this.ds.deleteLocation(id);
    console.log("delete button was triggered for " + id);
  }
}

