import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Candidate, Donation } from '../../services/donation-types';
import {DonationService} from "../../services/donation-service";

@inject(DonationService)
export class DonateForm {
  @bindable
  paymentMethods: string[];
  @bindable
  candidates: Candidate[];

  amount = '0';
  selectedMethod = '';
  selectedCandidate : Candidate = null;

  constructor (private ds: DonationService) {}

  makeDonation() {
    this.ds.donate(parseInt(this.amount), this.selectedMethod, this.selectedCandidate);
  }
}
