import { inject } from 'aurelia-framework';
import {Photo, Comment} from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Users {
  photos: Photo[] = [];
  //locationPhotos: Photo[] = [];
  comments: Comment[] = [];

  constructor(private ds: PoiService) {
    this.photos = ds.photos;
    //this.locationPhotos = ds.locationPhotos;
    this.comments = ds.comments;

  }
}
