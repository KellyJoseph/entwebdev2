'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const testPhoto = require('./test.jpg');
const _ = require('lodash');
var chai = require('chai');
var chaiFiles = require('chai-files');

suite('POI API tests', function () {

  let photos = fixtures.photos;
  let newLocation =fixtures.newLocation;
  let newPhoto = fixtures.newPhoto;
  let newUser = fixtures.newUser;
  let testImage = testPhoto;
  this.timeout(0)


  const poiService = new POIService('http://desktop-rm1pdj6:3000');

  suiteSetup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(returnedUser);
  });

  suiteTeardown(async function() {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });

  test('Get all photos', async function () {
    await poiService.deleteAllPhotos();
    for (let i=0; i < photos.length;i++) {
      await poiService.createPhoto(photos[i].location, photos[i]);
    }
    const allPhotos = await poiService.getAllPhotos();
    assert.equal(allPhotos.length, photos.length);
    poiService.deleteAllPhotos();
  });

  test('create a photo', async function() {
    poiService.deleteAllPhotos();
    const returnedLocation = await poiService.createLocation(newLocation);
    console.log(returnedLocation.name);
    let formData = new FormData();
    formData.append('title', newPhoto.title);
    formData.append('file', testImage);

    const uploadedPhoto = await poiService.createPhoto("Hokkaido, formData");


    console.log(uploadedPhoto);
    assert(_.some([createdPhoto], newPhoto),  'createdPhoto must be a superset of newPhoto');
    poiService.deleteAllPhotos();
    poiService.deleteOneLocation(returnedLocation._id)
  });



  test('get photo by ID', async function() {
    poiService.deleteAllPhotos();
    const returnedLocation = await poiService.createLocation(newLocation);
    console.log(returnedLocation.name);
    const createdPhoto = await poiService.createPhoto(returnedLocation.name, newPhoto);
    const searchedPhoto  = await poiService.getPhoto(createdPhoto._id);
    console.log(searchedPhoto);
    console.log(createdPhoto);
    assert.equal(createdPhoto._id, searchedPhoto._id);
    poiService.deleteAllPhotos();
    poiService.deleteOneLocation(returnedLocation._id
  });

  test('delete photo by ID', async function() {
    poiService.deleteAllPhotos();
    const returnedLocation = await poiService.createLocation(newLocation);
    const createdPhoto = await poiService.createPhoto(returnedLocation.name, newPhoto);
    const searchedPhoto = await poiService.getPhoto(createdPhoto._id);
    assert.equal(searchedPhoto._id, createdPhoto._id);
    await poiService.deleteOnePhoto(createdPhoto._id);
    const searchedPhoto2 = await poiService.getPhoto(createdPhoto._id);
    assert.equal(searchedPhoto2, null);
    poiService.deleteOneLocation(returnedLocation._id)

  });

  test('Delete all Photos', async function () {
    for (let i=0; i < photos.length;i++) {
      await poiService.createPhoto(photos[i].location, photos[i]);
    }
    const response = await poiService.getAllPhotos();
    console.log("photos before delete: " + response.length);
    poiService.deleteAllPhotos();
    const response2 = await poiService.getAllPhotos();
    console.log("photos after delete: " + response.length);
    assert.equal(response2.length, 0);
  });

  test('create a donation and check donor', async function() {
    const returnedUser = await poiService.createUser(newUser);
    await poiService.createPhoto(returnedUser._id, photos[0]);
    const returnedPhotos = await poiService.getPhoto((returnedUser._id));
    assert.isDefined(returnedPhotos[0].uploader);
  });

});