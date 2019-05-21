'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// Models are defined through the Mongoose.Schema interface. Has built in set and get methods, also has the pseudo join
// method populate(). ref model tells Mongo which model to use during population

const photoSchema = new Schema({
  title: String,
  url: String,
  public_id: String,
  location: String,
  uploader: String
});


photoSchema.statics.findById = function(id) {
  return this.findOne({ _id : id});
};

module.exports = Mongoose.model('Photo', photoSchema);