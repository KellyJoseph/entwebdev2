import { bindable } from 'aurelia-framework';
import {User} from "../../services/poi-types";
import { PoiService } from '../../services/poi-service';
import { inject } from 'aurelia-framework';


@inject(PoiService)
export class UserList {
  @bindable
  users : User[];

  constructor (private ds: PoiService) {}

  deleteUser(_id) {
    this.ds.deleteUser(_id);
    console.log('deleteUser function is triggered...');
  }
}
