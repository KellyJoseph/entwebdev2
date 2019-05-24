'use strict';

const Comment = require('../models/comment');
const User = require('../models/user');
const Boom = require('boom');
const utils = require('./utils');
const moment = require('moment');


const Comments = {

  find: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const comments = await Comment.find();
      return comments;
    }
  },

  findByLocation: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const comments = await Comment.find({ location: request.params.name });
      return comments;
    }
  },

  findOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const comment = await Comment.findOne({ _id: request.params.id });
        if (!comment) {
          return Boom.notFound('No Comment with this id');
        }
        return comment;
      } catch (err) {
        return Boom.notFound('No Comment with this id');
      }
    }
  },

  create: {
    auth: false,
    //auth: {
    //  strategy: 'jwt',
    //},
    handler: async function(request, h) {
      console.log("comment request received by handler, payload is: " + request.payload.comment);
      const userId = utils.getUserIdFromRequest(request);
      const author = await User.findOne({ _id: userId });
      const currentTime = moment();
      const newComment = new Comment({
        comment: request.payload.comment,
        author: author.firstName + " " + author.lastName,
        authorId: userId,
        location: request.params.name,
        time: currentTime
      })
      console.log("new comment is: " + newComment)
      await newComment.save();
      return newComment;
    }
  },

  deleteAll: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const comments = await Comment.find();
        //console.log("photos length: " + photos.length);
        await Comment.remove({});
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
      const commentToDelete = await Comment.findOne({ _id: request.params.id });
      console.log("user id is: " + userId + " and comment author id is " + commentToDelete.authorId );
      if (userId === commentToDelete.authorId ) {
        const response = await Comment.deleteOne({ _id: request.params.id });
        if (response.deletedCount === 1) {
          return { success: true };
        }
        return Boom.notFound('id not found');
      }
      return Boom.notImplemented("user id doesn't match the id of the comment author");
    }
  }
};


module.exports = Comments;
