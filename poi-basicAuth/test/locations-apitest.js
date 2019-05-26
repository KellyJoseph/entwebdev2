'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {

  let locations = fixtures.locations;
  let newLocation = fixtures.newLocation;
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


  test('create a new location', async function() {

    const returnedLocation = await poiService.createLocation(newLocation);
    assert(_.some([returnedLocation], newLocation), 'returnedLocation must be a superset of newLocation');
    assert.isDefined(returnedLocation._id);
  });

  test('Get location by ID', async function() {
    poiService.deleteAllLocations();

    const createdLocation = await poiService.createLocation(newLocation);
    const returnedLocation = await poiService.getLocation(createdLocation._id);
    assert.equal(createdLocation._id, returnedLocation._id);
  });


  test('delete a location by ID', async function() {
    poiService.deleteAllLocations();

    let createdLocation = await poiService.createLocation(newLocation);
    const id = createdLocation._id;
    assert(id != null);
    const beforeDelete = await poiService.getAllLocations(id);
    console.log(beforeDelete);
    await poiService.deleteOneLocation(id);
    const afterDelete = await poiService.getLocation(id);
    assert(afterDelete == null);
  });

  test('Delete all Locations', async function() {
    poiService.deleteAllLocations();


    const response = await poiService.getAllLocations();
    console.log(response.length);
    await poiService.deleteAllLocations();
    const response2 = await poiService.getAllLocations();
    assert.equal(response2.length, 0);
  });

  test('Get all locations', async function() {
    poiService.deleteAllLocations();
    const response = await poiService.getAllLocations();
    assert.equal(response.length, 0);
    console.log(locations.length);
    for (let i = 0; i < locations.length; i++) {
      await poiService.createLocation(locations[i]);
    }
    const response2 = await poiService.getAllLocations();
    assert.equal(response2.length, locations.length);
    console.log("response length is" + response2.length);

  });
});