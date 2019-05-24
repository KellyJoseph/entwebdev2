import { inject } from 'aurelia-framework';
import {Candidate, Donation} from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Donate {
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  candidates: Candidate[];
  total = 0;

  constructor(private ds: PoiService) {
    this.candidates = ds.candidates;
    this.donations = ds.donations;
    this.paymentMethods = ds.paymentMethods;
    this.total = ds.total;
}
