import { bindable } from 'aurelia-framework';
import {Photo} from "../../services/donation-types";
import { DonationService } from '../../services/donation-service';
import { inject } from 'aurelia-framework';


@inject(DonationService)
export class PhotoList {
  @bindable
  photos: Photo[];
  @bindable
  locationPhotos: Photo[];

  constructor (private ds: DonationService) {}

  deletePhoto(_id) {
    this.ds.deletePhoto(_id);
    console.log('deletePhoto function is triggered...');
  }
}

