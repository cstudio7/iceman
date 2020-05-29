"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _sinon = _interopRequireDefault(require("sinon"));

var _index = _interopRequireDefault(require("../index"));

var _testHelper = _interopRequireDefault(require("../utils/testHelper"));

var _helpers = _interopRequireDefault(require("../utils/helpers"));

var _models = _interopRequireDefault(require("../models"));

var _insertTestRoles = _interopRequireDefault(require("../utils/insertTestRoles"));

_chai.default.use(_chaiHttp.default);

_chai.default.should();

let send;
let userToken;
const URL_PREFIX = '/api/v1/auth';
const user = {
  firstName: 'Samuel',
  lastName: 'koroh',
  email: 'user1@gmail.com',
  password: 'Ice5m5am0a843r03'
};
const user2 = {
  firstName: 'Test',
  lastName: 'Tester',
  email: 'test@test.com',
  password: 'PasswordTest123'
};
const user3 = {
  firstName: 'Elijah',
  lastName: 'Enuem-Udogu',
  email: 'koppter.kom@gmail.com',
  password: 'elijah1994'
};
const profileDetails = {
  firstName: 'Elijah',
  lastName: 'Enuem-Udogu',
  gender: 'Male',
  dateOfBirth: '1994-05-20',
  preferredLanguage: 'English',
  residentialAddress: 'Benin City, Nigeria',
  preferredCurrency: 'Nigerian Naira (NGN)'
};
describe('/api/v1/auth', () => {
  let verifiedUser, notVerifiedUser;
  before(async () => {
    await _testHelper.default.destroyModel('Role');
    await _testHelper.default.destroyModel('Request');
    await _testHelper.default.destroyModel('User');
    await _models.default.Role.bulkCreate(_insertTestRoles.default);
    await _testHelper.default.createUser({ ...user,
      roleId: 5
    });
    notVerifiedUser = await _testHelper.default.createUser({ ...user,
      email: 'user2@gmail.com'
    });
  });
  describe('POST /login', () => {
    it('should return 400 if the user is not found', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/login`).set('Content-Type', 'application/json').send({
        email: 'email@email.com',
        password: 'password12344'
      });
      res.should.have.status(400);
    });
    it('should return 400 if passed an empty object', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/login`).set('Content-Type', 'application/json').send({});
      res.should.have.status(400);
    });
    it('should return 400 if the user account is not yet verified', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/login`).set('Content-Type', 'application/json').send({
        email: notVerifiedUser.email,
        password: user.password
      });
      res.should.have.status(400);
    });
    it('should return 200 if the user account is verified', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/login`).set('Content-Type', 'application/json').send(_helpers.default.pickFields(user, ['email', 'password']));
      res.should.have.status(200);
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('roleId');
    });
    it('should return 400 if the user account is verified but password not valid', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/login`).set('Content-Type', 'application/json').send({
        email: user.email,
        password: '3545trfgvcvv'
      });
      res.should.have.status(400);
    });
  });
  describe('Social Login Test', () => {
    it('Should return 200 if user is authenticated with Google', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/google/callback`);
      res.should.have.status(200);
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('roleId');
    });
    it('Should return 200 if user is authenticated with Facebook', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/facebook/callback`);
      res.should.have.status(200);
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('roleId');
    });
  });
  describe('POST /signup', () => {
    beforeEach(async () => {
      send = _sinon.default.stub(_mail.default, 'send').resolves({});
    });
    afterEach(async () => {
      send.restore();
    });
    it('should return error if user email already exist', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).set('Content-Type', 'application/json').send(user);
      res.should.have.status(409);
      res.body.should.have.property('status').eql('error');
    });
    it('should return 201 if user account was created', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).set('Content-Type', 'application/json').send(user2);
      res.should.have.status(201);
      res.body.should.have.property('status').eql('success');
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('roleId');
    });
  });
  describe('SIGNUP INPUT VALIDATION', () => {
    it('should not register a user when all required fields are empty', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.error.should.equal('First Name is required');
    });
    it('should not register a user when last name are provided', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'john',
        lastName: '',
        email: 'doe@mail.com',
        password: 'john12345'
      });
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.error.should.equal('Last Name is required');
    });
    it('should not register a user when email is not provided', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'john',
        lastName: 'doe',
        email: '',
        password: ''
      });
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.error.should.equal('Email must be a valid email address e.g example@mail.com or example@mail.co.uk');
    });
    it('should not register a user when password is not provided', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'john',
        lastName: 'doe',
        email: 'doe@mail.com',
        password: ''
      });
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.error.should.equal('Password must contain at least one letter, at least one number, and be atleast 8 digits long');
    });
    it('should not register a user when a valid email is not provided', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'john',
        lastName: 'doe',
        email: 'doemail.com',
        password: '123345678'
      });
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.error.should.equal('Email must be a valid email address e.g example@mail.com or example@mail.co.uk');
    });
    it('should not register a user when password is not a mixture of numbers and letters and atleast 8 characters long', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'john',
        lastName: 'doe',
        email: 'doe@mail.com',
        password: '123345678'
      });
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.error.should.equal('Password must contain at least one letter, at least one number, and be atleast 8 digits long');
    });
  });
  describe('Verify User email', () => {
    beforeEach(async () => {
      send = await _sinon.default.stub(_mail.default, 'send').resolves({});
    });
    afterEach(async () => {
      await send.restore();
    });
    it('should sign up a new user', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'qqqq',
        lastName: 'qqqq',
        email: 'tees@trtr.com',
        password: '11111111ghghjh'
      });
      const {
        token
      } = res.body.data;
      userToken = token;
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
    });
    it('should not verify a user with invalid/expired token', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/verify?token=gfgfgfhgfh`);
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('Expired Verification Link, resend verification Link');
    });
    it('should verify user email', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/verify?token=${userToken}`);
      res.should.have.status(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('Email Verification Successful');
    });
    it('should not verify user email that has been verified', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/verify?token=${userToken}`);
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User Email is Already Verified');
    });
    it('should not verify a user that does not exist', async () => {
      const nonExistentUserToken = _helpers.default.genToken({
        id: 400,
        isAdmin: false
      });

      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/verify?token=${nonExistentUserToken}`);
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User not found');
    });
    it('should notify user for to resend verification link on expired token', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/verify?token=kkkklkj`);
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('Expired Verification Link, resend verification Link');
    });
  });
  describe('Resend Verification Link', () => {
    beforeEach(async () => {
      send = _sinon.default.stub(_mail.default, 'send').resolves({});
    });
    afterEach(async () => {
      send.restore();
    });
    it('should sign up a new user', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'qqqq',
        lastName: 'qqqq',
        email: 'teeser@trtr.com',
        password: '11111111ghghjh'
      });
      const {
        token
      } = res.body.data;
      userToken = token;
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
    });
    it('should not resend verification link if email is not provided', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/resend_verification_link`);
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('Email must be a valid email');
    });
    it('should resend verification link to user email', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/resend_verification_link`).send({
        email: 'teeser@trtr.com'
      });
      res.should.have.status(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('Verification Link Sent');
    });
    it('should not resend verification link to email that has been verified', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/resend_verification_link`).send({
        email: 'tees@trtr.com'
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User Email is Already Verified');
    });
    it('should not resend verification link for user that does not exist', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/resend_verification_link`).send({
        email: 'aaa@test.com'
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User not found');
    });
  });
  describe('GET /profile', () => {
    beforeEach(async () => {
      verifiedUser = await _testHelper.default.createUser({ ...user3,
        roleId: 5
      });
    });
    afterEach(async () => {
      await _testHelper.default.destroyModel('User');
    });
    it('should return 401 if there is no token in the header', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json');
      res.should.have.status(401);
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Access Denied, No token provided');
    });
    it('should return 400 if the token in the header is invalid', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').set('token', 'lsdjlfsjdlkfjsd');
      res.should.have.status(400);
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Access Denied, Invalid token');
    });
    it('should return 400 if the user does not exist', async () => {
      const token = await _helpers.default.genToken({
        id: 400,
        roleId: 5
      });
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').set('token', token);
      res.should.have.status(400);
      res.body.should.have.property('error').eql('User not found');
    });
    it('should get the user\'s details successfully if all conditions are met', async () => {
      const payload = _helpers.default.pickFields(verifiedUser, ['id', 'roleId']);

      const token = await _helpers.default.genToken(payload);
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').set('token', token);
      res.should.have.status(200);
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('firstName').eql('Elijah');
      res.body.data.should.have.property('lastName').eql('Enuem-Udogu');
      res.body.data.should.have.property('email').eql('koppter.kom@gmail.com');
      res.body.data.should.have.property('roleId');
      res.body.data.should.have.property('gender');
      res.body.data.should.have.property('dateOfBirth');
      res.body.data.should.have.property('preferredLanguage');
      res.body.data.should.have.property('preferredCurrency');
      res.body.data.should.have.property('residentialAddress');
    });
  });
  describe('PATCH /profile', () => {
    beforeEach(async () => {
      verifiedUser = await _testHelper.default.createUser({ ...user3,
        roleId: 5
      });
    });
    afterEach(async () => {
      await _testHelper.default.destroyModel('User');
    });
    it('should return 401 if there is no token in the header', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').send(profileDetails);
      res.should.have.status(401);
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Access Denied, No token provided');
    });
    it('should return 400 if the token in the header is invalid', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').set('token', 'lsdjlfsjdlkfjsd').send(profileDetails);
      res.should.have.status(400);
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Access Denied, Invalid token');
    });
    it('should return 400 if the user does not exist', async () => {
      const token = await _helpers.default.genToken({
        id: 400,
        roleId: 5
      });
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').set('token', token).send(profileDetails);
      res.should.have.status(400);
      res.body.should.have.property('error').eql('User not found');
    });
    it('should update the user\'s profile successfully if all conditions are met', async () => {
      const payload = _helpers.default.pickFields(verifiedUser, ['id', 'roleId']);

      const token = await _helpers.default.genToken(payload);
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/profile`).set('Content-Type', 'application/json').set('token', token).send(profileDetails);
      res.should.have.status(200);
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('firstName').eql('Elijah');
      res.body.data.should.have.property('lastName').eql('Enuem-Udogu');
      res.body.data.should.have.property('email').eql('koppter.kom@gmail.com');
      res.body.data.should.have.property('roleId');
      res.body.data.should.have.property('gender').eql('Male');
      res.body.data.should.have.property('dateOfBirth');
      res.body.data.should.have.property('preferredLanguage').eql('English');
      res.body.data.should.have.property('preferredCurrency').eql('Nigerian Naira (NGN)');
      res.body.data.should.have.property('residentialAddress').eql('Benin City, Nigeria');
    });
  });
});