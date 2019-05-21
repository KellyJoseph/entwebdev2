'use strict';

const User = require('../models/user');
const Boom = require('boom');

const Users = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const users = await User.find();
      return users;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound('No Location with this id');
        }
        return user;
      } catch (err) {
        return Boom.notFound('No Location with this id')
      }
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newUser = new User(request.payload);
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
        return user;
      }
      return Boom.badImplementation('error creating location');
    }
  },
  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await User.remove({});
      return { success: true };
    }
  },
  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      //const response = await Location.remove({ _id: request.params.id });
      const response = await User.deleteOne({ _id: request.params.id });
      if (response.deletedCount === 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }

};

module.exports = Users;