"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _schemas = require("../validation/schemas");

var _requestController = _interopRequireDefault(require("../controllers/requestController"));

var _validator = require("../validation/validator");

var _userProfile = _interopRequireDefault(require("../validation/userProfile"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

const {
  postComment,
  getComment,
  deleteComment
} = _commentController.default;
const router = (0, _express.Router)();
const {
  auth,
  permitUser
} = _middlewares.default;
const {
  update,
  oneWay,
  multiCityRequest,
  getRequests,
  respond,
  availOpenRequests,
  returnRequest,
  search
} = _requestController.default;
router.patch('/:requestId/respond', [auth, (0, _validator.validator)(_schemas.requestIdSchema, 'params'), (0, _validator.validator)(_schemas.responseSchema, 'body'), permitUser(['manager'])], respond);
router.post('/multi-city', [auth, _userProfile.default, (0, _validator.validator)(_schemas.requestSchema)], multiCityRequest);
router.post('/one-way', [auth, _userProfile.default, (0, _validator.validator)(_schemas.requestSchema)], oneWay);
router.patch('/:requestId', [auth, (0, _validator.validator)(_schemas.requestIdSchema, 'params'), (0, _validator.validator)(_schemas.requestSchema)], update);
router.get('/pending', auth, permitUser(['manager']), availOpenRequests);
router.get('/', auth, getRequests);
router.post('/return', [auth, (0, _validator.validator)(_schemas.requestSchema)], returnRequest);
router.get('/search', auth, search);
router.post('/:requestId/comments', [auth, (0, _validator.validator)(_schemas.commentSchema)], postComment);
router.get('/:requestId/comments', auth, getComment);
router.delete('/:requestId/comments/:commentId', auth, deleteComment);
var _default = router;
exports.default = _default;