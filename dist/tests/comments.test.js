"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _models = _interopRequireDefault(require("../models"));

var _testHelper = _interopRequireDefault(require("../utils/testHelper"));

var _sampleData = require("./testData/sampleData");

_chai.default.use(_chaiHttp.default);

let authToken;
let imposterToken;
let imposterToken2;
let commentId;
let requestId;
let badRequestId;
const URL_PREFIX = '/api/v1/requests';
describe('api/v1/requests/:requestId/comments', () => {
  before(async () => {
    await _testHelper.default.destroyModel('Request');
    await _testHelper.default.destroyModel('User');
    await _testHelper.default.destroyModel('Comment');
    await _testHelper.default.destroyModel('Department');
    await _testHelper.default.destroyModel('UserDepartment');
    const {
      token
    } = await _testHelper.default.createUser({ ..._sampleData.user1,
      isVerified: true
    });
    const {
      token: token1
    } = await _testHelper.default.createUser({ ..._sampleData.user2,
      isVerified: true
    });
    const {
      token: token2
    } = await _testHelper.default.createUser({ ..._sampleData.user3,
      isVerified: true
    });
    const {
      body: {
        data: {
          id
        }
      }
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/one-way`).set('token', token).send(_sampleData.oneWayTrip);
    const {
      body: {
        data: {
          id: second
        }
      }
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/one-way`).set('token', token).send(_sampleData.oneWayTrip2);
    await _models.default.Department.bulkCreate(_sampleData.departments);
    await _models.default.UserDepartment.bulkCreate(_sampleData.userDepartments);
    authToken = token;
    imposterToken = token1;
    imposterToken2 = token2;
    requestId = id;
    badRequestId = second;
  });
  it('should return an error when there are no comments', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).get(`${URL_PREFIX}/${requestId}/comments`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('The are no comments on this request');
  });
  it('should create a comment with valid data', async () => {
    const {
      body: {
        data: {
          comment,
          id
        }
      },
      status
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/${requestId}/comments`).set('token', authToken).send(_sampleData.commentBody);
    commentId = id;
    (0, _chai.expect)(status).to.equal(201);
    (0, _chai.expect)(comment).to.equal('this is a comment');
  });
  it('should return an error when a non manager or user tries to comment', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/${requestId}/comments`).set('token', imposterToken2).send(_sampleData.commentBody);
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('You cannot comment on this request');
  });
  it('should return an error if request does not exist', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/10000/comments`).set('token', authToken).send(_sampleData.commentBody);
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('Request does not exist');
  });
  it('should return an error  with invalid data', async () => {
    const {
      body: {
        error: [first]
      },
      status
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/${requestId}/comments`).set('token', authToken).send('commentBody');
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(first).to.equal('Comment is required');
  });
  it('should return an error message for invalid request id', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).post(`${URL_PREFIX}/requestId/comments`).set('token', authToken).send(_sampleData.commentBody);
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('invalid input syntax for integer: "requestId"');
  });
  it('should return an error when a non manager or user tries to view comment', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).get(`${URL_PREFIX}/${requestId}/comments`).set('token', imposterToken2).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('You cannot see these comments');
  });
  it('should get requests comments', async () => {
    const {
      body: {
        data: [first]
      },
      status
    } = await _chai.default.request(_index.default).get(`${URL_PREFIX}/${requestId}/comments`).set('token', authToken).send();
    const {
      comment
    } = first;
    (0, _chai.expect)(status).to.equal(200);
    (0, _chai.expect)(comment).to.equal('this is a comment');
  });
  it('should return an error message if request does not exist', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).get(`${URL_PREFIX}/1000/comments`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('Request does not exist');
  });
  it('should throw an error for invalid request id', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).get(`${URL_PREFIX}/requestId/comments`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('invalid input syntax for integer: "requestId"');
  });
  it('should update the deleted field', async () => {
    const {
      body: {
        data
      },
      status
    } = await _chai.default.request(_index.default).delete(`${URL_PREFIX}/${requestId}/comments/${commentId}`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(200);
    (0, _chai.expect)(data).to.equal('Comment deleted');
  });
  it('should throw an error for an incorrect request id', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).delete(`${URL_PREFIX}/${badRequestId}/comments/${commentId}`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('Incorrect request id');
  });
  it('should throw an error for wrong', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).delete(`${URL_PREFIX}/${requestId}/comments/${commentId}`).set('token', imposterToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('This Comment is not yours');
  });
  it('should return an error when attempting to delete with an invalid comment id', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).delete(`${URL_PREFIX}/${requestId}/comments/commentId`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('invalid input syntax for integer: "commentId"');
  });
  it('should return an error when attempting to delete a comment with the wrong id', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).delete(`${URL_PREFIX}/10000/comments/${commentId}`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('Request does not exist');
  });
  it('should return an error when attempting to delete comment that does not exist', async () => {
    const {
      body: {
        error
      },
      status
    } = await _chai.default.request(_index.default).delete(`${URL_PREFIX}/${requestId}/comments/666`).set('token', authToken).send();
    (0, _chai.expect)(status).to.equal(400);
    (0, _chai.expect)(error).to.equal('Comment does not exist');
  });
});