"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = _interopRequireDefault(require("../utils/response"));

var _commentService = _interopRequireDefault(require("../services/commentService"));

const {
  createComment,
  getComment,
  deleteComment
} = _commentService.default;
const {
  success,
  badRequest
} = _response.default;
/**
 * Controller form request comments
 */

class CommentController {
  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} user - return object containing status and data
   */
  static async postComment(req, res) {
    try {
      const data = await createComment(req);
      success(res, data, 201);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }
  /**
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} user - return object containing status and data
  */


  static async getComment(req, res) {
    try {
      const data = await getComment(req);
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
  * @returns {object} user - return object containing status and data
  */


  static async deleteComment(req, res) {
    try {
      const data = await deleteComment(req);
      success(res, data);
    } catch ({
      message: error
    }) {
      badRequest(res, error);
    }
  }

}

exports.default = CommentController;