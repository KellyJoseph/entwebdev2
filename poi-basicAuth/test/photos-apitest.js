'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {

  let photos = fixtures.photos;
  let newLocation =fixtures.newLocation;
  let newPhoto = fixtures.newPhoto;
  this.timeout(0)


  const poiService = new POIService('http://desktop-rm1pdj6:3000');
  poiService.deleteAllPhotos();

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
    //the returned location's name is send as the location to the photo creation handler which will assign it to the
    //location of the photo object it creates. This is done in lieu of route params.
    //it would normally be sent from the view as a route parameter variable
    const createdPhoto = await poiService.createPhoto(returnedLocation.name, newPhoto);
    console.log(createdPhoto);
    assert.equal(createdPhoto.title, newPhoto.title);
    console.log(newPhoto);
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
    poiService.deleteOneLocation(returnedLocation._id)


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

});