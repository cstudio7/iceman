"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _sinon = _interopRequireDefault(require("sinon"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _index = _interopRequireDefault(require("../index"));

var _testHelper = _interopRequireDefault(require("../utils/testHelper"));

var _models = _interopRequireDefault(require("../models"));

var _helpers = _interopRequireDefault(require("../utils/helpers"));

var _insertTestRoles = _interopRequireDefault(require("../utils/insertTestRoles"));

_chai.default.use(_chaiHttp.default);

let stub;
let fakeToken;
const urlPrefix = '/api/v1';
describe('/api/v1/auth', () => {
  let passwordResetToken;
  after(async () => {
    await _testHelper.default.destroyModel('Request');
    await _testHelper.default.destroyModel('User');
    await _testHelper.default.destroyModel('Role');
  });
  before(async () => {
    await _testHelper.default.destroyModel('Request');
    await _testHelper.default.destroyModel('User');
    await _testHelper.default.destroyModel('Role');
    await _models.default.Role.bulkCreate(_insertTestRoles.default);
    fakeToken = await _helpers.default.genToken({
      email: 'fake@chubi.com'
    });
    await _models.default.User.create({
      firstName: 'irellevant',
      lastName: 'Tester',
      email: 'testa@test.com',
      password: 'PasswordTest123'
    });
    await _models.default.User.create({
      firstName: 'irellevantwww',
      lastName: 'Testerww',
      email: 'fake@chubi.com',
      password: 'PasswordTest123'
    });
  });
  beforeEach(async () => {
    stub = _sinon.default.stub(_mail.default, 'send').resolves({});
  });
  afterEach(async () => {
    stub.restore();
  });
  describe('POST /forgot_password', () => {
    it('should return an error for an unregistered user', async () => {
      const {
        status,
        text
      } = await _chai.default.request(_index.default).post(`${urlPrefix}/auth/forgot_password`).send({
        email: 'yahan@mail.com'
      });
      (0, _chai.expect)(status).to.equal(400);
      (0, _chai.expect)(JSON.parse(text).error).to.equal('Email not found');
    });
    it('should send a message, token and an email for a registered user', async () => {
      const {
        status,
        text
      } = await _chai.default.request(_index.default).post(`${urlPrefix}/auth/forgot_password`).send({
        email: 'testa@test.com'
      });
      passwordResetToken = await JSON.parse(text).data.token;
      (0, _chai.expect)(JSON.parse(text).data.token).to.equal(passwordResetToken);
      (0, _chai.expect)(status).to.equal(200);

      _sinon.default.assert.calledOnce(stub);
    });
  });
  describe('POST /reset_password/:token', () => {
    it('should return an error for invalid password', async () => {
      const {
        status,
        text
      } = await _chai.default.request(_index.default).patch(`${urlPrefix}/auth/reset_password/${passwordResetToken}`).send();
      (0, _chai.expect)(JSON.parse(text).error).to.equal('Password must contain at least one letter, at least one number, and be atleast 8 digits long');
      (0, _chai.expect)(status).to.equal(400);
    });
    it('should return an error for an invalid token', async () => {
      const {
        status,
        text
      } = await _chai.default.request(_index.default).patch(`${urlPrefix}/auth/reset_password/token`).send({
        password: 'testa567890testcom'
      });
      (0, _chai.expect)(JSON.parse(text).error).to.equal('jwt malformed');
      (0, _chai.expect)(status).to.equal(400);
    });
    it('should return an error for an invalid token', async () => {
      const {
        status,
        text
      } = await _chai.default.request(_index.default).patch(`${urlPrefix}/auth/reset_password/${fakeToken}`).send({
        password: 'testa567890testcom'
      });
      (0, _chai.expect)(JSON.parse(text).error).to.equal('Invalid token');
      (0, _chai.expect)(status).to.equal(400);
    });
    it('should return a message on succesful update', async () => {
      const {
        status,
        text
      } = await _chai.default.request(_index.default).patch(`${urlPrefix}/auth/reset_password/${passwordResetToken}`).send({
        password: 'pas888swogrd'
      });
      (0, _chai.expect)(status).to.equal(200);
      (0, _chai.expect)(JSON.parse(text).data).to.equal('Password reset successfully');
    });
  });
});