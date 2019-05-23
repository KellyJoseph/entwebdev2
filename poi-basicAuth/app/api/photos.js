'use strict';

const Photo = require('../models/photo');
const Boom = require('boom');
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);



const Photos = {

  find: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const photos = await Photo.find();
      return photos;
    }
  },

  findByLocation: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const photos = await Photo.find({ location: request.params.name });
      return photos;
    }
  },

  findOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const photo = await Photo.findOne({ _id: request.params.id });
        if (!photo) {
          return Boom.notFound('No Photo with this id');
        }
        return photo;
      } catch (err) {
        return Boom.notFound('No Photo with this id');
      }
    }
  },


  create: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      //const userId = utils.getUserIdFromRequest(request);
      //console.log("jwt extracted user is is: " + userId);
      const photo = request.payload.file;
      await writeFile('./public/temp.img', photo);
      const result = await cloudinary.v2.uploader.upload('./public/images/kitten.jpg', function(error, result) {
        // const result = await cloudinary.v2.uploader.upload('./public/temp.img', function(error, result) {
        //console.log(result)
      });
      const newPhoto = new Photo({
        title: request.payload.title,
        url: result.url,
        public_id: result.public_id,
        location: request.params.name
        //uploader: ""
      })
      await newPhoto.save();
      return newPhoto;
    }
  },

  deleteAll: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const photos = await Photo.find();
        //console.log("photos length: " + photos.length);
        for (let i = 0; i < photos.length; i++) {
          await cloudinary.v2.uploader.destroy(photos[i].public_id, {}, function(error, result) {
          //  console.log("photo id is " + photos[i].public_id);
          });
        }
        await Photo.remove({});
        return { success: true };
      } catch (err) {
        return Boom.notFound('No Location with this id')
      }
    }
  },

  deleteOne: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const returnedPhoto = await Photo.findOne({ _id: request.params.id });
      await cloudinary.v2.uploader.destroy(returnedPhoto.public_id, {}, function(error, result) { // delete the image from cloudinary
       // console.log(result)
      });
      const response = await Photo.deleteOne({ _id: request.params.id });
      if (response.deletedCount === 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  },

  deleteImage: {
    //auth: false,
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const mongoid = request.params.id; //get the id for the mongodb object. T
      const photoToDelete = await Photo.findById(mongoid); //use that id to retrieve the mongodb document object
      const public_id = photoToDelete.public_id; //obtain the public_id for the cloudinary image in the photo object
      //console.log(photoToDelete);
      await cloudinary.v2.uploader.destroy(public_id, {}, function(error, result) { // delete the image from cloudinary
      //  console.log(result)
      });
      const photo = await Photo.remove({_id: request.params.id}) //delete the object from mongodb
      return h.redirect('/listlocations');
    }
  }

};

module.exports = Photos;