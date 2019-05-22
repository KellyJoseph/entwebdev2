'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';
const Boom = require('boom');


class POIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllLocations() {
    try {
      const response = await axios.get(this.baseUrl + '/api/locations');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getAllUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getAllPhotos() {
    try {
      const response = await axios.get(this.baseUrl + '/api/photos');
      return response.data;
    } catch (e) {
      return null;
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////
  async getLocation(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/locations/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPhoto(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/photos/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////

  async createLocation(newLocation) {
    try {
      const response = await axios.post(this.baseUrl + '/api/locations', newLocation);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPhoto(name, newPhoto) {
    try {
      const response = await axios.post(this.baseUrl + '/api/locations/' + name + '/photos', newPhoto);
      return response.data;
    } catch (e) {
      return null;
    }
  }
///////////////////////////////////////////////////////////////////////////////////////

  async deleteAllLocations() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/locations');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers () {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPhotos () {
    try {
      const response = await axios.delete(this.baseUrl + '/api/photos');
      return response.data;
    } catch (e) {
      return null;
    }
  }


///////////////////////////////////////////////////////////////////////////////////////////

  async deleteOneLocation(id) {
    const response = await axios.delete(this.baseUrl + '/api/locations/' + id);
    return response.data;
  }

  async deleteOneUser(id) {
    const response = await axios.delete(this.baseUrl + '/api/users/' + id);
    return response.data;
  }


  async deleteOnePhoto (id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/photos/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common['Authorization'] = '';
  }




}

module.exports = POIService;