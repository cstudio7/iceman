"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const secret = process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret';
var _default = secret;
exports.default = _default;