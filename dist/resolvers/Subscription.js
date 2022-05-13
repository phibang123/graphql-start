"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getUser = require("../utils/getUser");

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = {

	comment: {
		subscribe: function subscribe(parent, _ref, _ref2, info) {
			var postId = _ref.postId;
			var db = _ref2.db,
			    pubsub = _ref2.pubsub,
			    prisma = _ref2.prisma;

			return prisma.subscription.comment({
				where: {
					node: {
						post: {
							id: postId
						}
					}
				}
			}, info);
		}
	},
	post: {
		subscribe: function subscribe(parent, age, _ref3, info) {
			var pubsub = _ref3.pubsub,
			    prisma = _ref3.prisma;

			return prisma.subscription.post({
				where: {
					node: {
						published: true
					}
				}
			}, info);
		}
	},
	myPost: {
		subscribe: function subscribe(parent, _ref4, _ref5, info) {
			var postId = _ref4.postId;
			var db = _ref5.db,
			    pubsub = _ref5.pubsub,
			    prisma = _ref5.prisma;

			//thông báo post của người dùng khi người dùng thay đổi, tạo hoặc xóa
			var userId = (0, _getUser2.default)(require);

			return prisma.subscription.post({
				where: {
					node: {
						author: {
							id: userId
						}
					}
				}
			}, info);
		}
	}
};

exports.default = Subscription;