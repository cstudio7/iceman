"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _permission = _interopRequireDefault(require("./permission"));

var _default = {
  auth: _auth.default,
  permitUser: _permission.default
};
exports.default = _default;