import { inject } from 'aurelia-framework';
import {PoiService} from '../../services/poi-service';

@inject(PoiService)
export class CommentForm {

  comment= 'comment';

  constructor (private ds: PoiService) {}

  postComment() {
    const result = this.ds.postComment(this.comment);
    console.log("this comment is: " + this.comment);
    console.log("post comment button was triggered");
    console.log(result);
  }
}
