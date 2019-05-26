'use strict';

const Rating = require('../models/rating');
const User = require('../models/user');
const Boom = require('boom');
const utils = require('./utils');
const moment = require('moment');


const Ratings = {

  find: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const ratings = await Rating.find();
      return ratings;
    }
  },

  findByLocation: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const ratings = await Rating.find({ location: request.params.name });
      return ratings;
    }
  },

  findOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      console.log("finding rating by ID from Ratings API handler");
      try {
        const rating = await Rating.findOne({ _id: request.params.id });
        if (!rating) {
          return Boom.notFound('No Rating with this id');
        }
        return rating;
      } catch (err) {
        return Boom.notFound('No Comment with this id');
      }
    }
  },

  create: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      console.log("comment request received by handler, payload is: " + request.payload.rating);
      const userId = utils.getUserIdFromRequest(request);
      const author = await User.findOne({ _id: userId });
      const currentTime = moment();
      const newRating = new Rating({
        rating: request.payload.rating,
        author: author.firstName + " " + author.lastName,
        authorId: userId,
        location: request.params.name,
        time: currentTime
      })
      console.log("new rating is: " + newRating)
      await newRating.save();
      return newRating;
    }
  },

  deleteAll: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const ratings = await Rating.find();
        console.log("photos length: " + ratings.length);
        await Rating.remove({});
        return { success: true };
      } catch (err) {
        return Boom.notFound('No Location with this id')
      }
    }
  },

  //every time the server starts and init data is loaded to db, the user _id changes, so may not math that of comment!
  deleteOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      const ratingToDelete = await Comment.findOne({ _id: request.params.id });
      console.log("user id is: " + userId + " and comment author id is " + ratingToDelete.authorId );
      if (userId === ratingToDelete.authorId ) {
        const response = await Rating.deleteOne({ _id: request.params.id });
        if (response.deletedCount === 1) {
          return { success: true };
        }
        return Boom.notFound('id not found');
      }
      return Boom.notImplemented("user id doesn't match the id of the comment author");
    }
  }
};


module.exports = Ratings;
