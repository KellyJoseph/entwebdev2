import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { User, Location, Photo, Comment } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: User[] = [];
  locations: Location[] = [];
  photos: Photo[] = [];
  //locationPhotos: Photo[] = [];
  comments: Comment[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  regions = ['North', ' North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
  currentLocation: string;


  constructor(
    private httpClient: HttpClient,
    private ea: EventAggregator,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    //this.getUsers();
    //this.getLocations();
    //this.getPhotos();
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    this.users = users;
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

  async deleteComment(_id) {
    console.log(_id);
    const response = await this.httpClient.delete('api/comments/' + _id);
    console.log(response);
  }

  async getPhotosByLocation(locationName) {
    const response = await this.httpClient.get('/api/locations/' + locationName +'/photos');
    this.photos = await response.content;
    console.log(this.photos);
    this.currentLocation = locationName;
    //may as well get comments while we're at it!
    const response2 = await this.httpClient.get('/api/locations/' + locationName +'/comments');
    this.comments = await response2.content;
    await this.router.navigateToRoute('photos');
  }



  async addLocation(name: string, description: string, author: string, region: string, latitude: string, longitude: string, _id: string) {
    const location = {
      name: name,
      description: description,
      author: "",
      region: region,
      latitude: latitude,
      longitude: longitude
    };
    const response = await this.httpClient.post('/api/locations', location);
    console.log(response);
    return response;
  }

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
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }


  async uploadPhoto(title: string, selectedImage){
    console.log('now uploading photo for: ' + this.currentLocation);
    let formData = new FormData();
    formData.append('title', title);
    formData.append('location', this.currentLocation);
    formData.append('file', selectedImage);
    console.log('type of selected image is : ' + typeof (selectedImage));
    const response = await this.httpClient.post('/api/locations/' + this.currentLocation + '/photos', formData);
    console.log(response);
  }

  async postComment(comment: string) {
    console.log('poi service is working on the comment now!');
    const newComment = {
      comment: comment,
      author: '',
      location: this.currentLocation,
      time: ''
    };
    console.log('poi service is working on the comment now!' + newComment);
    const response = await this.httpClient.post('api/locations/' + this.currentLocation + '/comments', newComment);
    console.log(response);
    return response;
  }


  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.poi = JSON.stringify(response.content);
      await this.getLocations();
      await this.getUsers();
      await this.getPhotos();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.donation = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.donation !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.poi);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }



  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}

