"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _sequelize = require("sequelize");

var _helpers = _interopRequireDefault(require("../utils/helpers"));

var _models = require("../models");

var _response = _interopRequireDefault(require("../utils/response"));

/**
 * Class for managing passport strategies
 */
class PassportController {
  /**
   * @param {string} provider  - it takes the name of the provider e.g facebook, google
   * @param {array} scope - list of content required from the user profile
   * @returns {object} - the profile of user
   */
  static authenticate(provider, scope) {
    return _passport.default.authenticate(provider, {
      session: false,
      scope
    });
  }
  /**
   * @param {string} provider  - it takes the name of the provider e.g facebook, google
   * @returns {json} - json object with the user token
   */


  static callback(provider) {
    return (req, res, next) => {
      _passport.default.authenticate(provider, {
        session: false
      }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            status: 'error',
            error: 'Something is not right'
          });
        }

        const payload = _helpers.default.pickFields(user, ['id', 'roleId']);

        const token = _helpers.default.genToken(payload);

        return _response.default.success(res, {
          token,
          ...user
        });
      })(req, res, next);
    };
  }
  /**
  * @param {string} token - null
  * @param {string} tokenSecret  - null
  * @param {object} profile - the profile of the user
  * @param {*} done - end the process
  * @returns {object} user - return user details
  */


  static async strategyCallback(token, tokenSecret, profile, done) {
    try {
      const user = _helpers.default.getUserSocialDetails(profile);

      const {
        email,
        socialId
      } = user;
      let result = await _models.User.findOne({
        where: {
          [_sequelize.Op.or]: [{
            email
          }, {
            socialId
          }]
        }
      });

      if (!result) {
        result = await _models.User.create(user);
        return done(null, _helpers.default.omitFields(result.dataValues, ['password', 'socialId']));
      }

      return done(null, _helpers.default.omitFields(result.dataValues, ['password', 'socialId']));
    } catch (error) {
      _response.default.error(error);
    }
  }

}

exports.default = PassportController;