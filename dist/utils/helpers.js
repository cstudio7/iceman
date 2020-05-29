"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

var _models = require("../models");

/**
 * Helper class
 */
class Helper {
  /**
   * Method to exclude properties from an object
   * @param {object} objectItem - The object to exclude fields from
   * @param {array} fields - Array of fields to be removed
   * @returns {object} - new object
   */
  static omitFields(objectItem, fields) {
    const items = objectItem;
    fields.forEach(field => {
      delete items[field];
    });
    return items;
  }
  /**
   * Method to exclude properties from an object
   * @param {object} objectItem - The object to extract fields from
   * @param {array} fields - Array of fields to be extracted
   * @returns {object} - new object
   */


  static pickFields(objectItem, fields) {
    const items = {};
    fields.forEach(field => {
      items[field] = objectItem[field];
    });
    return items;
  }
  /**
   * Method encrypt data
   * @param {string} password - password to encrypt
   * @param {number} rounds - salt value
   * @returns {string} - encrypted data
   */


  static async encryptor(password, rounds = 10) {
    const salt = await _bcrypt.default.genSaltSync(rounds);
    const encrypted = await _bcrypt.default.hashSync(password, salt);
    return encrypted;
  }
  /**
   * Method generate token
   * @param {object} payloader - data
   * @returns {string} - token
   */


  static genToken(payloader) {
    const secret = process.env.JWTSECRET;
    return _jsonwebtoken.default.sign(payloader, secret, {
      expiresIn: '1hr'
    });
  }
  /**
   * Method generate token
   * @param {object} profile -user social profile
   * @returns {object} - user details
   */


  static getUserSocialDetails(profile) {
    const {
      provider,
      _json: data
    } = profile;
    const user = {
      password: _crypto.default.randomBytes(15).toString('hex')
    };

    if (provider === 'google') {
      user.email = data.email;
      user.image = data.picture;
      user.socialId = data.sub;
      user.firstName = data.given_name;
      user.lastName = data.family_name;
      user.roleId = 5;
    } else {
      user.socialId = data.id;
      user.email = data.email;
      user.firstName = data.first_name;
      user.lastName = data.last_name;
      user.middleName = data.middle_name;
      user.image = data.picture.data.url;
      user.roleId = 5;
    }

    return user;
  }
  /**
   * Method authenticate token
   * @param {string} token - token
   * @returns {string} - user details
   */


  static verifyToken(token) {
    const verify = _jsonwebtoken.default.verify(token, process.env.JWTSECRET, (err, decoded) => decoded);

    return verify;
  }
  /**
   * Method provide table join to map requests to department
   * @param {number} id - User ID of Department manager
   * @returns {array} - Table join to map requests to manager's department
   */


  static mapToDepartment(id) {
    return [{
      model: _models.User,
      required: true,
      attributes: ['firstName', 'lastName'],
      include: [{
        model: _models.UserDepartment,
        required: true,
        attributes: ['departmentId'],
        include: [{
          model: _models.Department,
          where: {
            manager: id
          },
          required: true,
          attributes: ['department', 'manager']
        }]
      }]
    }];
  }

}

exports.default = Helper;