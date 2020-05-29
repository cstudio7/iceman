"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sendMail = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _response = _interopRequireDefault(require("../utils/response"));

_dotenv.default.config();

_mail.default.setApiKey(process.env.SENDGRID_API_KEY);

const templates = {
  verify_email: process.env.VERIFY_TEMPLATE,
  reset_password: process.env.RESET_TEMPLATE
};
/**
 *
 * @param {object} data email details
 * @returns {object} message
 */

const sendMail = async data => {
  const {
    receiver,
    sender,
    templateName,
    url,
    name
  } = data;
  const message = {
    to: receiver,
    from: sender,
    templateId: templates[templateName],
    dynamic_template_data: {
      name,
      url
    }
  };

  try {
    await _mail.default.send(message);
  } catch (error) {
    _response.default.error(error);
  }
};

exports.sendMail = sendMail;
var _default = sendMail;
exports.default = _default;