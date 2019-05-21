import { inject } from 'aurelia-framework';
import { Candidate } from '../services/donation-types';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class Candidates {
  candidates: Candidate[];

  constructor(private ds: DonationService) {
    this.candidates = ds.candidates;
  }
}
