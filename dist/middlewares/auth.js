"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = _interopRequireDefault(require("../utils/response"));

const {
  badRequest
} = _response.default;
const jwtSecret = process.env.JWTSECRET;

var _default = async (req, res, next) => {
  const token = req.header('token') || req.header('Authorization');
  if (!token) return badRequest(res, 'Access Denied, No token provided', 401);

  try {
    const payload = await _jsonwebtoken.default.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (error) {
    badRequest(res, 'Access Denied, Invalid token');
  }
};

exports.default = _default;