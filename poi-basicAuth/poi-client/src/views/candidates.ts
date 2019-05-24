import { inject } from 'aurelia-framework';
import { Candidate } from '../services/poi-types';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Candidates {
  candidates: Candidate[];

  constructor(private ds: PoiService) {
    this.candidates = ds.candidates;
  }
}
