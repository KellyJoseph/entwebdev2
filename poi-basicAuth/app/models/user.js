'use strict';

const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');     // ADDED
const Schema = Mongoose.Schema;

// Models are defined through the Mongoose.Schema interface. Has built in set and get methods, also has the pseudo join
// method poppulate(). ref model tells Mongo which model to use during population

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  admin: Boolean
});

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(candidatePassword) {     // EDITED
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = Mongoose.model('User', userSchema);