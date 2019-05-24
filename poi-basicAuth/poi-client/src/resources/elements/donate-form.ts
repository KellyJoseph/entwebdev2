import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Candidate, Donation } from '../../services/poi-types';
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class DonateForm {
  @bindable
  paymentMethods: string[];
  @bindable
  candidates: Candidate[];

  amount = '0';
  selectedMethod = '';
  selectedCandidate : Candidate = null;

  constructor (private ds: PoiService) {}

  makeDonation() {
    this.ds.donate(parseInt(this.amount), this.selectedMethod, this.selectedCandidate);
  }
}
