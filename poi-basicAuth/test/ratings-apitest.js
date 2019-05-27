'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {


  let newLocation = fixtures.newLocation;
  let newRating = fixtures.newRating;
  let ratings = fixtures.ratings;
  let newUser = fixtures.newUser;


  const poiService = new POIService('http://desktop-rm1pdj6:3000');

  suiteSetup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(returnedUser);
  });

  suiteTeardown(async function() {
    await poiService.deleteAllUsers();
    await poiService.deleteAllLocations();
    poiService.clearAuth();
  });


  test('create a new rating', async function() {
    const returnedLocation = await poiService.createLocation(newLocation);
    const returnedRating = await poiService.createRating(newLocation.name, newRating);
    console.log(newRating);
    assert.equal(newRating.rating, returnedRating.rating);

    assert(_.some([returnedRating], newRating), 'returnedRating must be a superset of newLocation');
    assert.isDefined(returnedRating._id);
  });

  test('Get rating by ID', async function() {
    poiService.deleteAllRatings();

    const createdRating = await poiService.createRating(newLocation.name, newRating);
    assert.isDefined(createdRating._id);
    const searchedRating = await poiService.getRating(createdRating._id);
    assert.isDefined(searchedRating._id);
    assert.equal(createdRating._id, searchedRating._id);
  });

  test('delete a rating by ID', async function() {
    poiService.deleteAllRatings();

    const createdRating = await poiService.createRating(newLocation.name, newRating);
    assert.isDefined(createdRating._id);
    const beforeDelete = await poiService.getRating(createdRating._id);
    await assert.isDefined(beforeDelete._id);
    await poiService.deleteOneComment(createdRating._id);
    const afterDelete = await poiService.getRating(createdRating._id);
    !assert.isDefined(afterDelete);
  });


  test('Get all Ratings by location', async function() {
    poiService.deleteAllRatings();
    poiService.deleteAllLocations();
    for (let i = 0; i < ratings.length; i++) {
      await poiService.createRating(newLocation.name, ratings[i]);
    }
    const allRatings = await poiService.getAllRatings();
    assert.equal(allRatings.length, 3);
    for (let i = 0;i < allRatings.length; i ++) {
      assert(_.some([allRatings[i]], ratings[i]), 'returned donation must be a superset of donation');
      assert.isDefined(allRatings[i]._id);
    }
  });

  test('Delete all Ratings', async function() {
    poiService.deleteAllRatings();
    poiService.deleteAllLocations();
    for (let i = 0; i < ratings.length; i++) {
      await poiService.createRating(newLocation.name, ratings[i]);
    }
    const allRatings = await poiService.getAllRatings();
    //assert.equal(allRatings.length, 3);
    for (let i = 0; i < allRatings.length; i ++) {
      assert(_.some([allRatings[i]], ratings[i]), 'allRatings[i] must be a superset of ratings[i]');
      assert.isDefined(allRatings[i]._id);
    }
    await  poiService.deleteAllRatings();
    const allComments2 = await poiService.getAllRatings();
    assert.equal(allComments2.length, 0);

  });



});