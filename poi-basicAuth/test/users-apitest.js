'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;
  let newUser2 = fixtures.newUser2;
  let newUser3 = fixtures.newUser3;

  const poiService = new POIService('http://desktop-rm1pdj6:3000');



  test('create a new user', async function () {
    poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    console.log(returnedUser);
    console.log(newUser);
    assert.equal(returnedUser.firstName, newUser.firstName);
    assert.equal(returnedUser.lastName, newUser.lastName);
    assert.equal(returnedUser.email, newUser.email);
    assert.isDefined(returnedUser._id);
    assert(_.some([returnedUser], newUser),  'returnedUser must be a superset of newUser');
  });

  test('get invalid User', async function () {
    const c1 = await poiService.getUser('1234');
    assert.isNull(c1);
    const c2 = await poiService.getUser('012345678901234567890123');
    assert.isNull(c2);
  });


  test('Get user by ID', async function () {
    poiService.deleteAllUsers();

    const createdUser = await poiService.createUser(newUser2);
    const returnedUser2 = await poiService.getUser(createdUser._id);
    assert.equal(createdUser._id, returnedUser2._id);
  });



  test('delete a user by ID', async function () {
    poiService.deleteAllUsers();

    let createdUser = await poiService.createUser(newUser3);
    const id = createdUser._id;
    assert(id != null);
    const beforeDelete = await poiService.getUser(id);
    console.log(beforeDelete);
    await poiService.deleteOneUser(id);
    const afterDelete = await poiService.getUser(id);
    assert (afterDelete == null);
  });


  test('Delete all Users', async function () {
    poiService.deleteAllUsers();

    const response = await poiService.getAllUsers();
    console.log(response.length);
    poiService.deleteAllUsers();
    const response2 = await poiService.getAllUsers();
    assert.equal(response2.length, 0);
  });

  //timing is screwing these tests up


  test('Get all users', async function () {
    poiService.deleteAllUsers();
    const response = await poiService.getAllUsers();
    assert.equal(response.length, 0);
    for (let i=0; i < users.length;i++) {
      await poiService.createUser(users[i]);
    }
    const response2 = await poiService.getAllUsers();
    assert.equal(response2.length, 4);
    poiService.deleteAllUsers();
  });

});