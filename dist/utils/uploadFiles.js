"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

const uploadImages = async files => {
  const imagePromises = files.map(file => new Promise((resolve, reject) => {
    _cloudinary.default.v2.uploader.upload(file.path, {
      use_filename: true,
      unique_fileName: false
    }, (error, res) => {
      if (error) reject(error);else resolve(res.secure_url);
    });
  }));
  const result = await Promise.all(imagePromises);
  return result;
};

var _default = uploadImages;
exports.default = _default;