"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _passportController = _interopRequireDefault(require("../controllers/passportController"));

var _validator = _interopRequireWildcard(require("../validation/validator"));

var _schemas = require("../validation/schemas");

const router = _express.default.Router();

const {
  loginUser,
  forgotPassword,
  resetPassword,
  signupUser,
  verifyUser,
  resendVerification,
  getProfile,
  updateProfile,
  assignRole
} = _authController.default;
const {
  authenticate,
  callback
} = _passportController.default;
const {
  auth,
  permitUser
} = _middlewares.default;
router.post('/forgot_password', forgotPassword);
router.patch('/reset_password/:token', (0, _validator.default)(_schemas.passwordResetSchema, 'body'), resetPassword);
router.post('/signup', (0, _validator.default)(_schemas.signUpSchema, 'body'), signupUser);
router.get('/verify', verifyUser);
router.post('/resend_verification_link', (0, _validator.default)(_schemas.verifyEmail, 'body'), resendVerification);
router.get('/profile', auth, getProfile);
router.patch('/profile', auth, (0, _validator.default)(_schemas.profileSchema, 'body'), updateProfile);
router.patch('/assign_role', auth, permitUser(['super_admin']), (0, _validator.default)(_schemas.roleSchema, 'body'), assignRole);
router.post('/login', (0, _validator.validator)(_schemas.LogInSchema), loginUser);
router.get('/facebook', authenticate('facebook', ['email', 'public_profile']));
router.get('/facebook/callback', callback('facebook'));
router.get('/google', authenticate('google', ['email', 'profile']));
router.get('/google/callback', callback('google'));
var _default = router;
exports.default = _default;