'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// Models are defined through the Mongoose.Schema interface. Has built in set and get methods, also has the pseudo join
// method poppulate(). ref model tells Mongo which model to use during population

const ratingSchema = new Schema({
  rating: Number,
  author: String,
  authorId: String,
  location: String,
  time: String
});

module.exports = Mongoose.model('Rating', ratingSchema);

