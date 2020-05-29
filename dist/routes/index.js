"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

var _request = _interopRequireDefault(require("./request"));

var _accommodation = _interopRequireDefault(require("./accommodation"));

const router = (0, _express.Router)();
router.use('/auth', _auth.default);
router.use('/requests', _request.default);
router.use('/accommodation', _accommodation.default);
var _default = router;
exports.default = _default;