"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

// finally, let's start our server...
const server = _index.default.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});