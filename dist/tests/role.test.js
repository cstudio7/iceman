"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _sinon = _interopRequireDefault(require("sinon"));

var _index = _interopRequireDefault(require("../index"));

var _testHelper = _interopRequireDefault(require("../utils/testHelper"));

var _models = _interopRequireDefault(require("../models"));

var _insertTestRoles = _interopRequireDefault(require("../utils/insertTestRoles"));

_dotenv.default.config();

_chai.default.use(_chaiHttp.default);

_chai.default.should();

let send;
let userToken;
let adminToken;
const URL_PREFIX = '/api/v1/auth';
const superAdmin = {
  firstName: 'Super',
  lastName: 'Administrator',
  email: process.env.SUPER_ADMIN_EMAIL,
  password: process.env.SUPER_ADMIN_PASSWORD
};
describe('Assign User Role', () => {
  after(async () => {
    await _testHelper.default.destroyModel('Request');
    await _testHelper.default.destroyModel('User');
    await _testHelper.default.destroyModel('Role');
  });
  before(async () => {
    await _testHelper.default.destroyModel('Role');
    await _testHelper.default.destroyModel('User');
    await _models.default.Role.bulkCreate(_insertTestRoles.default);
    await _testHelper.default.createUser({ ...superAdmin,
      roleId: 1
    });
  });
  beforeEach(done => {
    send = _sinon.default.stub(_mail.default, 'send').resolves({});
    done();
  });
  afterEach(done => {
    send.restore();
    done();
  });
  describe('PATCH /assign_role', () => {
    it('should sign up a new user', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/signup`).send({
        firstName: 'qqqq',
        lastName: 'qqqq',
        email: 'ter@trtr.com',
        password: '1111ghghjh'
      });
      const {
        token
      } = res.body.data;
      userToken = token;
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
      res.body.data.firstName.should.equal('qqqq');
      res.body.data.lastName.should.equal('qqqq');
      res.body.data.email.should.equal('ter@trtr.com');
    });
    it('should log in super administrator', async () => {
      const res = await _chai.default.request(_index.default).post(`${URL_PREFIX}/login`).send({
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD
      });
      const {
        token
      } = res.body.data;
      adminToken = token;
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
      res.body.data.firstName.should.equal('Super');
      res.body.data.lastName.should.equal('Administrator');
    });
    it('should not assign role if user email is not verified', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', adminToken).send({
        email: 'ter@trtr.com',
        roleId: 5
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User email is not verified');
    });
    it('should verify user email address', async () => {
      const res = await _chai.default.request(_index.default).get(`${URL_PREFIX}/verify?token=${userToken}`);
      res.should.have.status(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('Email Verification Successful');
    });
    it('should assign user role', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', adminToken).send({
        email: 'ter@trtr.com',
        roleId: 4
      });
      res.should.have.status(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('User Role Assigned Successfully');
    });
    it('should not grant user permission if not permitted to assign role', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', userToken).send({
        email: 'ter@trtr.com',
        roleId: 5
      });
      res.should.have.status(403);
      res.body.should.have.property('error');
      res.body.error.should.equal('You are not allowed to perform this operation');
    });
    it('should not assign role if user already has that role', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', adminToken).send({
        email: 'ter@trtr.com',
        roleId: 4
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User is already assigned this role');
    });
    it('should not assign role if user email does not exist', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', adminToken).send({
        email: 'te@trtr.com',
        roleId: 5
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('User not found');
    });
    it('should not assign role with invalid role parameter', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', adminToken).send({
        email: 'ter@trtr.com',
        roleId: 6
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('Invalid Role Input');
    });
    it('should not assign role with invalid token', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', 'ghghjghj').send({
        email: 'ter@trtr.com',
        roleId: 5
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('Access Denied, Invalid token');
    });
    it('should not assign role with invalid email', async () => {
      const res = await _chai.default.request(_index.default).patch(`${URL_PREFIX}/assign_role`).set('token', adminToken).send({
        email: 'ter',
        roleId: 5
      });
      res.should.have.status(400);
      res.body.should.have.property('error');
      res.body.error.should.equal('Email must be a valid email address e.g example@mail.com or example@mail.co.uk');
    });
  });
});