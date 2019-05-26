'use strict';

const Location = require('../models/location');
const Photo = require('../models/photo');
const Boom = require('boom');
const utils = require('./utils');


const Locations = {

  find: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const locations = await Location.find();
      return locations;
    }
  },

  findOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const location = await Location.findOne({ _id: request.params.id });
        if (!location) {
          return Boom.notFound('No Location with this id');
        }
        return location;
      } catch (err) {
        return Boom.notFound('No Location with this id')
      }
    }
  },
  create: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      console.log("create location API handler at work");
      const userId = utils.getUserIdFromRequest(request);
      const newLocation = new Location(request.payload);
      newLocation.author = userId;
      const location = await newLocation.save();
      if (location) {
        return h.response(location).code(201);
        return location;
      }
      return Boom.badImplementation('error creating location');
    }
  },

  deleteAll: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Location.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      console.log("delete location handler at work");
      const userId = utils.getUserIdFromRequest(request);
      console.log("user id is: " + userId);
      const returnedLocation = await Location.findOne({ _id: request.params.id });
      console.log("location author id is: " + returnedLocation.author);
      if (userId === returnedLocation.author) {
        const response = await Location.deleteOne({ _id: request.params.id });
        if (response.deletedCount === 1) {
          console.log("delete was successful");
          return { success: true };
        }
        console.log("userId and author id don't match");
        return Boom.badRequest('userId not a match for author id');
      }
      return Boom.notFound('id not found');
    }
  },

};

module.exports = Locations;