"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

/**
 * @param {Object} req request object
 * @param {Object} res respond object
 * @param {Object} next next function
 * @returns {object} - next
 */
const userProfile = async (req, res, next) => {
  const {
    id
  } = req.user;
  const isUser = await _models.User.findOne({
    where: {
      id
    }
  });
  const {
    dataValues
  } = isUser;
  const {
    rememberProfile
  } = dataValues;

  if (rememberProfile) {
    req.body.gender = dataValues.gender;
    req.body.preferredLanguage = dataValues.preferredLanguage;
    req.body.passportName = dataValues.passportName;
    req.body.passportNumber = dataValues.passportNumber;
    req.body.preferredCurrency = dataValues.preferredCurrency;
    req.body.residentialAddress = dataValues.residentialAddress;
  }

  next();
};

var _default = userProfile;
exports.default = _default;