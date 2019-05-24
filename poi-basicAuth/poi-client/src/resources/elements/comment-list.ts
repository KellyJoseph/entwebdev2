import { bindable } from 'aurelia-framework';
import { Comment } from "../../services/poi-types";
import { PoiService } from '../../services/poi-service';
import { inject } from 'aurelia-framework';


@inject(PoiService)
export class CommentList {
  @bindable
  comments: Comment[];

  constructor (private ds: PoiService) {}

  deleteComment(id) {
    console.log("delete comment button was triggered");
    const response = this.ds.deleteComment(id);
    console.log(response);
  }
}

