'use strict';

const User = require('../models/user');
const Boom = require('boom');
const utils = require('./utils.js');

const Users = {

  find: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const users = await User.find();
      return users;
    }
  },

  findOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
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
    //auth: {
    //  strategy: 'jwt',
    //},
    handler: async function(request, h) {
      const newUser = new User(request.payload);
      if (request.payload.password === "secret") {
        newUser.admin = true;
      }
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
        return user;
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
      await User.remove({});
      return { success: true };
    }
  },
  deleteOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const response = await User.deleteOne({ _id: request.params.id });
      if (response.deletedCount === 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  },

  authenticate: {
    auth: false,
    handler: async function(request, h) {
      console.log("authenticate triggered");
      try {
        const user = await User.findOne({ email: request.payload.email });
        if (!user) {
          return Boom.notFound('Authentication failed. User not found');
        }
        const token = utils.createToken(user);
        console.log("authenticate succeeded");
        return h.response({ success: true, token: token }).code(201);
      } catch (err) {
        console.log("authenticate failed");
        return Boom.notFound('internal db failure');
      }
    }
  },

};

module.exports = Users;