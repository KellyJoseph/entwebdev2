import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { User, Location, Photo } from './donation-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class DonationService {
  users: Map<string, User> = new Map();
  users2: User[] = [];
  locations: Location[] = [];
  photos: Photo[] = [];
  locationPhotos: Photo[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  regions = ['North', ' North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
  currentLocation: string;


  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getUsers();
    this.getLocations();
    this.getPhotos();
  }


  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    this.users2 = users;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
    console.log(this.users);
  }

  async getLocations() {
    const response = await this.httpClient.get('/api/locations');
    this.locations = await response.content;
    console.log(this.locations);
  }

  async getPhotos() {
    const response = await this.httpClient.get('/api/photos');
    this.photos = await response.content;
    console.log(this.photos);
  }

  async deleteUser(_id) {
    console.log(_id);
    const response = await this.httpClient.delete('api/users/' + _id);
    console.log(response);
  }

  async deleteLocation(_id) {
    console.log(_id);
    const response = await this.httpClient.delete('api/locations/' + _id);
    console.log(response);
  }

  async deletePhoto(_id) {
    console.log(_id);
    const response = await this.httpClient.delete('api/photos/' + _id);
    console.log(response);
  }

  async getPhotosByLocation(locationName) {
    const response = await this.httpClient.get('/api/locations/' + locationName +'/photos');
    //this.locationPhotos = await response.content;
    //console.log(this.locationPhotos);
    this.photos = await response.content;
    console.log(this.photos);
    this.currentLocation = locationName;
    await this.router.navigateToRoute("photos");
  }


  async addLocation(name: string, description: string, author: string, region: string, latitude: string, longitude: string, _id: string) {
    const location = {
      name: name,
      description: description,
      author: "5ce1c37d9aa81a3384e7826a",
      region: region,
      latitude: 9875,
      longitude: 1234
    };
    const response = await this.httpClient.post('/api/locations', location);
    console.log(response);
    return response;
  }

// /api/users'

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      admin: false
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    //this.usersById.set(newUser._id, newUser);
    this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }


async uploadPhoto(title: string, selectedImage){
    console.log("now uploading photo for: " + this.currentLocation)
    let formData = new FormData();
    formData
    formData.append("title", title);
    formData.append("location", this.currentLocation);
    formData.append("file", selectedImage);
    const response = await this.httpClient.post('/api/locations/' + this.currentLocation + '/photos', formData);
    console.log(response);
  }



  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (  password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'))
      return true;
    } else {
      return false;
    }
  }


  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
