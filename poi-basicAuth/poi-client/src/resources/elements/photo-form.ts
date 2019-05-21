import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import {DonationService} from '../../services/donation-service';
import { Photo } from '../../services/donation-types';

@inject(DonationService)
export class PhotoForm {
  @bindable
  photos: Photo[];

  title= 'title';
  photo = 'photo';
  selectedImage = "selectedImage";

  constructor (private ds: DonationService) {}


  uploadPhoto() {
    const result = this.ds.uploadPhoto(this.title, this.selectedImage);
    console.log(this.title);
    console.log(result);
  }


}

