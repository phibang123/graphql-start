"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlYoga = require("graphql-yoga");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(request) {
  var requereAutth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  // request.connection.context.Authorization khi getUserId từ Subscription
  var header = request.request ? request.request.headers.get('authorization') : request.connection.context.Authorization;

  if (header) {
    var token = header.replace("Bearer ", "");
    var decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  }
  if (requereAutth) {
    throw new _graphqlYoga.GraphQLYogaError("Token not exsist, please login");
  }

  return null;
};

exports.default = getUserId;