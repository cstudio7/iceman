"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passportStrategy = _interopRequireDefault(require("passport-strategy"));

var _util = _interopRequireDefault(require("util"));

var _mockedProfile = _interopRequireDefault(require("./mockedProfile"));

/**
   * @function Strategy
   * @param {string} name - name of the strategy
   * @param {string} callback - callback function
   * @returns {void}
*/
function Strategy(name, callback) {
  if (!name || name.length === 0) {
    throw new TypeError('Please supply a strategy name to work with.');
  }

  _passportStrategy.default.Strategy.call(this);

  this.name = name;
  this._user = _mockedProfile.default[name];
  this._cb = callback;
}

_util.default.inherits(Strategy, _passportStrategy.default.Strategy);

Strategy.prototype.authenticate = function authenticate() {
  this._cb(null, null, this._user, (err, authenticatedUser) => {
    if (this._user) this.success(authenticatedUser);else this.success(undefined);
  });
};

var _default = Strategy;
exports.default = _default;