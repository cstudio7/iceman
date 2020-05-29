"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

require("dotenv/config");

var _routes = _interopRequireDefault(require("./routes"));

require("./config/passport");

require("./config/cloudinary");

const swaggerDocument = _yamljs.default.load(`${process.cwd()}/src/docs/docs.yaml`);

const isProduction = process.env.NODE_ENV === 'production'; // Create global app object

const app = (0, _express.default)();
app.use((0, _cors.default)()); // Normal express config defaults

app.use(require('morgan')('dev'));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(require('method-override')());

if (!isProduction) {
  app.use((0, _errorhandler.default)());
} // versioning api


app.use('/api/v1', _routes.default);
app.get('/', (req, res) => res.status(200).send('Welcome to Barefoot Nomad'));
app.use('/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument)); // catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}); // global error handler

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
  next();
});
var _default = app;
exports.default = _default;