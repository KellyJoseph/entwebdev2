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

  @bindable
  formOptions = [1,2,3,4,5];
/*
<select class="ui fluid search dropdown" value.bind="selectedOption">
  <option value.bind="rating">Choose..</option>
    <option repeat.for="rating of formOptions" value.bind="rating">${rating} </option>
    </select>
*/

  selectedVall = 3;
@bindable
  someOptions = [
    {value: 1, name: 1},
    {value: 2, name: 2},
    {value: 3, name: 3},
    {value: 4, name: 4},
    {value: 5, name: 5},
  ];

  constructor (private ds: PoiService) {}

  getPhotosByLocation(locationName) {
    this.ds.getPhotosByLocation(locationName);
    console.log('getPhotosByLocation function is triggered for: ' + locationName);
  }

  deleteLocation(id) {
    this.ds.deleteLocation(id);
    console.log("delete button was triggered for " + id);
  }

  addRating(locationName) {
    this.ds.postRating(this.rating);
  }
}

