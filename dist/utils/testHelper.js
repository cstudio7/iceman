"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _models = _interopRequireDefault(require("../models"));

var _helpers = _interopRequireDefault(require("./helpers"));

_dotenv.default.config();

const jwtSecret = process.env.JWTSECRET;
/**
 * Helper class for query test database
 */

class TestHelper {
  /**
   * Method to exclude properties from an object
   * @param {object} data - object containing user details
   * @returns {string} - user token
   */
  static async createUser(data) {
    const user = { ...data
    };
    const salt = await _bcrypt.default.genSalt(10);
    user.password = await _bcrypt.default.hash(user.password, salt);
    const {
      dataValues: result
    } = await _models.default.User.create(user);
    const payload = {
      id: result.id,
      isAdmin: result.isAdmin
    };
    const token = await _jsonwebtoken.default.sign(payload, jwtSecret, {
      expiresIn: '1hr'
    });
    return {
      token,
      ..._helpers.default.omitFields(result, ['password'])
    };
  }
  /**
   * Method to exclude properties from an object
   * @param {string} modelName - model to droped
   * @returns {integer} - return 1 if success or 0 if failed
   */


  static destroyModel(modelName) {
    _models.default[modelName].destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
  /**
  * Method for creating department
  * @param {object} data - department data
  * @return {object} - created department object
  */


  static async createDepartment(data) {
    const {
      dataValues
    } = await _models.default.Department.create(data);
    return dataValues;
  }
  /**
  * Method for creating user department
  * @param {object} data - department data
  * @return {object} - created user department object
  */


  static async createUserDepartment(data) {
    const {
      dataValues
    } = await _models.default.UserDepartment.create(data);
    return dataValues;
  }

}

exports.default = TestHelper;