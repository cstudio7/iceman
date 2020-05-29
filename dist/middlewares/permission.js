"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

/**
 * @param  {string} role permitted role
 * @returns {object} - next
 */
const permitUser = role => async (req, res, next) => {
  const value = await _models.Role.findOne({
    where: {
      id: req.user.roleId
    }
  });
  const isPermitted = role.map(userRole => value.dataValues.type === userRole).find(isRole => isRole === true);

  if (!isPermitted) {
    return res.status(403).json({
      status: 'error',
      error: 'You are not allowed to perform this operation'
    });
  }

  next();
};

var _default = permitUser;
exports.default = _default;