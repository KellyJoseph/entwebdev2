'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {


  let newLocation = fixtures.newLocation;
  let newComment = fixtures.newComment;
  let comments = fixtures.comments;
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


  test('create a new comment', async function() {
    const returnedLocation = await poiService.createLocation(newLocation);
    const returnedComment = await poiService.createComment(newLocation.name, newComment);
    console.log(newComment);
    assert.equal(newComment.comment, returnedComment.comment);

    assert(_.some([returnedComment], newComment), 'returnedComment must be a superset of newLocation');
    assert.isDefined(returnedComment._id);
  });

  test('Get comment by ID', async function() {
    poiService.deleteAllComments();

    const createdComment = await poiService.createComment(newLocation.name, newComment);
    assert.isDefined(createdComment._id);
    const searchedComment = await poiService.getComment(createdComment._id);
    assert.isDefined(searchedComment._id);
    assert.equal(createdComment._id, searchedComment._id);
  });

  test('delete a comment by ID', async function() {
    poiService.deleteAllComments();

    const createdComment = await poiService.createComment(newLocation.name, newComment);
    assert.isDefined(createdComment._id);
    const beforeDelete = await poiService.getComment(createdComment._id);
    assert.isDefined(beforeDelete._id);
    await poiService.deleteOneComment(createdComment._id);
    const afterDelete = await poiService.getComment(createdComment._id);
    assert(afterDelete == null);
  });

  test('Get all Comments by locations', async function() {
    poiService.deleteAllComments();
    poiService.deleteAllLocations();
    for (let i = 0; i < comments.length; i++) {
      await poiService.createComment(newLocation.name, comments[i]);
    }
    const allComments = await poiService.getAllComments();
    assert.equal(allComments.length, 3);
    for (let i = 0;i < allComments.length; i ++) {
      assert(_.some([allComments[i]], comments[i]), 'returned donation must be a superset of donation');
      assert.isDefined(allComments[i]._id);
    }
  });

  test('Delete all Comments', async function() {
    poiService.deleteAllComments();
    poiService.deleteAllLocations();
    for (let i = 0; i < comments.length; i++) {
      await poiService.createComment(newLocation.name, comments[i]);
    }
    const allComments = await poiService.getAllComments();
    //assert.equal(allComments.length, 3);
    for (let i = 0;i < allComments.length; i ++) {
      assert(_.some([allComments[i]], comments[i]), 'allComments[i] must be a superset of comments[i]');
      assert.isDefined(allComments[i]._id);
    }
    await  poiService.deleteAllComments();
    const allComments2 = await poiService.getAllComments();
    assert.equal(allComments2.length, 0);

  });



});


