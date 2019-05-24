import { bindable } from 'aurelia-framework';
import {Photo} from "../../services/poi-types";
import { PoiService } from '../../services/poi-service';
import { inject } from 'aurelia-framework';


@inject(PoiService)
export class PhotoList {
  @bindable
  photos: Photo[];
  @bindable
  locationPhotos: Photo[];

  constructor (private ds: PoiService) {}

  deletePhoto(_id) {
    const result = this.ds.deletePhoto(_id);
    console.log(result);
    console.log('deletePhoto function is triggered...');
  }
}

