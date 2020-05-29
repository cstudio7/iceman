"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = _interopRequireDefault(require("../utils/response"));

var _accommodationService = _interopRequireDefault(require("../services/accommodationService"));

const {
  success,
  badRequest,
  successMessage
} = _response.default;
const {
  createAccommodation,
  createRoom,
  getAllAccommodation,
  updateAccommodation,
  deleteAccommodation,
  updateRoom,
  deleteRoom
} = _accommodationService.default;
/**
 * Booking Controller Class
 */

class AccommodationController {
  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} user - return object containing status and data
   */
  static async createAccommodation(req, res) {
    try {
      const data = await createAccommodation(req);
      success(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} user - return object containing status and data
  */


  static async createRoom(req, res) {
    try {
      const data = await createRoom(req);
      success(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} user - return object containing status and data
  */


  static async getAllAccommodation(req, res) {
    try {
      const data = await getAllAccommodation();
      success(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} user - return object containing status and data
  */


  static async updateAccommodation(req, res) {
    try {
      const data = await updateAccommodation(req);
      success(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} user - return object containing status and data
  */


  static async deleteAccommodation(req, res) {
    try {
      const data = await deleteAccommodation(req);
      successMessage(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} room - return object containing status and data
  */


  static async updateRoom(req, res) {
    try {
      const data = await updateRoom(req);
      success(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {string}  - return success or error message
  */


  static async deleteRoom(req, res) {
    try {
      const data = await deleteRoom(req);
      successMessage(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }

}

exports.default = AccommodationController;