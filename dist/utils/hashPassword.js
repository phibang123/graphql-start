"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlYoga = require("graphql-yoga");

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = function hashPassword(password) {
  if (password < 8) {
    throw new _graphqlYoga.GraphQLYogaError('Password must be 8 characters or longer!');
  }
  return _bcryptjs2.default.hashSync(password, 10);
};

exports.default = hashPassword;