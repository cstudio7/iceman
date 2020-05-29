"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

var _response = _interopRequireDefault(require("../utils/response"));

const {
  error
} = _response.default;
/**
 * Comment Service class
 */

class CommentService {
  /**
   * @param {string} comment user comment on request
   * @param {integer} requestId request id
   * @param {integer} userId user id
   * @returns {void}
   */
  static async createComment({
    body: {
      comment
    },
    params: {
      requestId
    },
    user: {
      id
    }
  }) {
    const checkRequest = await _models.default.Request.findOne({
      where: {
        id: requestId
      }
    });
    if (checkRequest === null) error('Request does not exist');
    const {
      userId
    } = checkRequest;
    const userDept = await _models.default.UserDepartment.findOne({
      include: [_models.default.Department],
      where: {
        userId
      }
    });
    const {
      dataValues: {
        Department: {
          dataValues: {
            manager
          }
        }
      }
    } = userDept;
    if (id !== manager && id !== userId) error('You cannot comment on this request');
    const result = await _models.default.Comment.create({
      comment,
      requestId,
      userId: id
    });
    return result;
  }
  /**
   * @param {integer} requestId the request id
   * @returns {void}
   */


  static async getComment({
    params: {
      requestId
    },
    user: {
      id
    }
  }) {
    const checkRequest = await _models.default.Request.findOne({
      where: {
        id: requestId
      }
    });
    if (checkRequest === null) error('Request does not exist');
    const {
      userId
    } = checkRequest;
    const userDept = await _models.default.UserDepartment.findOne({
      include: [_models.default.Department],
      where: {
        userId
      }
    });
    const {
      dataValues: {
        Department: {
          dataValues: {
            manager
          }
        }
      }
    } = userDept;
    if (id !== manager && id !== userId) error('You cannot see these comments');
    const result = await _models.default.Comment.findAll({
      where: {
        deleted: false,
        requestId
      }
    });
    if (!result.length) error('The are no comments on this request');
    return result;
  }
  /**
   * @param {integer} userId user id
   * @param {integer} commentId comment id
   * @param {integer} requestId request id
   * @returns {void}
   */


  static async deleteComment({
    params: {
      commentId,
      requestId
    },
    user: {
      id
    }
  }) {
    const checkRequest = await _models.default.Request.findOne({
      where: {
        id: requestId
      }
    });
    if (checkRequest === null) error('Request does not exist');
    const checkComment = await _models.default.Comment.findOne({
      where: {
        id: commentId
      }
    });
    if (checkComment === null) error('Comment does not exist');
    const {
      userId,
      requestId: request
    } = checkComment;
    if (userId !== id) error('This Comment is not yours');
    if (request.toString() !== requestId) error('Incorrect request id');
    await _models.default.Comment.update({
      deleted: true
    }, {
      where: {
        userId: id,
        id: commentId,
        requestId
      }
    });
    return 'Comment deleted';
  }

}

exports.default = CommentService;