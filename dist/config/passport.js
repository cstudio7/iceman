"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));

var _passportFacebook = require("passport-facebook");

var _config = _interopRequireDefault(require("./config"));

var _passportController = _interopRequireDefault(require("../controllers/passportController"));

var _mockedStrategy = _interopRequireDefault(require("../mock/mockedStrategy"));

const {
  strategyCallback
} = _passportController.default;

if (process.env.NODE_ENV === 'test' || 'development') {
  _passport.default.use(new _mockedStrategy.default('google', strategyCallback));

  _passport.default.use(new _mockedStrategy.default('facebook', strategyCallback));

  _passport.default.use(new _mockedStrategy.default('unauthorized', strategyCallback));
} else {
  _passport.default.use(new _passportGoogleOauth.default(_config.default.googleApp, strategyCallback));

  _passport.default.use(new _passportFacebook.Strategy(_config.default.facebookApp, strategyCallback));
}