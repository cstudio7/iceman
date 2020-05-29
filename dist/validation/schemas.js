"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomSchema = exports.accommodationSchema = exports.commentSchema = exports.requestSchema = exports.responseSchema = exports.requestIdSchema = exports.roleSchema = exports.LogInSchema = exports.verifyEmail = exports.passwordResetSchema = exports.profileSchema = exports.signUpSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

_joi.default.extend(require('@hapi/joi-date'));
/**
 * user schema to be used for validating user input
 */


const signUpSchema = _joi.default.object().keys({
  firstName: _joi.default.string().trim().required().error(() => ({
    message: 'First Name is required'
  })),
  lastName: _joi.default.string().trim().required().error(() => ({
    message: 'Last Name is required'
  })),
  email: _joi.default.string().email().trim().lowercase().required().error(() => ({
    message: 'Email must be a valid email address e.g example@mail.com or example@mail.co.uk'
  })),
  password: _joi.default.string().regex(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$/).required().error(() => ({
    message: 'Password must contain at least one letter, at least one number, and be atleast 8 digits long'
  }))
});
/**
 * profile schema to be used for validating user profile
 */


exports.signUpSchema = signUpSchema;

const profileSchema = _joi.default.object().keys({
  firstName: _joi.default.string().trim().optional(),
  middleName: _joi.default.string().trim().optional(),
  lastName: _joi.default.string().trim().optional(),
  gender: _joi.default.string().trim().optional(),
  preferredLanguage: _joi.default.string().trim().optional(),
  residentialAddress: _joi.default.string().trim().optional(),
  preferredCurrency: _joi.default.string().trim().optional(),
  passportName: _joi.default.string().trim().optional(),
  passportNumber: _joi.default.string().trim().optional(),
  dateOfBirth: _joi.default.date().optional()
});
/**
 * password schema to be used for validating password change
 */


exports.profileSchema = profileSchema;

const passwordResetSchema = _joi.default.object().keys({
  password: _joi.default.string().regex(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$/).required().error(() => ({
    message: 'Password must contain at least one letter, at least one number, and be atleast 8 digits long'
  }))
});
/**
 * Verify Email schema to be used for resending verification link
 */


exports.passwordResetSchema = passwordResetSchema;

const verifyEmail = _joi.default.object().keys({
  email: _joi.default.string().email().required().error(() => ({
    message: 'Email must be a valid email'
  }))
});
/**
 * user schema to be used for validating user login credential
 */


exports.verifyEmail = verifyEmail;

const LogInSchema = _joi.default.object().keys({
  email: _joi.default.string().email().trim().lowercase().required().error(() => ({
    message: 'Email must be a valid email address e.g example@mail.com or example@mail.co.uk'
  })),
  password: _joi.default.string().regex(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$/).required().error(() => ({
    message: 'Password must contain at least one letter, at least one number, and be atleast 8 digits long'
  }))
});
/**
  * Role schema to assign roles to user
  */


exports.LogInSchema = LogInSchema;

const roleSchema = _joi.default.object().keys({
  email: _joi.default.string().email().trim().lowercase().required().error(() => ({
    message: 'Email must be a valid email address e.g example@mail.com or example@mail.co.uk'
  })),
  roleId: _joi.default.number().min(1).max(5).required().error(() => ({
    message: 'Invalid Role Input'
  }))
});
/**
 * Schema for request ID
 */


exports.roleSchema = roleSchema;

const requestIdSchema = _joi.default.object().keys({
  requestId: _joi.default.number().integer().min(1).required().error(() => ({
    message: 'Request ID must be an integer greater than or equal to 1'
  }))
});
/**
 * Schema for travel request response
 */


exports.requestIdSchema = requestIdSchema;

const responseSchema = _joi.default.object().keys({
  status: _joi.default.string().trim().valid('approved', 'rejected').lowercase().required().error(() => ({
    message: 'Please enter your response status. Should be accepted or rejected'
  }))
});
/**
 * Schema for validating multi city request
 */


exports.responseSchema = responseSchema;

const requestSchema = _joi.default.object().keys({
  source: _joi.default.string().required().error(() => ({
    message: 'Source is required'
  })),
  tripType: _joi.default.string(),
  destination: _joi.default.string().required().error(() => ({
    message: 'Please select your destination(s)'
  })),
  travelDate: _joi.default.date().required().error(() => ({
    message: 'Travel date is required e.g YYYY-MM-DD'
  })),
  returnDate: _joi.default.date(),
  reason: _joi.default.string().required().error(() => ({
    message: 'Reason is required'
  })),
  status: _joi.default.string(),
  accommodation: _joi.default.string().required().error(() => ({
    message: 'Accommodation is required'
  })),
  passportName: _joi.default.string().required().error(() => ({
    message: 'passportName is Required'
  })),
  passportNumber: _joi.default.number().required().error(() => ({
    message: 'passportNumber is Required'
  })),
  rememberProfile: _joi.default.boolean().required(),
  gender: _joi.default.string().trim().required().error(() => ({
    message: 'gender is Required'
  })),
  preferredLanguage: _joi.default.string().trim().required().error(() => ({
    message: 'preferredLanguage is Required'
  })),
  residentialAddress: _joi.default.string().trim().required().error(() => ({
    message: 'residentialAddress is Required'
  })),
  preferredCurrency: _joi.default.string().trim().required().error(() => ({
    message: 'preferredCurrency is Required'
  }))
});

exports.requestSchema = requestSchema;

const commentSchema = _joi.default.object().keys({
  comment: _joi.default.string().trim().required().error(() => ({
    message: 'Comment is required'
  }))
});
/**
 * Schema for validating centre
 */


exports.commentSchema = commentSchema;

const accommodationSchema = _joi.default.object().keys({
  name: _joi.default.string().required().error(() => ({
    message: 'Please provide the name of the accommodation centre'
  })),
  country: _joi.default.string().required().error(() => ({
    message: 'Please provide the country were the accommodation centre is located'
  })),
  state: _joi.default.string().required().error(() => ({
    message: 'Please provide the state were the accommodation centre is located'
  })),
  city: _joi.default.string().required().error(() => ({
    message: 'Please provide the city were the accommodation centre is located'
  })),
  address: _joi.default.string().required().error(() => ({
    message: 'Please provide the address of the accommodation centre'
  })),
  description: _joi.default.string()
});
/**
 * Schema for validating room
 */


exports.accommodationSchema = accommodationSchema;

const roomSchema = _joi.default.object().keys({
  name: _joi.default.string().required().error(() => ({
    message: 'Please provide the room name'
  })),
  roomType: _joi.default.string().required().error(() => ({
    message: 'Please select valid room type'
  })),
  facilities: _joi.default.string().required().error(() => ({
    message: 'Please specify the room facilities'
  })),
  price: _joi.default.string(),
  status: _joi.default.string(),
  description: _joi.default.string()
});

exports.roomSchema = roomSchema;