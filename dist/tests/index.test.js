"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai.default.use(_chaiHttp.default);

_chai.default.should();

describe('API ROUTES', () => {
  it('should get all entry points', async () => {
    const res = await _chai.default.request(_index.default).get('/');
    res.should.have.status(200);
  });
  it('should return a not found error message when an invalid route is accessed', async () => {
    const res = await _chai.default.request(_index.default).get('/fakepath');
    res.should.have.status(404);
  });
});