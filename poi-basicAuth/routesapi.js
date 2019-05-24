const Locations = require('./app/api/locations');
const Users = require('./app/api/users');
const Photos = require('./app/api/photos');
const Comments = require('./app/api/comments');

module.exports = [
  { method: 'GET', path: '/api/locations', config: Locations.find },
  { method: 'GET', path: '/api/locations/{id}', config: Locations.findOne },
  { method: 'POST', path: '/api/locations', config: Locations.create },
  { method: 'DELETE', path: '/api/locations/{id}', config: Locations.deleteOne },
  { method: 'DELETE', path: '/api/locations', config: Locations.deleteAll },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },

  { method: 'GET', path: '/api/photos', config: Photos.find },
  { method: 'GET', path: '/api/photos/{id}', config: Photos.findOne },
  { method: 'GET', path: '/api/locations/{name}/photos', config: Photos.findByLocation },
  { method: 'POST', path: '/api/locations/{name}/photos', config: Photos.create },
  { method: 'DELETE', path: '/api/photos/{id}', config: Photos.deleteOne },
  { method: 'DELETE', path: '/api/photos', config: Photos.deleteAll },

  { method: 'GET', path: '/api/comments', config: Comments.find },
  { method: 'GET', path: '/api/comments/{id}', config: Comments.findOne },
  { method: 'GET', path: '/api/locations/{name}/comments', config: Comments.findByLocation },
  { method: 'POST', path: '/api/locations/{name}/comments', config: Comments.create },
  { method: 'DELETE', path: '/api/comments/{id}', config: Comments.deleteOne },
  { method: 'DELETE', path: '/api/comments', config: Comments.deleteAll }
];

