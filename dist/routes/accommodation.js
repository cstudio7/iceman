"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("../middlewares/multer"));

var _accommodationController = _interopRequireDefault(require("../controllers/accommodationController"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _permission = _interopRequireDefault(require("../middlewares/permission"));

var _validator = require("../validation/validator");

var _schemas = require("../validation/schemas");

const router = (0, _express.Router)();
const {
  auth
} = _middlewares.default;
const {
  createAccommodation,
  createRoom,
  getAllAccommodation,
  updateAccommodation,
  deleteAccommodation,
  deleteRoom,
  updateRoom
} = _accommodationController.default;
router.get('/', auth, getAllAccommodation);
router.post('/', [auth, (0, _permission.default)(['travel_admin']), _multer.default.single('image'), (0, _validator.validator)(_schemas.accommodationSchema)], createAccommodation);
router.patch('/:id', [auth, (0, _permission.default)(['travel_admin']), _multer.default.single('image'), (0, _validator.validator)(_schemas.accommodationSchema)], updateAccommodation);
router.delete('/:id', [auth, (0, _permission.default)(['travel_admin'])], deleteAccommodation);
router.post('/:accommodationId/room', [auth, (0, _permission.default)(['travel_admin']), _multer.default.array('images'), (0, _validator.validator)(_schemas.roomSchema)], createRoom);
router.patch('/:id/room', [auth, (0, _permission.default)(['travel_admin']), _multer.default.array('images'), (0, _validator.validator)(_schemas.roomSchema)], updateRoom);
router.delete('/:id/room', [auth, (0, _permission.default)(['travel_admin'])], deleteRoom);
var _default = router;
exports.default = _default;