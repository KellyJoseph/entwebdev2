import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import {PoiService} from '../../services/poi-service';
import { Photo } from '../../services/poi-types';

@inject(PoiService)
export class PhotoForm {
  @bindable
  photos: Photo[];

  title = null;
  files = null;

  constructor (private ds: PoiService) {}


  uploadPhoto() {
    const result = this.ds.uploadPhoto(this.title, this.files);
    console.log(this.title);
    console.log(result);
  }
}

