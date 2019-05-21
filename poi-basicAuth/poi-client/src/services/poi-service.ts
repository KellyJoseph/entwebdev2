import { inject } from 'aurelia-framework';
import { Candidate, Donation } from './donation-types';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class DonationService {
  locations: Location[] = [];

  constructor(private httpClient: HttpClient) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getLocations();
  }

  async getLocations() {
    const response = await this.httpClient.get('../../static/api/locations.json');
    this.locations = await response.content;
    console.log (this.locations);
  }
}
