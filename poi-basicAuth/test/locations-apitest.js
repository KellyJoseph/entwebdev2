'use strict';

//some of these tests randomly don't work. Usually 4/5 tests pass. Sometimes 3/5 and sometimes 5/5
//it seems random

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {

  let locations = fixtures.locations;
  let newLocation = fixtures.newLocation;
  let newLocation2 = fixtures.newLocation2;
  let newLocation3 = fixtures.newLocation3;


  const poiService = new POIService('http://desktop-rm1pdj6:3000');

  setup(async function () {
    await poiService.deleteAllLocations();
  });


  test('create a new location', async function () {
    poiService.deleteAllLocations();

    const returnedLocation = await poiService.createLocation(newLocation);
    console.log(returnedLocation);
    assert.equal(returnedLocation.name, newLocation.name);
    assert.equal(returnedLocation.author, newLocation.author);
    assert.equal(returnedLocation.description, newLocation.description);
    assert.isDefined(returnedLocation._id);
    assert(_.some([returnedLocation], newLocation),  'returnedCandidate must be a superset of newCandidate');
  });

  test('Get location by ID', async function () {
    poiService.deleteAllLocations();

    const createdLocation = await poiService.createLocation(newLocation2);
    const returnedLocation2 = await poiService.getLocation(createdLocation._id);
    assert.equal(createdLocation._id, returnedLocation2._id);
  });


  test('delete a location by ID', async function () {
    poiService.deleteAllLocations();


    let createdLocation = await poiService.createLocation(newLocation3);
    const id = createdLocation._id;
    assert(id != null);
    const beforeDelete = await poiService.getAllLocations(id);
    console.log(beforeDelete);
    await poiService.deleteOneLocation(id);
    const afterDelete = await poiService.getLocation(id);
    assert (afterDelete == null);
  });

  test('Delete all Locations', async function () {
    poiService.deleteAllLocations();


    const response = await poiService.getAllLocations();
    console.log(response.length);
    poiService.deleteAllLocations();
    const response2 = await poiService.getAllLocations();
    assert.equal(response2.length, 0);
  });

  test('Get all locations', async function () {
    poiService.deleteAllLocations();
    const response = await poiService.getAllLocations();
    assert.equal(response.length, 0);
    console.log(locations.length);
    for (let i=0; i < locations.length;i++) {
      await poiService.createLocation(locations[i]);
    }
    const response2 = await poiService.getAllLocations();
    assert.equal(response2.length, locations.length);
    console.log("response length is" + response2.length);

  });



});
