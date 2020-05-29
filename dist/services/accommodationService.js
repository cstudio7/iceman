"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _response = _interopRequireDefault(require("../utils/response"));

var _uploadFiles = _interopRequireDefault(require("../utils/uploadFiles"));

var _models = require("../models");

const {
  error
} = _response.default;
/**
 * Class for booking accommodation
 */

class AccommodationService {
  /**
   * @param {string} body - valid data object of a centre
   * @param {string} file - valid image of the centre
   * @param {string} user - login user with privelleges to create centre
   * @return {object} - send back newly created centre
   */
  static async createAccommodation({
    body,
    file,
    user
  }) {
    if (!file) error('Please upload a valid image');
    const result = await _models.Accommodation.findOne({
      where: {
        name: {
          [_sequelize.Op.iLike]: `%${body.name}`
        },
        userId: user.id
      }
    });
    if (result) error('This centre already exists');
    const res = await _cloudinary.default.v2.uploader.upload(file.path);
    body.image = res.secure_url;
    return _models.Accommodation.create({ ...body,
      userId: user.id
    });
  }
  /**
   * @param {object} req - valid data object of a centre
   * @return {object} - send back newly created centre
   */


  static async updateAccommodation(req) {
    const {
      body,
      file,
      user: {
        id: userId
      },
      params: {
        id
      }
    } = req;
    const result = await _models.Accommodation.findOne({
      where: {
        id,
        userId
      }
    });
    if (!result) error('You cannot edit this accommodation');

    if (file) {
      const res = await _cloudinary.default.v2.uploader.upload(file.path);
      body.image = res.secure_url;
    }

    const response = await _models.Accommodation.update(body, {
      where: {
        id
      },
      returning: true
    });
    return response[1][0];
  }
  /**
   * @param {object} user - valid user object containing the login user details
   * @param {object} params - it contains the id of the accommodation to be deleted
   * @return {object} - send back newly created centre
   */


  static async deleteAccommodation({
    user,
    params
  }) {
    const result = await _models.Accommodation.destroy({
      where: {
        id: params.id,
        userId: user.id
      }
    });
    return result === 1 ? 'The accommodation has been deleted successfully' : error('You cannot delete this accommodation');
  }
  /**
  * @param {string} body - valid data object of a centre
  * @param {string} files - valid images of the centre
  * @param {string} user - login user with privelleges to create centre
  * @return {object} - send back newly added room
  */


  static async createRoom({
    body,
    files,
    params
  }) {
    if (files.length < 1) error('Please upload a valid image(s)');
    const {
      accommodationId
    } = params;
    const result = await _models.Room.findOne({
      where: {
        name: {
          [_sequelize.Op.iLike]: `%${body.name}`
        },
        accommodationId
      }
    });
    if (result) error('This room already exists');
    const res = await (0, _uploadFiles.default)(files);
    body.facilities = body.facilities.split(',');
    body.images = res;
    const {
      dataValues
    } = await _models.Room.create({ ...body,
      accommodationId
    });
    await _models.Accommodation.increment(['roomsCount'], {
      where: {
        id: accommodationId
      }
    });
    return dataValues;
  }
  /**
   * @param {object} req - valid data object of a centre
   * @return {object} - send back updated room
   */


  static async updateRoom(req) {
    const {
      body,
      files,
      params: {
        id
      }
    } = req;
    const result = await _models.Room.findOne({
      where: {
        id
      }
    });
    if (!result) error('The room does not exists');

    if (files.length > 0) {
      const res = await (0, _uploadFiles.default)(files);
      body.image = res;
    }

    body.facilities = body.facilities.split(',');
    const response = await _models.Room.update(body, {
      where: {
        id
      },
      returning: true
    });
    return response[1][0];
  }
  /**
   * @param {object} user - valid user object containing the login user details
   * @param {object} params - it contains the id of the accommodation to be deleted
   * @return {object} - send back newly created centre
   */


  static async deleteRoom({
    params: {
      id
    }
  }) {
    const result = await _models.Room.destroy({
      where: {
        id
      }
    });
    return result === 1 ? 'The room has been deleted successfully' : error('The operation was not successfully');
  }
  /**
  * @returns {object} - response with all accommodation
  */


  static async getAllAccommodation() {
    const result = await _models.Accommodation.findAll({
      include: [_models.Room]
    });
    return result.length > 0 ? result : error('There are no accommodation yet');
  }

}

exports.default = AccommodationService;