import { inject } from 'aurelia-framework';
import {Location} from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Locations {
  locations: Location[] = [];
  regions = ['North', ' North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];

  constructor(private ds: PoiService) {
    this.locations = ds.locations;

  }
}
