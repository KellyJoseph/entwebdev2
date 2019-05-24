import { inject } from 'aurelia-framework';
import {User} from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Users {
  users: User[] = [];

  constructor(private ds: PoiService) {
    this.users = ds.users2;

  }
}
