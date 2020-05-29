"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.validator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _response = _interopRequireDefault(require("../utils/response"));

/**
  * Input validation logic
  * @param {object} schema - schema to be used for input validation
  * @param {string} property - property to be validated
  * @return {json} - validation error
  */
const validate = (schema, property) => (req, res, next) => {
  const {
    error
  } = _joi.default.validate(req[property], schema);

  const valid = error == null;
  if (!valid) return _response.default.badRequest(res, error.details[0].message);
  next();
};
/**
  * Input validation logic
  * @param {object} schema - schema to be used for input validation
  * @param {string} property - property to be validated
  * @return {json} - validation error
  */


const validator = (schema, property = 'body') => (req, res, next) => {
  const errors = _joi.default.validate(req[property], schema, {
    abortEarly: false
  });

  if (errors.error) {
    const errorMSG = [];
    errors.error.details.forEach(err => errorMSG.push(err.message));
    return _response.default.badRequest(res, errorMSG);
  }

  next();
};

exports.validator = validator;
var _default = validate;
exports.default = _default;