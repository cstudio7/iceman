"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _default = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/jpeg|jpg|png|gif$i/)) {
      callback('File is not supported', false);
      return;
    }

    callback(null, true);
  }
});

exports.default = _default;