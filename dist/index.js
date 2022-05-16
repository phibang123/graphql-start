"use strict";

require("./prisma");

require("@babel/polyfill/noConflict");

require("babel-polyfill");

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//điều này tránh xung đột, chỉ cần loadding phiên bản gốc không cần tải thư viện như mấy cái @bebel trong dev -_-  
_server2.default.start({
	port: process.env.PORT || 44444
}, function () {
	console.log("The server is up!");
});
// import "@babel/polyfill"